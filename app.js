var mysql = require('mysql');
var express = require('express');
var db = require('./helpers/db.js');
var locations = require('./helpers/locations.js');
var app = express();

app.set('view engine', 'jade');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/locations', require('./controllers/locations'));
app.use('/photos', require('./controllers/photos'));
/*app.use('/photos', require('./controllers/photos'));
app.use('/blogs', require('./controllers/blogs'));*/

app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.get('/js/upload.js', function(req, res) {
    res.sendFile(__dirname + '/frontend/js/upload.js');
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
    app.listen(8000, function() {
        console.log("Listening on port 8000...");
    });
});
