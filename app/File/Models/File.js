/**
 * File Model
 *
 * @module File
 * @description Model for File object
 */

// Load mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create File schema
var FileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date
    },
    dateUpdated: {
        type: Date
    }
});

// Hook : pre-save
FileSchema.pre('save', function (next) {
    var now = new Date();
    this.dateUpdated = now;
    if (!this.dateCreated) {
        this.dateCreated = now;
    }

    next();
});

module.exports = mongoose.model('File', FileSchema);