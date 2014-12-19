var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigurationSchema = new Schema({

});

module.exports = mongoose.model('Configuration', ConfigurationSchema);