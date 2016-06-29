var db = require("./db.js");
var locations_model = require("../models/locations.js");

var locations =
    [{city: "Reykjavik", country: "Iceland", coordinates: {lat: 64.13333, long: -21.93333 }, arrival: "07/15/2016", departure: "07/21/2016"},
    {city: "Trolltunga", country: "Norway", coordinates: {lat: 60.121166182, long: 6.737330384 }, arrival: "07/23/2016", departure: "07/25/2016"},
    {city: "Oslo", country:  "Norway", coordinates: {lat: 59.9127300, long: 10.7460900 }, arrival: "07/21/2016", departure: "07/27/2016"},
    {city: "Athens", country: "Greece", coordinates: {lat: 37.9794500,  long: 23.7162200 }, arrival: "07/27/2016", departure: "07/30/2016"},
    {city: "Santorini", country: "Greece", coordinates: {lat: 36.395556, long: 25.459167 }, arrival: "07/30/2016", departure: "08/01/2016"},
    {city: "Venice", country: "Italy", coordinates: {lat: 45.444958, long: 12.328463 }, arrival: "08/01/2016", departure: "08/02/2016"},
    {city: "Florence", country: "Italy", coordinates: {lat: 43.769562, long: 11.255814 }, arrival: "08/02/2016", departure: "08/04/2016"},
    {city: "Rome", country: "Italy",  coordinates: {lat: 41.8919300, long: 12.5113300 }, arrival: "08/04/2016", departure: "08/07/2016"},
    {city: "Amalfi Coast", country: "Italy", coordinates: {lat: 40.6333308, long: 14.5999976 }, arrival: "08/07/2016", departure: "08/09/2016"},
    {city: "Bari", country: "Italy", coordinates: {lat: 41.1114800, long: 16.8554000 }, arrival: "08/09/2016", departure: "08/09/2016"},
    {city: "Dubrovnik", country: "Croatia", coordinates: {lat: 42.6480700, long: 18.0921600 }, arrival: "08/10/2016", departure: "08/12/2016"},
    {city: "Barcelona", country: "Spain", coordinates: {lat: 41.390205, long: 2.154007 }, arrival: "08/12/2016", departure: "08/16/2016"},
    {city: "Paris", country: "France", coordinates: {lat: 48.864716, long: 2.349014 }, arrival: "08/16/2016", departure: "08/19/2016"}];

exports.insertLocations = function(done) {
    for (var ind in locations) {
        var loc = locations[ind];
        var arrival = loc["arrival"].split("/"), departure = loc["departure"].split("/");
        loc['arrival'] = '' + arrival[2] + '-' + arrival[0] + '-' + arrival[1];
        loc['departure'] = '' + departure[2] + '-' + departure[0] + '-' + departure[1];
        locations_model.create(loc, function(err) {
            if (err) {
                done(err);
            } else {
                console.log("successfully inserted location");
                done();
            }
        });
    }
};
