var map = undefined;
var currentMarker = undefined;

function formatTime(time) {
  var time = time.split('T')[0].split('-');
  return time[1] + '/' + time[2] + '/' + time[0];
}

function createWindowContent(location) {
    return '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">'+ location["city"] + ', '
      + location["country"] + '</h1>'+
      '<div id="bodyContent">'+
      '<div style="width:100%"><b>Arrival: </b>' + formatTime(location['arrival']) + '</div>' +
      '<div style="width:100%;"><b>Departure: </b>' + formatTime(location['departure']) + '</div>' +
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

getCurrentLocation(function(currentLocation) {
  getLocations(function (locations) {
    var index = 0;
    currentLocation = currentLocation["city"];
    locations.forEach(function(location) {
      if (markers[location["country"]] == undefined)
        markers[location["country"]] = [];

      var marker = new google.maps.Marker({
        position:  new google.maps.LatLng(location["latitude"], location["longitude"]),
        map: map,
        title: location["city"] == currentLocation ? "Current Location" :  location["city"] + ', ' + location["country"],
      });
      markers[location["country"]].push(marker);
      if (currentLocation == location["city"]) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 1500);
        marker.setIcon("https://s3.amazonaws.com/wherearealexandliam/group-2.png");
      } else {
        marker.setLabel(labels[index])
      }
      index++;
      marker.infowindow = new google.maps.InfoWindow({
        content: createWindowContent(location)
      });
      marker.addListener('click', function() {
        if (currentMarker == marker) {
            if (currentMarker.infowindow.isOpen) {
                currentMarker.infowindow.close();
                currentMarker.infowindow.isOpen = false;
            } else {
                currentMarker.infowindow.open(map, currentMarker);
                currentMarker.infowindow.isOpen = true;
            }
        } else {
            if (!currentMarker) {
                currentMarker = marker;
                marker.infowindow.open(map, currentMarker);
                marker.infowindow.isOpen = true;
            } else {
                currentMarker.infowindow.close();
                currentMarker.infowindow.isOpen = false;
                currentMarker = marker;
                marker.infowindow.open(map, currentMarker);
                marker.infowindow.isOpen = true;
            }
        }
      });
    });
  });
});
}
