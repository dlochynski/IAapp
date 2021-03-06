// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  username: String,
  password: String,
  role: String,
  active: Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);