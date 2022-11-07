const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Employee = require('../../models/employee');

// CRUD ==> Create

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
