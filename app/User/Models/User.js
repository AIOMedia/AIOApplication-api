var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName : String,
    lastName  : String,
    avatar    : String
});

module.exports = mongoose.model('User', UserSchema);