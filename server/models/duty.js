var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Duty = new Schema({
  doctorId: String,
  clinicId: String,
  day: Number,
  hourStart: Number,
  hourEnd: Number
});

module.exports = mongoose.model('duties', Duty);