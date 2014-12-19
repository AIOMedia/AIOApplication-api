var express = require('express');
var router = express.Router();

// Load User Controller to have access to CRUD methods
var controller = require('./Controllers/ConfigurationController');

/* LIST */
router.get('/',    controller.list);

/* GET */
router.get('/:id', controller.get);

/* UPDATE */
router.put('/:id', controller.update);

module.exports = router;
