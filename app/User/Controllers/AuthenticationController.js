/**
 * Authentication Controller
 *
 * @module User
 * @description User authentication management
 */

var AuthenticationController = {
    /**
     * Log in
     * @param {Object} req HTTP request object.
     * @param {Object} res HTTP response object.
     */
    logIn: function (req, res) {
        return res.json({ login: 'login' });
    }
};

module.exports = AuthenticationController;