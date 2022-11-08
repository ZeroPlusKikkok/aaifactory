const express = require('express');
const mongoose = require('mongoose');
const employee = require('../../models/employee');

const router = express.Router();

const Employee = require('../../models/employee');

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

// Update (PUT) — Change something
router.put('/update/:Id', (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const Id = req.params.Id;

  Employee.findByIdAndUpdate(Id, req.body, (err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.send({
      message: "Employee was updated successfully!!"
    });
    // json(employees);
  });

});

// Delete (DELETE)– Remove something
router.delete('/delete/:Id', (req, res) => {

  const Id = req.params.Id;

  Employee.findByIdAndRemove(Id, req.body, (err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.send({
      message: "Employee was delete successfully!!"
    });
    //json(employees);
  });

});

module.exports = router;
