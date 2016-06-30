var map = undefined;

function formatTime(time) {
  return time.split('T')[0];
}

function createWindowContent(location) {
    return '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">'+ location["city"] + ', '
      + location["country"] + '</h1>'+
      '<div id="bodyContent">'+
      '<div style="float:left;"><b>Arrival: </b>:<p>' + formatTime(location['arrival']) + '</p></div>' +
      '<div style="float:left;"><b>Departure: </b>:<p>' + formatTime(location['departure']) + '</p></div>' +
      '</div>'+
      '</div>';

}

function initMap() {
  var myLatLng = {lat: 52.5243700, lng: 13.4105300};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  var markers = {}, labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  getLocations(function (locations) {
    var index = 0;
    locations.forEach(function(location) {
      if (markers[location["country"]] == undefined)
        markers[location["country"]] = [];

      var marker = new google.maps.Marker({
        position:  new google.maps.LatLng(location["latitude"], location["longitude"]),
        map: map,
        title: location["city"] == getCurrentLocation() ? "Current Location" :  location["city"] + ', ' + location["country"],
        label: labels[index++],
        //icon: "https://s3.amazonaws.com/wherearealexandliam/imageedit_3_5451510813.gif"
      });
      markers[location["country"]].push(marker);
      if (getCurrentLocation() == location["city"]) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1500);
        /*marker.addListener('click', function() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        });*/
      }
      var infowindow = new google.maps.InfoWindow({
        content: createWindowContent(location)
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
}
