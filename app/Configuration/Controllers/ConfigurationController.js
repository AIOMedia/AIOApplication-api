/**
 * Configuration Controller
 *
 * @module Configuration
 * @description Application Configuration
 */

// Load Configuration model
var Configuration = require('../Models/Configuration');

var ConfigurationController = {
    /**
     * List all Users
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    list: function (req, res) {
        return Configuration.find(function (err, users) {
            if (!err) {
                return res.json({ data: users });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s' ,res.statusCode, err.message);

                return res.json({ error: 'Internal Server Error' });
            }
        });
    },

    /**
     * Get a specific User
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    get: function (req, res) {
        return User.findById(req.params.id, function (err, user) {
            if (!user) {
                res.statusCode = 404;

                return res.json({ error: 'User Not Found' });
            }

            if (!err) {
                return res.json({ data: user });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);

                return res.json({ error: 'Internal Server Error' });
            }
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
                res.statusCode = 404;
                return res.json({ error: 'User Not Found' });
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

                        return res.json({ error: 'Internal Server error' });
                    }
                }
            });
        });
    }
};

module.exports = ConfigurationController;