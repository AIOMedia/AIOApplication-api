// Load App dependencies (packages)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// Load App dependencies (local modules)
var database      = require('./Core/Database');
var moduleManager = require('./Core/Services/ModuleManager');

// Load configuration file
var config = require('./config');

// Initialize and configure App
var app = express();
app.set('port', config.port || process.env.PORT     || 3000);
app.set('env',  config.env  || process.env.NODE_ENV || 'production');

// Configure environment
switch (app.get('env')) {
    case 'production':
        var logger = morgan('short');
        break;
    case 'development':
        var logger = morgan('dev');
        break;
}

// Connect to DB
database.connect(config.database.name, config.database.host, config.database.port);

// Register middleware
app.use(logger);
app.use(bodyParser.json());
app.use(methodOverride()); // Handle PUT and DELETE requests

// TODO : check authentication

// Allow cross-origin request to make the API available even when you are not on same network
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Register modules
if (config && config.modules) {
    var mod = new moduleManager();

    var registeredModules = Object.keys(config.modules);
    for (var i = 0; i < registeredModules.length; i++) {
        var registeredModule = registeredModules[i];
        var registeredConfig = config.modules[registeredModule];

        console.log('Registering module [' + registeredModule + ']');

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

// Start the server
app.listen(app.get('port'), function() {
    console.log('AIOMedia API running on port [' + app.get('port') + '] in [' + app.get('env') + '] environment.');
});
