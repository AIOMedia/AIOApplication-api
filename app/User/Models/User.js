var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login     : String,
    password  : String,
    firstName : String,
    lastName  : String
});

module.exports = mongoose.model('User', UserSchema);