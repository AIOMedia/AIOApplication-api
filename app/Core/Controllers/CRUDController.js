/**
 * CRUD Controller
 * Base controller used to perform CRUD actions (CREATE, READ, UPDATE, DELETE)
 *
 * @module Core
 * @description CRUD for data management
 */

// Load Response
var Response = require('../Response');

/**
 * Controller constructor
 * @param {string} dataModel - relative path to model file from app root directory (default root: app/)
 * @constructor
 */
var CRUDController = function CRUDController (dataModelPath) {
    if (!dataModelPath) {
        // There is no sense to have a crud without underlying data
        console.error('CRUD controller requires a data model.');
    } else {
        // Load model
        try {
            this.dataModel = require('../../' + dataModelPath);
        } catch (e) {
            this.dataModel = null;

            console.log('CRUD controller can not load model (error: ' + e.message + ').');
        }
    }
};

CRUDController.prototype.constructor = CRUDController;

/**
 * A data model managed by the controller
 * @type {Mongoose.Schema}
 */
CRUDController.prototype.dataModel = null;

/**
 * List all data
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
CRUDController.prototype.list = function (req, res) {
    return this.dataModel.find({}, null, {}, function (err, collection) {
        var response = null;

        if (err) {
            // Something goes wrong
            response = new Response.Error.Internal(res, err.message);
        } else if (0 === collection.length) {
            // It's ok, but no data found
            response = new Response.Data.NoResult(res);
        } else {
            // It's ok and we have data to return
            response = new Response.Data.Collection(res, collection);
        }

        return response;
    });
};

/**
 * Get a specific data item
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
CRUDController.prototype.get = function (req, res) {
    return this.dataModel.findById(req.params.id, function (err, item) {
        var response = null;

        if (err) {
            // Something goes wrong
            response = new Response.Error.Internal(res, err.message);
        } else if (!item) {
            // Item not found
            response = new Response.Data.NotFound(res);
        } else {
            // Item found
            response = new Response.Data.Item(res, item);
        }

        return response;
    });
};

/**
 * Create a new data item
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
CRUDController.prototype.create = function (req, res) {
    // Initialize a new object
    var newItem = new this.dataModel();

    // Populate the new item with the request
    this.populate(newItem, req.body);

    return newItem.save(function (err) {
        var response = null;
        if (!err) {
            response = new Response.Data.Created(res, newItem);
        } else {
            if (err.name == 'ValidationError') {
                // Invalid data has been post (we will return the errors list to user)
                response = Response.Data.Invalid(res, newItem, 'Data not saved due to validation errors.', err.errors || {});
            } else {
                // Other errors
                response = Response.Error.Internal(res, err.message);
            }
        }

        return response;
    });
};

/**
 * Update an existing data item
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
CRUDController.prototype.update = function (req, res) {
    var ctrl = this;

    return this.dataModel.findById(req.params.id, function (err, item) {
        var response = null;

        if (err) {
            // Something goes wrong
            response = new Response.Error.Internal(res, err.message);
        } else if (!item) {
            // Item Not Found
            response = new Response.Data.NotFound(res);
        } else {
            // Update found Item
            ctrl.populate(item, req.body); // Populate the data with the request

            // Save to DB
            response = item.save(function (err) {
                var response = null;
                if (!err) {
                    return new Response.Data.Updated(res, item);
                } else {
                    if (err.name == 'ValidationError') {
                        // Invalid data has been post (we will return the errors list to user)
                        response = Response.Data.Invalid(res, item, 'Item not saved due to validation errors.', err.errors || {});
                    } else {
                        // Other errors
                        response = Response.Error.Internal(res, err.message);
                    }
                }

                return response;
            });
        }

        return response;
    });
};

/**
 * Delete an existing data item
 *
 * @param {Object} req HTTP request object
 * @param {Object} res HTTP response object
 */
CRUDController.prototype.delete = function (req, res) {
    return this.dataModel.findById(req.params.id, function (err, item) {
        var response = null;

        if (err) {
            // Something goes wrong
            response = new Response.Error.Internal(res, err.message);
        } else if (!item) {
            // Item Not Found
            response = new Response.Data.NotFound(res);
        } else {
            // Delete found Item
            response = item.remove(function (err) {
                var response = null;

                if (err) {
                    response = new Response.Error.Internal(res, err);
                } else {
                    response = new Response.Data.Deleted(res, item);
                }

                return response;
            });
        }

        return response;
    });
};

CRUDController.prototype.populate = function (modelInstance, newData) {
    if (newData) {
        // Loop through data schema to check if there is a value in the request body
        this.dataModel.schema.eachPath(function (name){
            if (newData.hasOwnProperty(name)) {
                // There is a value in the request for the current field
                modelInstance[name] = newData[name];
            }
        });
    }

    return modelInstance;
};

module.exports = CRUDController;