var express = require('express');
var defaultRouter = express.Router();

var Router = {
    get: function (path, handler) {
        var response = defaultRouter.get(path, handler);
    },

    post: function (path, handler) {
        var response = defaultRouter.post(path, handler);
    },

    put: function (path, handler) {
        var response = defaultRouter.put(path, handler);
    },

    delete: function (path, handler) {
        var response = defaultRouter.delete(path, handler);
    }
};

module.exports = Router;