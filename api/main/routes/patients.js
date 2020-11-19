'use strict'

const { Router } = require('express')
const { Op } = require('sequelize')

const router = Router()

// GET all patients
router.get('/patients', async (req, res) => {
  const { db } = req
  return res.json(await db.patient.findAll({ order: ['id'] }))
})

// GET one patient by id
router.get('/patients/:id', async (req, res) => {
  const { db } = req

  const id = req.params.id
  return res.json(await db.patient.find({ where: { id } }))
})

// POST list of patients
router.post('/patients', async (req, res) => {
  const { db } = req

  try {
    // get individual raw patients
    const rawPatients = req.body

    const createdPatients = Promise.all(
      rawPatients.map(async (rawPat) => {
        const configurationId = rawPat.configurationId

        const newPatient = {
          name: rawPat.name,
          sourceFileId: rawPat.sourceFileId,
          configurationId,
          rand_number: Math.random() * 100000,
          info: JSON.stringify(rawPat)
        }

        const fields = Object.keys(rawPat)

        // add reserve categories
        const reserveCategoryFieldNames = fields
          .filter((f) => f.startsWith('is_') && rawPat[f])
          .map((f) => f.substr(3))
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
        })

        newPatient.reserveCategories = await reserveCategories
        const priorityIds = newPatient.reserveCategories.map(
          (rc) => rc.priority.id
        )

        const createdPatient = await db.patient.create(newPatient)
        newPatient.reserveCategories.forEach(async (cat) => {
          createdPatient.addReserveCategory(cat)
        })

        // add numeric criteria values
        const possibleNumericCriteriaFields = fields.filter(
          (f) => !f.startsWith('is_')
        )
        const numericCriteria = db.numericCriteria.findAll({
          where: {
            name: { [Op.in]: possibleNumericCriteriaFields },
            priority_id: { [Op.in]: priorityIds },
          },
        })

        newPatient.numericCriteria = await numericCriteria
        newPatient.numericCriteria.forEach(async (crit) => {
          const critId = crit.dataValues.id
          const fieldName = crit.dataValues.name
          const value = rawPat[fieldName]

          const bucket = await db.numericCriteriaBucket.findOne({
            where: {
              numeric_criterium_id: critId,
              [Op.and]: [
                { min: { [Op.lte]: value } },
                { max: { [Op.gt]: value } },
              ],
            },
          })

          // TODO: alias to avoid weird naming?
          await createdPatient.addNumeric_criteria_bucket(bucket, {
            through: { value: rawPat[fieldName] },
          })
        })

        // add category criteria values
        const possibleCategoryCriteriaFields = fields.filter(
          (f) => !f.startsWith('is_')
        )
        const categoryCriteria = db.categoryCriteria.findAll({
          where: { name: { [Op.in]: possibleCategoryCriteriaFields } },
          priority_id: { [Op.in]: priorityIds },
        })
        newPatient.categoryCriteria = await categoryCriteria
        newPatient.categoryCriteria.forEach(async (crit) => {
          const critId = crit.dataValues.id
          const fieldName = crit.dataValues.name
          const value = rawPat[fieldName]

          const element = await db.categoryCriteriaElement.findOne({
            where: {
              category_criterium_id: critId,
              name: value,
            },
          })

          await createdPatient.addCategory_criteria_element(element, {
            through: { value: rawPat[fieldName] },
          })
        })

        return createdPatient
      })
    )

    return res.status(201).json(await createdPatients)
  } catch (err) {
    return res.status(400)
  }
})
module.exports = router
