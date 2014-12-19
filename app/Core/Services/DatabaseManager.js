/**
 * DatabaseManager
 *
 * @module      Core
 * @description Manages connection to the Database
 */

// Load dependencies
var mongoose = require('mongoose');

// Load configuration
var config = require('../../config');

/**
 * Constructor
 * @param {string} name
 * @param {string} host
 * @param {number} port
 * @constructor
 */
var DatabaseManager = function (name, host, port) {
    // Get DB name
    if (name) {
        // DB name is provided, so we use it
        this.dbName = name;
    } else if (config.db && config.db.name) {
        // Use DB name found in config
        this.dbName = config.db.name;
    }

    // Get Host
    if (host) {
        // Host is provided, so we use it
        this.host = host;
    } else if (config.db && config.db.host) {
        // Use host found in config
        this.host = config.db.host;
    }

    // Get Port
    if (port) {
        // Port is provided, so we use it
        this.port = port;
    } else if (config.db && config.db.port) {
        // Use port found in config
        this.port = config.db.port;
    }
};

DatabaseManager.prototype.constructor = DatabaseManager;

/**
 * Database name
 * @type {string}
 */
DatabaseManager.prototype.dbName = 'aiomedia';

/**
 * Database host
 * @type {string}
 */
DatabaseManager.prototype.host = 'localhost';

/**
 * Database port
 * @type {number}
 */
DatabaseManager.prototype.port = 27017;

/**
 * Connect to the database
 */
DatabaseManager.prototype.connect = function () {
    // Create connection URI
    var dbUri = 'mongodb://' + this.host + ':' + this.port + '/' + this.dbName;

    // Connect to DB using Mongoose
    mongoose.connect(dbUri, function (err) {
        if (err) {
            console.log('error connecting to MongoDB Database. ' + err);
        } else {
            console.log('Connected to Database "' + this.dbName + '".');
        }
    }.bind(this));
};

module.exports = DatabaseManager;