'use strict'

const { Router } = require('express')
const { Op } = require("sequelize");

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
  return res.json(await db.sourceFile.find({ where: { id } }))
})


// GET all patients for a source file
router.get('/sourceFiles/:id/patients', async (req, res) => {
  const { db } = req

  const id = req.params.id
  return res.json(await db.patient.findAll({ where: { sourceFileId: id } }))
})

// process all patients in a source file
router.post('/sourceFiles/:id/process', async (req, res) => {
  const { db } = req

  const id = req.params.id
  return res.json(await db.patient.findAll({ where: { sourceFileId: id } }))
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

module.exports = router