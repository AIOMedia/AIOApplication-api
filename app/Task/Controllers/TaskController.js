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
            if (!err) {
                return new Response.Data.Collection(res, tasks);
            } else {
                console.log('Task error : %s' , err.message);

                return new Response.Error.Server(res);
            }
        });
    },

    /**
     * Get a specific Task
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    get: function (req, res) {
        return Task.findById(req.params.id, function (err, task) {
            if (!task) {
                return new Response.Data.NotFound(res, 'Task Not Found');
            }

            if (!err) {
                return new Response.Data.Item(res, task);
            } else {
                console.log('Task error : %s', err.message);

                return new Response.Error.Server(res);
            }
        });
    },

    /**
     * Create a new Task
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    create: function (req, res) {
        var task = new Task({
            /*login    : req.body.login,
            password : req.body.password,
            firstName: req.body.firstName,
            lastName : req.body.lastName*/
        });

        return task.save(function (err) {
            if (err) {
                console.log('Error while saving task : ' + err);

                return res.json({ error: err });
            } else {
                console.log('Task Created');
                res.statusCode = 201;

                return res.json({ data: task });
            }
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
                res.statusCode = 404;
                return res.json({ error: 'Task Not Found' });
            }

            // Update Task properties
            /*if (req.body.login) {
                user.login = req.body.login;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.firstName) {
                user.firstName = req.body.firstName;
            }
            if (req.body.lastName) {
                user.lastName  = req.body.lastName;
            }*/

            // Save to DB
            return task.save(function (err) {
                if (!err) {
                    console.log('Task Updated');
                    return res.json({ data: task });
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