var express = require('express');
var router = express.Router();

// Load Artist Controller to have access to CRUD methods
var CRUDController = require('../Core/Controllers/CRUDController');
var fileCtrl = new CRUDController('File/Models/File');

/* LIST */
router.get('/artist/',       fileCtrl.list);

/* GET */
router.get('/artist/:id',    fileCtrl.get);

/* CREATE */
router.post('/artist/',      fileCtrl.create);

/* UPDATE */
router.put('/artist/:id',    fileCtrl.update);

/* DELETE */
router.delete('/artist/:id', fileCtrl.delete);

module.exports = router;
