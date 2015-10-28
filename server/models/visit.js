var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Visit = new Schema({
  hour: Number,
  userId: String,
  doctorId: String,
  clinicId: String
});

module.exports = mongoose.model('visit', Visit);