const mongoose = require('mongoose');

const { model, Schema } = mongoose;


const Employee = new Schema({
  emCard: String,
  firstName: String,
  lastName: String,
  position: String,
  department: String,
  dateStart: String,
},{
  timestamps: true
});

module.exports = model('Employee', Employee);
