var mysql = require('mysql');
var express = require('express');
var db = require('./helpers/db.js');
var locations = require('./helpers/locations.js');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'jade');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/locations', require('./controllers/locations'));
app.use('/photos', require('./controllers/photos'));

app.get('/map', function(req, res) {
    res.sendFile(__dirname + '/frontend/map.html');
});

app.get('/photos/upload', function(req, res) {
    res.sendFile(__dirname + '/frontend/upload.html');
});

app.get('/gallery', function(req, res) {
    res.sendFile(__dirname + '/frontend/gallery.html');
})
app.get('/gallery/:city', function(req, res) {
    res.sendFile(__dirname + '/frontend/gallery.html');
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});
app.get('/js/upload.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/js/upload.js');
});
app.get('/js/map.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/js/map.js');
});
app.get('/js/database.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/js/database.js');
});
app.get('/css/upload.css', function(req, res) {
    res.sendFile(__dirname + '/frontend/css/upload.css');
});
app.get('/css/gallery.css', function(req, res) {
    res.sendFile(__dirname + '/frontend/css/gallery.css');
});
app.get('/js/gallery.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/js/gallery.js');
});
app.get('/js/:file', function(req, res) {
    res.sendFile(__dirname + '/frontend/js/' + req.params.file);
});
app.get('/css/:file', function(req, res) {
    res.sendFile(__dirname + '/frontend/css/' + req.params.file);
});


db.connect(function(err) {
//    db.purge();

    db.setup(function(err) {
        if(err) {
          console.log("Failed to setup schema");
          throw err;
        }
    });
    locations.insertLocations(function(err) {
        if (err) {
            console.log(err);
        } else {
            //pass
        }
    });
    app.listen(process.env.PORT, function() {
        console.log("Listening on port" + process.env.PORT + "...");
    });
});
