/**
 * Database
 *
 * @module      Core
 * @description Manages connection to the Database
 */

// Load dependencies
var mongoose = require('mongoose');

var Database = {
    connect: function (name, host, port) {
        if (name) {
            // Set defaults
            var port = port || 27017;
            var host = host || 'localhost';

            // Create connection URI
            var dbUri = 'mongodb://' + host + ':' + port + '/' + name;

            // Connect to DB using Mongoose
            mongoose.connect(dbUri);

            var db = mongoose.connection;

            db.on('error', console.error.bind(console, 'Database : '));
            db.once('open', function callback() {
                console.log('Database : connected to "' + dbUri + '".');
            });
        } else {
            console.error('Database : Can not connect to DB without name specified.');
        }
    }
};

module.exports = Database;