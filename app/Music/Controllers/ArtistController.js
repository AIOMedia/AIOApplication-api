/**
 * Artist Controller
 *
 * @module Music
 * @description CRUD for Artist management
 */

// Load Response
var Response = require('../../Core/Response');

// Load Task model
var Artist = require('../Models/Artist');

var ArtistController = {
    /**
     * List all Artists ordered by `name` field
     *
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    list: function (req, res) {
        return Artist.find({}, null, { sort: { name: 1 } }, function (err, artists) {
            var response = null;

            if (err) {
                // Something goes wrong
                response = new Response.Error.Internal(res, err.message);
            } else if (0 === artists.length) {
                // It's ok, but no data found
                response = new Response.Data.NoResult(res);
            } else {
                // It's ok and we have data to return
                response = new Response.Data.Collection(res, artists);
            }

            return response;
        });
    },

    /**
     * Get a specific Artist
     *
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    get: function (req, res) {
        return Artist.findById(req.params.id, function (err, artist) {
            var response = null;

            if (err) {
                // Something goes wrong
                response = new Response.Error.Internal(res, err.message);
            } else if (!artist) {
                // Task not found
                response = new Response.Data.NotFound(res, 'Artist Not Found');
            } else {
                // Task found
                response = new Response.Data.Item(res, artist);
            }

            return response;
        });
    },

    /**
     * Create a new Artist
     *
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    create: function (req, res) {
        var artist = new Artist({
            name: req.body.name
        });

        return artist.save(function (err) {
            var response = null;
            if (!err) {
                response = new Response.Data.Created(res, artist, 'Artist Created');
            } else {
                if (err.name == 'ValidationError') {
                    // Invalid data has been post (we will return the errors list to user)
                    response = Response.Data.Invalid(res, artist, 'Artist not saved due to validation errors.', err.errors || {});
                } else {
                    // Other errors
                    response = Response.Error.Internal(res, err.message);
                }
            }

            return response;
        });
    },

    /**
     * Update an existing Artist
     *
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    update: function (req, res) {
        return Artist.findById(req.params.id, function (err, artist) {
            var response = null;

            if (err) {
                // Something goes wrong
                response = new Response.Error.Internal(res, err.message);
            } else if (!artist) {
                // Artist Not Found
                response = new Response.Data.NotFound(res, 'Artist Not Found');
            } else {
                // Update found Artist
                // Update Artist properties
                if (req.body.name) {
                    artist.name = req.body.name;
                }

                // Save to DB
                response = artist.save(function (err) {
                    var response = null;
                    if (!err) {
                        return new Response.Data.Updated(res, artist, 'Artist Updated');
                    } else {
                        if (err.name == 'ValidationError') {
                            // Invalid data has been post (we will return the errors list to user)
                            response = Response.Data.Invalid(res, artist, 'Artist not saved due to validation errors.', err.errors || {});
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
    },

    /**
     * Delete an existing Artist
     *
     * @param {Object} req HTTP request object
     * @param {Object} res HTTP response object
     */
    delete: function (req, res) {
        return Artist.findById(req.params.id, function (err, artist) {
            if (!artist) {
                return new Response.Data.NotFound(res, 'Artist Not Found');
            }

            return artist.remove(function (err) {
                var response = null;

                if (err) {
                    response = new Response.Error.Internal(res, err);
                } else {
                    response = new Response.Data.Deleted(res, artist, 'Artist Deleted');
                }

                return response;
            })
        });
    }
};

module.exports = ArtistController;