var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    order: Number,
    dateDue     : Date,
    done        : Boolean,
    dateDone    : Date
});

/*TaskSchema.pre('save', function (next) {
    if (this.isModified('done') && this.done) {
        // Task is mark has down => store date and time when it has occurred
        this.dateDone = new Date();
    }
});*/

module.exports = mongoose.model('Task', TaskSchema);