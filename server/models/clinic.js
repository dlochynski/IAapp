var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Clinic = new Schema({
  name: String
});

module.exports = mongoose.model('clinics', Clinic);