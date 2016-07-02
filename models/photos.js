var db = require('../helpers/db.js');

exports.create = function(photo, done) {
  db.get().query(
	"INSERT INTO photos (file_name, date_taken, date_uploaded, city) VALUES (?, ?, ?, ?)",
	[photo["file_name"], photo["date_taken"], photo["date_uploaded"], photo["city"]])
	



}
