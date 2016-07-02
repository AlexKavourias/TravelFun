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
                console.log(results[0]);
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
	'SELECT city (SELECT city, date("' + currentDate() + '")' +
	'- arrival as difference from locations where' + currentDate() +
	'between arrival and departure) as temp ORDER BY difference LIMIT 1', function(err, rows) {
        if (err) {
            done(err);
        } else {
	    if (rows.size == 0)
		done("Boston");
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

var Location = function(city, country, latitude, longitude, arrival, departure) {
	this.city = city
	this.country = country
	this.latitude = latitude;
	this.longitude = longitude;
	this.arrival = arrival.split("T")[0];
	this.departure = departure.split("T")[0];
};

Location.prototype.isCurrent = function() {
	return this.city == getCurrentLocation();
};

