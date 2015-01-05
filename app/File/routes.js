var express = require('express');
var router = express.Router();

var path = require('path');
var fs   = require('fs');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Load Artist Controller to have access to CRUD methods
var CRUDController = require('../Core/Controllers/CRUDController');
var fileCtrl = new CRUDController('File/Models/File');

fileCtrl.upload = function (req, res) {
    var tempPath = req.files.file.path;
    var targetPath = path.resolve('./upload/' + req.files.file.name);

    fs.rename(tempPath, targetPath, function(err) {
        if (err) {
            throw err;
        }

        res.writeHead(200, {'Content-Type': req.files.file.type });
        res.setEncoding('binary');
        // stream the file
        fs.createReadStream(targetPath, 'utf-8').pipe(res);
    });
};

/* LIST */
router.get('/',       fileCtrl.list.bind(fileCtrl));

/* GET */
router.get('/:id',    fileCtrl.get.bind(fileCtrl));

/* CREATE */
router.post('/',      fileCtrl.create.bind(fileCtrl));

router.post('/upload', multipartMiddleware, fileCtrl.upload.bind(fileCtrl));

/* UPDATE */
router.put('/:id',    fileCtrl.update.bind(fileCtrl));

/* DELETE */
router.delete('/:id', fileCtrl.delete.bind(fileCtrl));

module.exports = router;
