'use strict';

module.exports = (app, db) => {
  
  // GET all patients
  app.get('/patients', (req, res) => {
    db.patient.findAll({
      order: 'id DESC'
    })
      .then(patients => {
        res.json(patients);
      });
  });

  // GET one patient by id
  app.get('/patients/:id', (req, res) => {
    const id = req.params.id;
    db.patient.find({
      where: { id: id }
    })
      .then(patient => {
        res.json(patient);
      });
  });


  // POST single patient
  app.post('/patients', (req, res) => {
    console.log(req.body)
    const task = req.body.task;
    db.patient.create({
      task: task,
      urgency: urgency
    })
      .then(newTodo => {
        res.json(newTodo);
      })
  });
};
