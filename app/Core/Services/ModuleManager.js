/**
 * ModuleManager
 *
 * @module      Core
 * @description Manages enabled modules
 */

/**
 * Constructor
 * @constructor
 */
var ModuleManager = function () {

};

ModuleManager.prototype.constructor = ModuleManager;

/**
 * List of registered modules
 * @type {Array}
 */
ModuleManager.prototype.registeredModules = {};

/**
 * Register a new module
 */
ModuleManager.prototype.register = function (module, config) {
    ModuleManager.prototype.registeredModules[module] = config;
};

module.exports = ModuleManager;