const express = require('express');
const mongoose = require('mongoose');
const Employee = require('../../models/employee');

const router = express.Router();

// CRUD ==> Create (POST) — Make something
router.post('/create', (req, res) => {

  if (!req.body.emCard){
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newEmployee = new Employee({
    emCard: req.body.emCard,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    department: req.body.department,
    dateStart: req.body.dateStart,
  });

  Employee.create(newEmployee, (err, employee) => {
    if (err) {
      return res.send(JSON.stringify({ error: err }));
    }
    return res.send(JSON.stringify(employee));
  });
});

// CRUD ==> Read (GET)_- Get something
router.get('/list', (req, res, next) => {
  Employee.find((err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.json(employees);
  });
});

router.get('/list/:id', (req, res, next) => {
  const id = req.params.id;

  Employee.findById(id, (err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.json(employees);
  });
});

// Update (PUT) — Change something
router.put('/update/:id', (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, (err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.send({
      employees,
      message: "Employee was updated successfully!!"
    });
    // json(employees);
  });

});

// Delete (DELETE)– Remove something
router.delete('/delete/:id', (req, res) => {

  const id = req.params.id;

  Employee.findByIdAndRemove(id, req.body, (err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.send({
      employees,
      message: "Employee was delete successfully!!"
    });
    //json(employees);
  });

});

module.exports = router;
