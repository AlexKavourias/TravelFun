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
  db.get().query('SELECT * FROM locations', function(err, rows) {
    if (err) {
        done(err);
    } else {
        done(rows);
    }
  });
};

exports.getCurrentLocation = function(done) {
    db.get().query('SELECT * from locations', function(err, rows) {
        if (err) {
            done(err);
        } else {
            //TODO
            done(rows);
        }
    });
};
