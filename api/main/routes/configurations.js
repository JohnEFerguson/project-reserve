'use strict'

const { Router } = require('express')

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
  return res.json(await db.configuration.find({where: { id }}))
})

// POST single configuration 
router.post('/configurations', async (req, res) => {
  const { db } = req

  try {
    const newConfig = await db.configuration
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

    return res.status(201).json(newConfig.dataValues)
  }
  catch (err) {
    return res.status(400)
  }
})

module.exports = router
