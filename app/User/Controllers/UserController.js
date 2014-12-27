/**
 * User Controller
 *
 * @module User
 * @description CRUD for User management
 */

// Load Response
var Response = require('../../Core/Response');

// Load User model
var User = require('../Models/User');

var UserController = {
    /**
     * List all Users
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    list: function (req, res) {
        return User.find(function (err, users) {
            var response = null;

            if (!err) {
                response = new Response.Data.Collection(res, users);
            } else {
                response = new Response.Error.Internal(res, err.message);
            }

            return response;
        });
    },

    /**
     * Get a specific User
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    get: function (req, res) {
        return User.findById(req.params.id, function (err, user) {
            var response = null;

            if (err) {
                response = new Response.Error.Internal(res, err.message);
            } else if (!user) {
                response = new Response.Data.NotFound(res, 'User Not Found');
            } else {
                response = new Response.Data.Item(res, user);
            }

            return response;
        });
    },

    /**
     * Create a new User
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    create: function (req, res) {
        var user = new User({
            login    : req.body.login,
            password : req.body.password,
            firstName: req.body.firstName,
            lastName : req.body.lastName
        });

        return user.save(function (err) {
            var response = null;

            if (err) {
                response = new Response.Error.Internal(res, err);
            } else {
                response = new Response.Data.Created(res, user, 'User Created');
            }

            return response;
        });
    },

    /**
     * Update an existing User
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    update: function (req, res) {
        return User.findById(req.params.id, function (err, user) {
            // User not found
            if (!user) {
                return new Response.Data.NotFound(res, 'User Not Found');
            }

            // Update User properties
            if (req.body.login) {
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
            }

            // Save to DB
            return user.save(function (err) {
                if (!err) {
                    console.log('User Updated');
                    return res.json({ data: user });
                } else {
                    console.log('Internal error(%d): %s', res.statusCode, err.message);

                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;

                        return res.json({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;

                        return res.json(new Response.Error.Internal());
                    }
                }
            });
        });
    },

    /**
     * Delete an existing User
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    delete: function (req, res) {
        return User.findById(req.params.id, function (err, user) {
            if(!user) {
                res.statusCode = 404;

                return res.json({ error: 'User Not found' });
            }

            return user.remove(function (err) {
                if (!err) {
                    return res.json({ status: 'OK' });
                } else {
                    console.log('Internal error(%d): %s', res.statusCode, err.message);

                    return res.json(new Response.Error.Internal());
                }
            })
        });
    }
};

module.exports = UserController;