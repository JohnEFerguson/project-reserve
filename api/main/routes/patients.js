'use strict'

const { Router } = require('express')
const { Op } = require('sequelize')

const { STATUS_UPDATE } = require('../../../socketConstants')
const { emitter } = require('../../../modules/io')
const router = Router()

// GET all patients
router.get('/patients', async (req, res) => {
  const { db } = req
  return res.json(await db.patient.findAll({ order: ['id'] }))
})
router.get('/test', (req, res) => {
  emitter.emit(STATUS_UPDATE, 'penis')
  return res.json('penis')
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
        }

        const fields = Object.keys(rawPat)

        // add reserve categories
        const reserveCategoryFieldNames = fields.filter((f) =>
          f.startsWith('is_')
        )
        const reserveCategories = Promise.all(
          reserveCategoryFieldNames.map((f) => {
            return db.reserveCategory.findOne({
              where: { configurationId, name: f.substr(3) },
            })
          })
        )

        // TODO: get possible priority ids here and filter criteria query with them!
        newPatient.reserveCategories = await reserveCategories
        const createdPatient = await db.patient.create(newPatient)
        newPatient.reserveCategories.forEach(async (cat) => {
          await createdPatient.addReserveCategory(cat)
        })

        // add numeric criteria values
        const possibleNumericCriteriaFields = fields.filter(
          (f) => !f.startsWith('is_')
        )
        const numericCriteria = Promise.all(
          possibleNumericCriteriaFields.map((f) => {
            return db.numericCriteria.findOne({ where: { name: f } })
          })
        )
        newPatient.numericCriteria = (await numericCriteria).filter(
          (crit) => !!crit
        )
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
        const categoryCriteria = Promise.all(
          possibleCategoryCriteriaFields.map((f) => {
            return db.categoryCriteria.findOne({ where: { name: f } })
          })
        )
        newPatient.categoryCriteria = (await categoryCriteria).filter(
          (crit) => !!crit
        )
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

          // TODO: alias to avoid weird naming?
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
