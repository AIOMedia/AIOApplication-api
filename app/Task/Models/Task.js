/**
 * Task Model
 *
 * @module Task
 * @description Model for Task object
 */

// Load mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Task schema
var TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: Number
    },
    dateDue     : Date,
    done        : Boolean,
    dateDone    : Date
});

// Hook : pre-save
TaskSchema.pre('save', function (next) {
    console.log('coucou');
    var self = this;
    if (self.isModified('done') && self.done) {
        // Task is mark has down => store date and time when it has occurred
        self.dateDone = new Date();
    }

    // Get order of the Task if not defined
    if (!self.position) {
        mongoose.models['Task'].count({}, function (err, count) {
            self.position = count + 1;

            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('Task', TaskSchema);