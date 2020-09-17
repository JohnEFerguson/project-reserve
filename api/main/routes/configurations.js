'use strict'

const { Router } = require('express')

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
    .find({
      where: { id },
    })
    .then((configuration) => {
      res.json(configuration)
    })
})

// POST single configuration 
router.post('/configurations', (req, res) => {
  const { db } = req

  const unitType = req.body.unitType
  const supply = req.body.supply


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
