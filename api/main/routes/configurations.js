'use strict'

const { Router } = require('express')
const { QueryTypes } = require('sequelize');


const router = Router()

// GET all configurations
router.get('/configurations', (req, res) => {
  const { db } = req
  db.configuration
    .findAll({
      order: ['id'],
    })
    .then((configurations) => {
      res.json(configurations)
    })
})

// GET one configuration by id
router.get('/configurations/:id', (req, res) => {
  const { db } = req

  const id = req.params.id
  db.configuration
    .findAll({
      where: { id }
    })
    .then((configuration) => {
      res.json(configuration)
    })
})

// Get field names for template CSV
router.get('/configurations/:id/fieldNames', async (req, res) => {
  const { db } = req

  const configurationId = req.params.id

  const reserveCategoryNames = await db.reserveCategory
    .findAll({
      attributes: ['name'],
      where: { configurationId: configurationId }
    })

  const categoryCriteriaFields = await db.sequelize.query(
    `
    SELECT name FROM category_criteria 
    WHERE priority_id IN (
      SELECT id FROM priority 
      WHERE reserve_category_id = (SELECT id FROM reserve_category WHERE configuration_id = ${configurationId})
    );
    `, { type: QueryTypes.SELECT }
  )

  const numericCriteriaFields = await db.sequelize.query(
    `
    SELECT name FROM numeric_criteria 
    WHERE priority_id IN (
      SELECT id FROM priority 
      WHERE reserve_category_id = (SELECT id FROM reserve_category WHERE configuration_id = ${configurationId})
    );
    `, { type: QueryTypes.SELECT }
  )

  const fieldNames = []
  reserveCategoryNames.forEach(cat => fieldNames.push('is_' + cat.name.toLowerCase().split(' ').join('_')))
  categoryCriteriaFields.forEach(criteria => fieldNames.push(criteria.name.toLowerCase().split(' ').join('_')))
  numericCriteriaFields.forEach(criteria => fieldNames.push(criteria.name.toLowerCase().split(' ').join('_')))

  res.json(fieldNames)
})

// POST single configuration 
router.post('/configurations', (req, res) => {
  
  const { db } = req

  db.configuration
    .create(req.body, {
      include: {
        association: db.configuration.reserveCategories,
        include: {
          association: db.reserveCategory.priority,
          include: [
            {
              association: db.priority.categoryCriteria,
              include: db.categoryCriteria.categoryCriteriaElement
            },
            {
              association: db.priority.numericCriteria,
              include: db.numericCriteria.numericCriteriaBucket
            }
          ]
        }
      }
    })
    .then((newConfig) => {
      res.status(201).json(newConfig.dataValues)
    })
})

module.exports = router
