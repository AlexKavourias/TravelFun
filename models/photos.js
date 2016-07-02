var db = require('../helpers/db.js');

exports.create = function(photo, done) {
  db.get().query(
	"INSERT INTO photos (file_name, date_taken, date_uploaded, city) VALUES (?, ?, ?, ?)",
	[photo["file_name"], photo["date_taken"], photo["date_uploaded"], photo["city"]], 
	function(err, results) {
	    if (err) {
		done(err);
	    } else {
		done();
	    }
	});
}

var Photo = function(file_name, date_taken, date_uploaded, city) {
	this.file_name = file_name;
	this.date_taken = date_taken;
	this.date_uploaded = date_uploaded;
	this.city = city;
}

Photo.prototype.save = function() {
	create(this.file_name, this.date_taken, this.date_uploaded, this.city);
}
