/**
 * Task Controller
 *
 * @module Task
 * @description CRUD for Task management
 */

// Load Response
var Response = require('../../Core/Response');

// Load Task model
var Task = require('../Models/Task');

var TaskController = {
    /**
     * List all Tasks
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    list: function (req, res) {
        return Task.find(function (err, tasks) {
            var response = null;

            if (err) {
                // Something goes wrong
                response = new Response.Error.Server(res, err.message);
            } else if (0 === tasks.length) {
                // It's ok, but no data found
                response = new Response.Data.NoResult(res);
            } else {
                // It's ok and we have data to return
                response = new Response.Data.Collection(res, tasks);
            }

            return response;
        });
    },

    /**
     * Get a specific Task
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    get: function (req, res) {
        return Task.findById(req.params.id, function (err, task) {
            var response = null;

            if (err) {
                // Something goes wrong
                response = new Response.Error.Server(res, err.message);
            } else if (!task) {
                // Task not found
                response = new Response.Data.NotFound(res, 'Task Not Found');
            } else {
                // Task found
                response = new Response.Data.Item(res, task);
            }

            return response;
        });
    },

    /**
     * Create a new Task
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    create: function (req, res) {
        var task = new Task({
            name: req.body.name,
            done: req.body.done
        });

        return task.save(function (err) {
            var response = null;
            if (err) {
                response = new Response.Error.Internal(res, err);
            } else {
                response = new Response.Data.Created(res, task, 'Task Created');
            }

            return response;
        });
    },

    /**
     * Update an existing Task
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    update: function (req, res) {
        return Task.findById(req.params.id, function (err, task) {
            // Task not found
            if (!task) {
                return new Response.Data.NotFound(res, 'Task Not Found');
            }

            // Update Task properties
            if (req.body.name) {
                task.name = req.body.name;
            }

            if (typeof req.body.done !== 'undefined') {
                task.done = req.body.done;
            }

            // Save to DB
            return task.save(function (err) {
                if (!err) {
                    return new Response.Data.Updated(res, task, 'Task Updated');
                } else {
                    console.log('Internal error(%d): %s', res.statusCode, err.message);

                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;

                        return res.json({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;

                        return res.json({ error: 'Internal Server error' });
                    }
                }
            });
        });
    },

    /**
     * Delete an existing Task
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    delete: function (req, res) {
        return Task.findById(req.params.id, function (err, task) {
            if (!task) {
                return new Response.Data.NotFound(res, 'Task Not Found');
            }

            return task.remove(function (err) {
                if (!err) {
                    console.log('Removed Task');

                    return res.json({ status: 'OK' });
                } else {
                    res.statusCode = 500;

                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                    return res.json({ error: 'Internal Server error' });
                }
            })
        });
    }
};

module.exports = TaskController;