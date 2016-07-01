var fs = require('fs')
var mysql = require('mysql'), async = require('async');
var pool = null;
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

var data = JSON.parse(fs.readFileSync('~/config.json').toString());
console.log(data);
exports.connect = function(done) { 
    pool = mysql.createPool({
      host     : data['host'],
      user     : 'root',
      password : data['database_password'],
      database : 'whereami'
    });
    done();
};

exports.AWS_SECRET_KEY = data['AWS_SECRET_KEY'];
exports.AWS_ACCESS_KEY = data['AWS_ACCESS_KEY'];
exports.S3_BUCKET = data['S3_BUCKET'];

exports.get = function() {
    if (pool) {
      return pool;
    }
    throw "Connection Pool undefined, call connect()";
};

exports.drop = function(tables, done) {
    if (!pool) {
      return done("Connection Pool undefined, call connect()");
    }
    async.each(tables, function(name, cb) {
        pool.query('DELETE * FROM ' + name, cb);
    }, done);   
};

exports.setup = function(done) {
    try {
      pool.query('CREATE TABLE IF NOT EXISTS photo_urls(id INT, photo_id INT, large_url VARCHAR(255), thumbnail_url VARCHAR(255), mobile_url VARCHAR(255), FOREIGN KEY(photo_id) REFERENCES photos(id))');
      pool.query('CREATE TABLE IF NOT EXISTS photos (id INT, date_taken DATE, date_uploaded DATE,' +
                 'city VARCHAR(255), country VARCHAR(255), latitude DECIMAL(12, 10), longitude DECIMAL(12, 10), PRIMARY KEY(id))');
      pool.query('CREATE TABLE IF NOT EXISTS locations(city VARCHAR(255), country VARCHAR(255), latitude DECIMAL(12, 10), longitude DECIMAL(12, 10), arrival DATE, departure DATE, PRIMARY KEY(city))');
      pool.query('CREATE TABLE IF NOT EXISTS blogs(id INT, text TEXT, city VARCHAR(255), country VARCHAR(255), PRIMARY KEY(id))');
      done();
    } catch(e) {
      done(e);
    }
};

exports.purge = function() {
    var tables = ["photos", "photo_urls", "locations", "blogs"]; 
    for (var ind = 0; ind < tables.length; ind++) {
        pool.query("DROP TABLE IF EXISTS " + tables[ind]); 
        console.log('Dropped ' + tables[ind]);
    }
}

