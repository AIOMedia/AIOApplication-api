// Load App dependencies (packages)
var express    = require('express');
var path       = require('path');
var logger     = require('morgan');
var bodyParser = require('body-parser');

// Load App dependencies (local modules)
var dbManager     = require('./Core/Services/DatabaseManager');
var moduleManager = require('./Core/Services/ModuleManager');

// Load configuration file
var config = require('./config');

// Initialize the App
var app = express();

// Configuration
app.use(logger('dev'));
app.use(bodyParser.json());

// Allow cross-origin request to make the API available even when you are not on same network
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Start DB
var db = new dbManager();
db.connect();

// Register modules
if (config && config.modules) {
    var mod = new moduleManager();

    var registeredModules = Object.keys(config.modules);
    for (var i = 0; i < registeredModules.length; i++) {
        var registeredModule = registeredModules[i];
        var registeredConfig = config.modules[registeredModule];

        // Register module
        mod.register(registeredModule, registeredConfig);

        // Check if current module provides route
        if (registeredConfig.route) {
            var routeFilePath = './' + registeredModule + '/routes';

            try {
                // Try to load the routes
                var routes = require(routeFilePath);

                // Register routes into the app
                app.use(registeredConfig.route, routes);
            } catch (e) {
                console.log('Load modules : Module "' + registeredModule + '". (' + e + ')');
            }
        }
    }
}

// Declare default routes
var defaultRoutes = require('./routes');
app.use('/', defaultRoutes);

module.exports = app;
