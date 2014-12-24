var express = require('express');
var router = express.Router();

var authController = require('./Controllers/AuthenticationController');
// Load User Controller to have access to CRUD methods
var userController = require('./Controllers/UserController');

/* LOGIN */
router.post('/login', authController.logIn);

/* LIST */
router.get('/',       userController.list);

/* GET */
router.get('/:id',    userController.get);

/* CREATE */
router.post('/',      userController.create);

/* UPDATE */
router.put('/:id',    userController.update);

/* DELETE */
router.delete('/:id', userController.delete);

module.exports = router;
