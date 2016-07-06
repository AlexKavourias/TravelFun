var db = require('../helpers/db.js');


exports.create = function(loc, done) {
    var arrival = loc["arrival"].split("/"), departure = loc["departure"].split("/");

    db.get().query(
        "INSERT INTO locations (city, country, latitude, longitude, arrival, departure) VALUES (?, ?, ?, ?, ?, ?)",
        [loc["city"], loc["country"], loc["coordinates"]["lat"], loc["coordinates"]["long"], arrival, departure],
        function(err, results) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    };

exports.getLocations = function(done) {
  db.get().query('SELECT * FROM locations ORDER BY ARRIVAL ASC', function(err, rows) {
    if (err) {
        done(err);
    } else {
        done(rowsToLocations(rows));
    }
  });
};

exports.getCurrentLocation = function(done) {
    db.get().query(
    'SELECT city from (SELECT city, Date("' + currentDate() + '") - arrival as difference from locations where date("' + currentDate() + '") between arrival and departure) as temp ORDER BY difference LIMIT 1', function(err, rows) {
        if (err) {
            done(err);
        } else {
            console.log(rows);
            if (rows[0] == undefined)
                done("Boston");
            else
                done(rows[0]);
        }
    });
};


function rowsToLocations(rows) {
    var locs = [];
    rows.forEach(function(row) {
	locs.push(new Location(
		row["city"],
		row["country"],
		row["latitude"],
		row["longitude"],
		row["arrival"],
		row["departure"]));
    });
    return locs;
}

function currentDate() {
	return new Date().toISOString().split("T")[0];
}

function normalizeDate(date) {
	months = {"Jan": "01",
		  "Feb": "02",
		  "Mar": "03"}
	return date[1] + date[2] + ", " + date[3]
} 

var Location = function(city, country, latitude, longitude, arrival, departure) {
	this.city = city
	console.log(arrival);
	console.log(typeof arrival);
	
	this.country = country
	this.latitude = latitude;
	this.longitude = longitude;
	this.arrival = arrival.toISOString();
	this.departure = departure.toISOString()//.split("G")[0];
};

Location.prototype.isCurrent = function() {
	return this.city == getCurrentLocation();
};

