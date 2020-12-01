"use strict";

const { Router } = require("express");
const { SELECT } = require("sequelize");
const { STATUS_UPDATE, emitter } = require("../../../socketConstants");

const router = Router();

// DELETE one source file by id
router.delete("/sourceFiles/:id", async (req, res) => {
  const { db } = req;

  const id = req.params.id;
  await db.sourceFile.destroy({ where: { id } });
  return res.status(200).json();
});


// DELETE all source files
router.delete("/sourceFiles", async (req, res) => {
  const { db } = req;

  await db.sourceFile.destroy({ where: {}, truncate: true });
  return res.status(200).json();
});

// GET all source files
router.get("/sourceFiles", async (req, res) => {
  const { db } = req;
  return res.json(await db.sourceFile.findAll({ order: ["id"] }));
});

// GET one source file id
router.get("/sourceFiles/:id", async (req, res) => {
  const { db } = req;
  const id = req.params.id;
  return res.json(await db.sourceFile.findOne({ where: { id } }));
});

// GET one source file id
router.get("/sourceFiles/:id/nthReservePatients", async (req, res) => {
  const { db } = req;
  const id = req.params.id;
  return res.json(
    JSON.parse(
      (await db.sourceFile.findOne({ where: { id } })).nth_reserve_patients
    )
  );
});

// GET all patients for a source file
router.get("/sourceFiles/:id/patients", async (req, res) => {
  const { db } = req;
  const id = req.params.id;
  let filterLosers = "";
  if (req.query.givenUnit)
    filterLosers += `and ${
      req.query.givenUnit === "false" ? "not" : ""
      } given_unit`;

  return res.json(await getPatientsWithAttributes(db, id, filterLosers));
});

// process all patients in a source file
router.post("/sourceFiles/:id/process", async (req, res) => {
  const { db } = req;
  const id = req.params.id;

  try {
    // update status of file to be processing
    const sourceFile = await db.sourceFile.findOne({ where: { id } });
    sourceFile.status = "PROCESSING";
    await sourceFile.save();

    const configId = sourceFile.dataValues.configurationId;
    const reserveCategories = (
      await db.reserveCategory.findAll({
        where: { configurationId: configId },
        order: [["order", "ASC"]],
      })
    ).map((ent) => ent.dataValues);

    const orderedPatientsByReserve = await Promise.all(
      reserveCategories.map((rc) => {
        return orderPatientsInReserveCategory(db, rc.id, rc.size, rc.name);
      })
    );

    const patients = await Promise.all(
      (
        await db.patient.findAll({
          where: { sourceFileId: id },
          order: [["rand_number", "ASC"]],
        })
      ).map((f) => f.id)
    );

    let leftOver = 0; // handle this!
    const selectedPatients = new Set();
    const allocatedPatientGroups = new Map();
    const notSelectedPatients = new Set(patients);
    const nthReservePatients = [];

    console.log(orderedPatientsByReserve);

    orderedPatientsByReserve.forEach((f) => {
      let given = 0;
      let i = 0;
      while (i < f.patients.length) {
        if (given < f.size && !selectedPatients.has(f.patients[i])) {
          selectedPatients.add(f.patients[i]);
          allocatedPatientGroups[f.patients[i]] = f.name;
          given += 1;
          notSelectedPatients.delete(f.patients[i]);

          if (given == f.size) {
            nthReservePatients.push({
              name: f.name,
              nthRecipientPrimaryId: f.patients[i],
            });
          }
        }
        i += 1;
      }

      leftOver += f.size - given;
    });

    // give left over to unallocated patients if there are any
    while (leftOver > 0 && notSelectedPatients.size > 0) {
      const pat = notSelectedPatients.next();
      notSelectedPatients.delete(pat);
      selectedPatients.add(pat);
      allocatedPatientGroups[pat] = "None";
      leftOver -= 1;
    }

    // update patients
    selectedPatients.forEach(async (pId) => {
      const patient = await db.patient.findOne({ where: { id: pId } });
      patient.given_unit = true;
      patient.group_allocated_under = allocatedPatientGroups[pId];
      await patient.save();
    });

    const nthReservePatientsWithNames = await Promise.all(
      nthReservePatients.map(async (f) => {
        const name = (
          await db.patient.findOne({ where: { id: f.nthRecipientPrimaryId } })
        ).recipient_id;
        return { name: f.name, nthRecipientId: name };
      })
    );

    // update sourceFile
    sourceFile.status = "FINISHED";
    sourceFile.nth_reserve_patients = JSON.stringify(
      nthReservePatientsWithNames
    );
    sourceFile.left_over = leftOver;
    const finished = await sourceFile.save();

    if (finished)
      emitter.emit(
        STATUS_UPDATE,
        (await db.sourceFile.findAll()).map((sf) => sf.dataValues)
      );
  } catch (err) {
    // update status of file to be error processing
    const sourceFile = await db.sourceFile.findOne({ where: { id } });
    sourceFile.status = "ERROR";
    await sourceFile.save();
    console.log(err);
    return res.status(500).json();
  }

  return res.json(); // return 200 no matter WHAT
});

// POST a source file
router.post("/sourceFiles", async (req, res) => {
  const { db } = req;

  try {
    const newSourceFile = await db.sourceFile.create(req.body);

    return res.status(201).json(newSourceFile.dataValues);
  } catch (err) {
    return res.status(400);
  }
});

async function getPatientsWithAttributes(db, sourceFileId, filterLosers) {
  const patients = await Promise.all(
    (
      await db.sequelize.query(
        `
    select name, given_unit, rand_number, info, group_allocated_under 
    from patient 
    where source_file_id = ${sourceFileId} ${filterLosers};
    `,
        { type: SELECT }
      )
    )[0].map((p) => {
      const patObj = JSON.parse(p.info);
      patObj.random_number = p.rand_number;
      patObj.allocated_status = p.given_unit === 1;
      patObj.group_allocated_under = p.group_allocated_under;

      delete patObj.configurationId
      delete patObj.sourceFileId

      return patObj;
    })
  );

  return patients;
}

async function orderPatientsInReserveCategory(
  db,
  reserveCategoryId,
  size,
  name
) {
  const orderedPatientIds = db.sequelize.query(
    `
    select p.id
    from patient p 
    inner join
    (
      select a.patient_id, cc_1, cc_2, cc_3, nc_1, nc_2, nc_3
      from 
      (
      
        select a.patient_id, nc_1, nc_2, nc_3
        from 
        (
          select a.patient_id, nc_1 
          from 		
          (
			select p.id as priority_id, prc.patient_id 
			from patient_reserve_category prc 
			inner join priority p 
			on prc.reserve_category_id = p.reserve_category_id 
			where p.reserve_category_id = ${reserveCategoryId} 
          ) a
          left join
          (
            select bucket_order as nc_1, patient_id, nc.priority_id 
            from numeric_criteria nc 
            inner join
            (
              select ncpv.patient_id, numeric_criterium_id, ncb.\`order\` as bucket_order
              from numeric_criteria_patient_value ncpv
              inner join numeric_criteria_bucket ncb 
              on ncpv.numeric_criteria_bucket_id = ncb.id
              order by bucket_order
            ) a
            on nc.id = a.numeric_criterium_id
            where \`order\` = 1		
          ) b
          on a.patient_id = b.patient_id and a.priority_id = b.priority_id
        ) a
        left join 
        (
          select a.patient_id, nc_2, nc_3 
          from 
          (
            select a.patient_id, nc_2 
            from 		
            (
			    select p.id as priority_id, prc.patient_id 
			    from patient_reserve_category prc 
			    inner join priority p 
			    on prc.reserve_category_id = p.reserve_category_id 
			    where p.reserve_category_id = ${reserveCategoryId} 
            ) a
            left join
            (
              select bucket_order as nc_2, patient_id, nc.priority_id 
              from numeric_criteria nc 
              inner join
              (
                select ncpv.patient_id, numeric_criterium_id, ncb.\`order\` as bucket_order
                from numeric_criteria_patient_value ncpv
                inner join numeric_criteria_bucket ncb 
                on ncpv.numeric_criteria_bucket_id = ncb.id
                order by bucket_order
              ) a
              on nc.id = a.numeric_criterium_id
              where \`order\` = 2		
            ) b
            on a.patient_id = b.patient_id and a.priority_id = b.priority_id
          ) a
          left join 
          (
            select a.patient_id, nc_3
            from 		
            (
			    select p.id as priority_id, prc.patient_id 
			    from patient_reserve_category prc 
			    inner join priority p 
			    on prc.reserve_category_id = p.reserve_category_id 
			    where p.reserve_category_id = ${reserveCategoryId} 
            ) a
            left join
            (
              select bucket_order as nc_3, patient_id, nc.priority_id 
              from numeric_criteria nc 
              inner join
              (
                select ncpv.patient_id, numeric_criterium_id, ncb.\`order\` as bucket_order
                from numeric_criteria_patient_value ncpv
                inner join numeric_criteria_bucket ncb 
                on ncpv.numeric_criteria_bucket_id = ncb.id
                order by bucket_order
              ) a
              on nc.id = a.numeric_criterium_id
              where \`order\` = 3		
            ) b
            on a.patient_id = b.patient_id and a.priority_id = b.priority_id
          ) b
          on a.patient_id = b.patient_id
        ) b
        on a.patient_id = b.patient_id
              
      ) a 
      
      inner join (	
      
        select a.patient_id, cc_1, cc_2, cc_3 
        from 
        (
          select a.patient_id, cc_1 
          from 		
          (
			select p.id as priority_id, prc.patient_id 
			from patient_reserve_category prc 
			inner join priority p 
			on prc.reserve_category_id = p.reserve_category_id 
			where p.reserve_category_id = ${reserveCategoryId} 
          ) a
          left join
          (
            select patient_id, element_order as cc_1, priority_id
            from category_criteria cc 
            inner join
            (
              select ccpv.patient_id, category_criterium_id, cce.\`order\` as element_order
              from category_criteria_patient_value ccpv
              inner join category_criteria_element cce 
              on ccpv.category_criteria_element_id = cce.id
            ) c
            on cc.id = c.category_criterium_id
            where \`order\` = 1		
          ) b
          on a.patient_id = b.patient_id and a.priority_id = b.priority_id
        ) a
        left join 
        (
          select a.patient_id, cc_2, cc_3
          from
          (
            select a.patient_id, cc_2
            from 		
            (
			    select p.id as priority_id, prc.patient_id 
			    from patient_reserve_category prc 
			    inner join priority p 
			    on prc.reserve_category_id = p.reserve_category_id 
			    where p.reserve_category_id = ${reserveCategoryId} 
            ) a
            left join
            (
              select patient_id, element_order as cc_2, cc.priority_id
              from category_criteria cc 
              inner join
              (
                select ccpv.patient_id, category_criterium_id, cce.\`order\` as element_order
                from category_criteria_patient_value ccpv
                inner join category_criteria_element cce 
                on ccpv.category_criteria_element_id = cce.id
              ) c
              on cc.id = c.category_criterium_id
              where \`order\` = 2	
            ) b
            on a.patient_id = b.patient_id and a.priority_id = b.priority_id
          ) a
          inner join
          (
            select a.patient_id, cc_3
            from 		
            (
			    select p.id as priority_id, prc.patient_id 
			    from patient_reserve_category prc 
			    inner join priority p 
			    on prc.reserve_category_id = p.reserve_category_id 
			    where p.reserve_category_id = ${reserveCategoryId} 
            ) a
            left join
            (
              select patient_id, element_order as cc_3, cc.priority_id 
              from category_criteria cc 
              inner join
              (
                select ccpv.patient_id, category_criterium_id, cce.\`order\` as element_order
                from category_criteria_patient_value ccpv
                inner join category_criteria_element cce 
                on ccpv.category_criteria_element_id = cce.id
              ) c
              on cc.id = c.category_criterium_id
              where \`order\` = 3	
            ) b
            on a.patient_id = b.patient_id and a.priority_id = b.priority_id
          ) b
          on a.patient_id = b.patient_id
        ) b
        on a.patient_id = b.patient_id
      ) b 
      on a.patient_id = b.patient_id
    ) b
    on p.id = b.patient_id
    order by cc_1, nc_1, cc_2, nc_2, cc_3, nc_3, rand_number
    `,
    { type: SELECT }
  );

  return {
    id: reserveCategoryId,
    size,
    name,
    patients: (await orderedPatientIds)[0].map((ent) => ent.id),
  };
}

module.exports = router;
