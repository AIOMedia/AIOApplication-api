var express = require('express');
var router = express.Router();

// Load Artist Controller to have access to CRUD methods
/*var artistCtrl = require('./Controllers/ArtistController');*/

var CRUDController = require('../Core/Controllers/CRUDController');
var artistCtrl = new CRUDController('Music/Models/Artist');

/* LIST */
router.get('/artist/',       artistCtrl.list.bind(artistCtrl));

/* GET */
router.get('/artist/:id',    artistCtrl.get.bind(artistCtrl));

/* CREATE */
router.post('/artist/',      artistCtrl.create.bind(artistCtrl));

/* UPDATE */
router.put('/artist/:id',    artistCtrl.update.bind(artistCtrl));

/* DELETE */
router.delete('/artist/:id', artistCtrl.delete.bind(artistCtrl));

module.exports = router;
