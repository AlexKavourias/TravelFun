
function getCurrentLocation() {
  return "Reykjavik";
}

function getLocations(done) {
  $.get("/locations", done);
}
