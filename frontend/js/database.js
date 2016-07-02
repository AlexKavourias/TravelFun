
function getCurrentLocation(done) {
  $.get("/locations/current", done);
}

function getLocations(done) {
  $.get("/locations", done);
}
