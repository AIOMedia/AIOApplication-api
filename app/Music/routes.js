var express = require('express');
var router = express.Router();

// Load Artist Controller to have access to CRUD methods
var artistCtrl = require('./Controllers/ArtistController');

var crudCtrl = require('../Core/Controllers/CRUDController');
var artistCtrl = new crudCtrl('Music/Models/Artist');

/* LIST */
router.get('/artist/',       artistCtrl.list);

/* GET */
router.get('/artist/:id',    artistCtrl.get);

/* CREATE */
router.post('/artist/',      artistCtrl.create);

/* UPDATE */
router.put('/artist/:id',    artistCtrl.update);

/* DELETE */
router.delete('/artist/:id', artistCtrl.delete);

module.exports = router;
