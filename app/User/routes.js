var express = require('express');
var router = express.Router();

// Load User Controller to have access to CRUD methods
var controller = require('./Controllers/UserController');

/* LIST */
router.get('/',       controller.list);

/* GET */
router.get('/:id',    controller.get);

/* CREATE */
router.post('/',      controller.create);

/* UPDATE */
router.put('/:id',    controller.update);

/* DELETE */
router.delete('/:id', controller.delete);

module.exports = router;
