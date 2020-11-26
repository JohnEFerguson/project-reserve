'use strict'

const { Router } = require('express')
const { SELECT } = require('sequelize')
const { STATUS_UPDATE, emitter } = require('../../../socketConstants')

const router = Router()

// GET all source files
router.get('/sourceFiles', async (req, res) => {
  const { db } = req
  return res.json(await db.sourceFile.findAll({ order: ['id'] }))
})

// GET one source file id
router.get('/sourceFiles/:id', async (req, res) => {
  const { db } = req
  const id = req.params.id
  return res.json(await db.sourceFile.findOne({ where: { id } }))
})

// GET one source file id
router.get('/sourceFiles/:id/nthReservePatients', async (req, res) => {
  const { db } = req
  const id = req.params.id
  return res.json(JSON.parse((await db.sourceFile.findOne({ where: { id } })).nth_reserve_patients))
})

// GET all patients for a source file
router.get('/sourceFiles/:id/patients', async (req, res) => {
  const { db } = req
  const id = req.params.id
  let filterLosers = ''
  if (req.query.givenUnit)
    filterLosers += `and ${req.query.givenUnit === 'false' ? 'not' : ''} given_unit`

  return res.json(await getPatientsWithAttributes(db, id, filterLosers))
})

// process all patients in a source file
router.post('/sourceFiles/:id/process', async (req, res) => {
  const { db } = req
  const id = req.params.id

  try {
    // update status of file to be processing
    const sourceFile = await db.sourceFile.findOne({ where: { id } })
    sourceFile.status = 'PROCESSING'
    await sourceFile.save()

    const configId = sourceFile.dataValues.configurationId
    const reserveCategories = (
      await db.reserveCategory.findAll({ where: { configurationId: configId } })
    ).map((ent) => ent.dataValues)

    const orderedPatientsByReserve = await Promise.all(
      reserveCategories.map((rc) => {
        return orderPatientsInReserveCategory(db, rc.id, rc.size, rc.name)
      })
    )

    let leftOver = 0 // handle this!
    const selectedPatients = new Set()
    const allocatedPatientGroups = new Map()
    const notSelectedPatients = new Set()
    const nthReservePatients = []

    orderedPatientsByReserve.forEach((f) => {

      if (f.size > f.patients.length) {
        leftOver += f.size - f.patients.length
      } else {

        let given = 0
        let i = 0
        while (given < f.size) {

          if (!selectedPatients.has(f.patients[i])) {
            selectedPatients.add(f.patients[i])
            allocatedPatientGroups[f.patients[i]] = f.name
            given += 1
            notSelectedPatients.delete(f.patients[i])

            if (given == f.size - 1) {
              nthReservePatients.push(
                {
                  name: f.name,
                  nthRecipientPrimaryId: f.patients[i]
                }
              )
            }
          }

          console.log(i, given, f.size)

          i += 1
        }

        while (i < f.patients.length) {
          if (!selectedPatients.has(f.patients[i])) {
            notSelectedPatients.add(f.patients[i])
          }
          i += 1
        }
      }
    })

    // update patients
    selectedPatients.forEach(async (pId) => {
      const patient = await db.patient.findOne({ where: { id: pId } })
      patient.given_unit = true
      patient.group_allocated_under = allocatedPatientGroups[pId]
      await patient.save()
    })



    const nthReservePatientsWithNames = await Promise.all(nthReservePatients.map(async f => {
      let name = (await db.patient.findOne({ where: { id: f.nthRecipientPrimaryId } })).recipient_id
      return { name: f.name, nthRecipientId: name }
    }))

    // update sourceFile
    sourceFile.status = 'FINISHED'
    sourceFile.nth_reserve_patients = JSON.stringify(nthReservePatientsWithNames)
    const finished = await sourceFile.save()

    if (finished)
      emitter.emit(
        STATUS_UPDATE,
        (await db.sourceFile.findAll()).map((sf) => sf.dataValues)
      )
  } catch (err) {
    // update status of file to be error processing
    const sourceFile = await db.sourceFile.findOne({ where: { id } })
    sourceFile.status = 'ERROR'
    await sourceFile.save()
  }

  return res.json() // return 200 no matter WHAT
})

// POST a source file
router.post('/sourceFiles', async (req, res) => {
  const { db } = req

  try {
    const newSourceFile = await db.sourceFile.create(req.body)

    return res.status(201).json(newSourceFile.dataValues)
  } catch (err) {
    return res.status(400)
  }
})

async function getPatientsWithAttributes(db, sourceFileId, filterLosers) {

  const patients = await Promise.all((await db.sequelize.query(
    `
    select name, given_unit, rand_number, info, group_allocated_under
    from patient 
    where source_file_id = ${sourceFileId} ${filterLosers};
    `,
    { type: SELECT }
  ))[0].map(p => {

    let patObj = JSON.parse(p.info)
    patObj["random_number"] = p.rand_number
    patObj["allocated_status"] = p.given_unit === 1
    patObj['group_allocated_under'] = p.group_allocated_under
    return patObj
  }))

  return patients
}

async function orderPatientsInReserveCategory(db, reserveCategoryId, size, name) {
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
            select patient_id 
            from patient_reserve_category prc 
            where reserve_category_id = ${reserveCategoryId}
          ) a
          left join
          (
            select bucket_order as nc_1, patient_id
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
          on a.patient_id = b.patient_id
        ) a
        left join 
        (
          select a.patient_id, nc_2, nc_3 
          from 
          (
            select a.patient_id, nc_2 
            from 		
            (
              select patient_id 
              from patient_reserve_category prc 
              where reserve_category_id = ${reserveCategoryId}
            ) a
            left join
            (
              select bucket_order as nc_2, patient_id
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
            on a.patient_id = b.patient_id
          ) a
          left join 
          (
            select a.patient_id, nc_3
            from 		
            (
              select patient_id 
              from patient_reserve_category prc 
              where reserve_category_id = ${reserveCategoryId}
            ) a
            left join
            (
              select bucket_order as nc_3, patient_id
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
            on a.patient_id = b.patient_id
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
            select patient_id 
            from patient_reserve_category prc 
            where reserve_category_id = ${reserveCategoryId} 
          ) a
          left join
          (
            select patient_id, element_order as cc_1
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
          on a.patient_id = b.patient_id
        ) a
        left join 
        (
          select a.patient_id, cc_2, cc_3
          from
          (
            select a.patient_id, cc_2
            from 		
            (
              select patient_id 
              from patient_reserve_category prc 
              where reserve_category_id = ${reserveCategoryId}
            ) a
            left join
            (
              select patient_id, element_order as cc_2
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
            on a.patient_id = b.patient_id
          ) a
          inner join
          (
            select a.patient_id, cc_3
            from 		
            (
              select patient_id 
              from patient_reserve_category prc 
              where reserve_category_id = ${reserveCategoryId}
            ) a
            left join
            (
              select patient_id, element_order as cc_3
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
            on a.patient_id = b.patient_id
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
  )

  return {
    id: reserveCategoryId,
    size,
    name,
    patients: (await orderedPatientIds)[0].map((ent) => ent.id),
  }
}

module.exports = router
