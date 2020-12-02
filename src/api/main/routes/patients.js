"use strict";

const { Router } = require("express");
const { Op } = require("sequelize");

const router = Router();

// GET all patients
router.get("/patients", async (req, res) => {
  const { db } = req;
  return res.json(await db.patient.findAll({ order: ["id"] }));
});

// GET one patient by id
router.get("/patients/:id", async (req, res) => {
  const { db } = req;

  const id = req.params.id;
  return res.json(await db.patient.find({ where: { id } }));
});

// POST list of patients
router.post("/patients", async (req, res) => {
  const { db } = req;

  try {
    // get individual raw patients
    const rawPatients = req.body;

    const createdPatients = Promise.all(
      rawPatients.map(async (rawPat) => {
        const configurationId = rawPat.configurationId;

        rawPat['used_generated_random_number'] = rawPat.usedGeneratedRandomNumber

        const rand_number = rawPat['used_generated_random_number'] ? Math.random() * 100000 : rawPat.random_number

        const newPatient = {
          recipient_id: rawPat.recipient_id,
          sourceFileId: rawPat.sourceFileId,
          configurationId,
          rand_number,
          info: JSON.stringify(rawPat),
        };

        const fields = Object.keys(rawPat);

        // add reserve categories
        const reserveCategoryFieldNames = fields
          .filter((f) => f.startsWith("is_") && rawPat[f])
          .map((f) => f.substr(3));
        const reserveCategories = db.reserveCategory.findAll({
          where: {
            configurationId,
            [Op.or]: [
              { isDefault: true },
              { name: { [Op.in]: reserveCategoryFieldNames } },
            ],
          },
          include: [
            {
              model: db.priority,
            },
          ],
        });

        newPatient.reserveCategories = await reserveCategories;
        const priorityIds = newPatient.reserveCategories.map(
          (rc) => rc.priority.id
        );

        const createdPatient = await db.patient.create(newPatient);
        newPatient.reserveCategories.forEach(async (cat) => {
          createdPatient.addReserveCategory(cat);
        });

        // add numeric criteria values
        const possibleNumericCriteriaFields = fields.filter(
          (f) => !f.startsWith("is_")
        );
        const numericCriteria = db.numericCriteria.findAll({
          where: {
            name: { [Op.in]: possibleNumericCriteriaFields },
            priority_id: { [Op.in]: priorityIds },
          },
        });

        newPatient.numericCriteria = await numericCriteria;
        const numericCriteriaValues = await Promise.all(newPatient.numericCriteria.map(async (crit) => {
          const critId = crit.dataValues.id;
          const fieldName = crit.dataValues.name;
          const value = rawPat[fieldName];

          let bucket = null;

          if (crit.coarsened && value != crit.dataValues.max) {
            bucket = await db.numericCriteriaBucket.findOne({
              where: {
                numeric_criterium_id: critId,
                [Op.and]: [
                  { min: { [Op.lte]: value } },
                  { max: { [Op.gt]: value } },
                ],
              },
            });
          } else if (crit.coarsened) {

            bucket = await db.numericCriteriaBucket.findOne({
              where: {
                numeric_criterium_id: critId,
                [Op.and]: [
                  { min: { [Op.lte]: value } },
                  { max: { [Op.gte]: value } },
                ],
              },
            })
          } else {
            bucket = await db.numericCriteriaBucket.create({
              numericCriteriumId: critId,
              order: crit.ascending ? value : value * -1,
            });
          }

          // TODO: alias to avoid weird naming?
          return await createdPatient.addNumeric_criteria_bucket(bucket, {
            through: { value: rawPat[fieldName] },
          });
        }))

        // add category criteria values
        const possibleCategoryCriteriaFields = fields.filter(
          (f) => !f.startsWith("is_")
        );
        const categoryCriteria = db.categoryCriteria.findAll({
          where: { name: { [Op.in]: possibleCategoryCriteriaFields } },
          priority_id: { [Op.in]: priorityIds },
        });
        newPatient.categoryCriteria = await categoryCriteria;
        const categoryCriteriaElements = await Promise.all(newPatient.categoryCriteria.map(async (crit) => {
          const critId = crit.dataValues.id;
          const fieldName = crit.dataValues.name;
          const value = rawPat[fieldName];

          const element = await db.categoryCriteriaElement.findOne({
            where: {
              category_criterium_id: critId,
              name: value,
            },
          });

          return await createdPatient.addCategory_criteria_element(element, {
            through: { value: rawPat[fieldName] },
          });
        }));


        return categoryCriteriaElements;
      })
    );

    return res.status(201).json(await createdPatients);
  } catch (err) {
    return res.status(400).json(err);
  }
});
module.exports = router;
