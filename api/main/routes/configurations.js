'use strict'

const { Router } = require('express')
const { SELECT } = require('sequelize')

const router = Router()

// GET all configurations
router.get('/configurations', async (req, res) => {
  const { db } = req

  return res.json(await db.configuration.findAll({ order: ['id'] }))
})

// GET one configuration by id
router.get('/configurations/:id', async (req, res) => {
  const { db } = req

  const id = req.params.id
  return res.json(await db.configuration.find({ where: { id } }))
})

// POST single configuration
router.post('/configurations', async (req, res) => {
  const { db } = req

  try {
    const newConfig = await db.configuration.create(req.body, {
      include: {
        association: db.configuration.reserveCategories,
        include: {
          association: db.reserveCategory.priority,
          include: [
            {
              association: db.priority.categoryCriteria,
              include: db.categoryCriteria.categoryCriteriaElement,
            },
            {
              association: db.priority.numericCriteria,
              include: db.numericCriteria.numericCriteriaBucket,
            },
          ],
        },
      },
    })

    return res.status(201).json(newConfig.dataValues)
  } catch (err) {
    return res.status(400)
  }
})

// Get field names for template CSV
router.get('/configurations/:id/fieldNames', async (req, res) => {
  const { db } = req

  const configurationId = req.params.id

  const reserveCategoryNames = await db.reserveCategory.findAll({
    attributes: ['name'],
    where: { configurationId: configurationId, isDefault: false },
  })

  const categoryCriteriaFields = await db.sequelize.query(
    `
    SELECT name FROM category_criteria 
    WHERE priority_id IN (
      SELECT id FROM priority 
      WHERE reserve_category_id in (SELECT id FROM reserve_category WHERE configuration_id = ${configurationId})
    );
    `,
    { type: SELECT }
  )

  const numericCriteriaFields = await db.sequelize.query(
    `
    SELECT name FROM numeric_criteria 
    WHERE priority_id IN (
      SELECT id FROM priority 
      WHERE reserve_category_id in (SELECT id FROM reserve_category WHERE configuration_id = ${configurationId})
    );
    `,
    { type: SELECT }
  )

  const fieldNames = [{"name": "recipient_id", "required": true}]
  reserveCategoryNames.forEach((cat) =>
    fieldNames.push({"name": 'is_' + cat.name.toLowerCase().split(' ').join('_'), "required": true})
  )
  categoryCriteriaFields[0].forEach((criteria) =>
    fieldNames.push({"name": criteria.name.toLowerCase().split(' ').join('_'), "required": false})
  )
  numericCriteriaFields[0].forEach((criteria) =>
    fieldNames.push({"name": criteria.name.toLowerCase().split(' ').join('_'), "required": false})
  )

  res.json(fieldNames)
})

module.exports = router
