var express = require('express'), router = express.Router(), aws = require('aws-sdk');
var db = require('../helpers/db');
var photos = require('../models/photos.js');

router.get('/sign', function(req, res) {
    if (req.query.upload_key != db.uploadPhrase) {
        res.status(401);
        res.send("Unauthorized");
        return;
    }
    aws.config.update({accessKeyId: db.AWS_ACCESS_KEY, secretAccessKey: db.AWS_SECRET_KEY});
    var s3 = new aws.S3()
    var options = {
      Bucket: db.S3_BUCKET,
      Key: "photos/" + req.query.file_name,
      Expires: 60,
      ContentType: req.query.file_type,
      ACL: 'public-read'
    }
    s3.getSignedUrl('putObject', options, function(err, data){
      if(err) {
        console.log(err);
        res.send('Error with S3')
      }
        console.log('Response: ' + data);
        res.json({
        signed_request: data,
        url: 'https://s3.amazonaws.com/' + db.S3_BUCKET + '/' + req.query.file_name
      })
   })
});

router.post('/', function(req, res) {
    var fileName = req.body.fileName;
    var dateTaken = "undefined";
    var dateUploaded = new Date().toISOString().split('T')[0];		

    if (req.body.upload_key == db.uploadPhrase) { 
        photos.create(fileName, req.body.title, req.body.city, dateTaken, dateUploaded, function(err) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                res.status(200);
                res.send(req.body.title);
            }
        });
    } else {
        res.status(401);
        res.send("Unauthorized");
    }
});

router.get('/', function(req, res) {
    db.get().query("SELECT * FROM photos ORDER BY date_uploaded", function(err, rows) {
        if (err) {
            res.status(501);
            res.send(err);
        } else {
            res.header('Content-Type', 'application/json');
            res.send(rows);
        }
    });
});

router.get('/city/:city', function (req, res) {
    var city = req.params.city;
    photos.getByCity(city, function (err, rows) {
        if (err) {
            res.status(403);
            res.send(err);
        } else {
            res.header('Content-Type', 'application/json');
            res.send(rows);
        }
    });
});

  module.exports = router
