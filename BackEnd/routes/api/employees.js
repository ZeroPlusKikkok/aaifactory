const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Employee = require('../../models/employee');

// CRUD ==> Create
const db = {
  emCard: req.body.emCard,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  position: req.body.position,
  department: req.body.department,
  dateStart: req.body.dateStart,
};

// CRUD ==> Read
router.get('/list', (req, res, next) => {
  Employee.find((err, employees) => {
    if (err) {
      return res.send(err);
    }
    return res.json(employees);
  });
});

// CRUD ==> Update

// CRUD ==> Delete


module.exports = router;
