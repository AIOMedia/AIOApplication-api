/**
 * Artist Model
 *
 * @module Artist
 * @description Model for Artist object
 */

// Load mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create Artist schema
var ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Artist', ArtistSchema);