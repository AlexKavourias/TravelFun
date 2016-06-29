var db = require('../helpers/db.js');
var locations = require('../models/locations.js');
var express = require('express');
var router = express.Router();

router.get("/current", function(req, res) {
    locations.getCurrentLocation(function(err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

router.get("/", function(req, res) {
    locations.getLocations(function(err, rows) {
        if (err) {
            res.send(err);
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;
