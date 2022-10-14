const mongoose = require('mongoose');

const { model, Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  idCard: String,
  firstName: String,
  lastName: String,
  dateStart: String,
  username: String,
},{
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = model('User', User);
