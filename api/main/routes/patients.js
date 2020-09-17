'use strict'

const { Router } = require('express')

const router = Router()

// GET all patients
router.get('/patients', (req, res) => {
  const { db } = req
  db.patient
    .findAll({
      order: ['id'],
    })
    .then((patients) => {
      res.json(patients)
    })
})

// GET one patient by id
router.get('/patients/:id', (req, res) => {
  const { db } = req

  const id = req.params.id
  db.patient
    .find({
      where: { id },
    })
    .then((patient) => {
      res.json(patient)
    })
})

// POST single patient
router.post('/patients', (req, res) => {
  const { db } = req

  const task = req.body.task
  db.patient
    .create({
      task,
      urgency: null,
    })
    .then((newTodo) => {
      res.json(newTodo)
    })
})

module.exports = router
