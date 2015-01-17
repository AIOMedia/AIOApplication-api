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
    var store = function (file) {
        var tempPath = file.path;
        var targetPath = path.resolve('./upload/' + file.name);

        fs.rename(tempPath, targetPath, function(err) {
            if (err) {
                throw err;
            }

            fs.readFile(targetPath, function(err, data) {
                if (err) throw err; // Fail if the file can't be read.

                res.writeHead(200, {'Content-Type': file.type });
                res.end(new Buffer(data).toString('base64')); // Send the file data to the browser.
            });
        });
    };

    if (req.files && req.files.file) {
        var toUpload = req.files.file;
        store(toUpload);
    }
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
