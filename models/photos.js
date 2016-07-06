var db = require('../helpers/db.js');
var locations = require('../models/locations.js');

exports.create = function(fileName, title, city, dateTaken, dateUploaded, done) {
  db.get().query(
	"INSERT INTO photos (file_name, title, date_taken, date_uploaded, city) VALUES (?, ?, ?, ?, ?)",
	[fileName, title, dateTaken, dateUploaded, city], 
	function(err, results) {
	    if (err) {
            done(err);
	    } else {
            done();
	    }
	});
};

exports.getCity = function(city, done) {
    db.get().query("SELECT * FROM photos where city=" + city, function(err, rows) {
        

    });

}

var Photo = function(file_name, title, city, date_taken, date_uploaded) {
	this.file_name = file_name;
    this.title = title;
	this.date_taken = date_taken;
	this.date_uploaded = date_uploaded;
	this.city = city;
};

Photo.prototype.save = function() {
	create(this.file_name, this.title, this.city, this.date_taken, this.date_uploaded);
}

Photo.prototype.verifyUnique = function(fileName, done) {
    db.get().query("SELECT * FROM photos WHERE file_name='" + fileName + "'", function(err, results) {
        done(results.length == 0);
    });
}
