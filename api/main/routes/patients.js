'use strict'

const { Router } = require('express')

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

// POST single patient
router.post('/patients', async (req, res) => {
  const { db } = req

  return res.json(await db.patient.create(req.body))
})

module.exports = router
