import React from 'react';
import ReactDOM from 'react-dom';
import map from '../utilities/map.js';

export default class Map extends React.Component { 

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: undefined,
            locations: [],
            markers: []
        };
    }

    componentDidMount() {
        this.createMap();
    }

    createMap() {
        let lat = 51.508530;
        let long =  -0.076132;
        let mapOptions = { zoom: 3,
                           center: new google.maps.LatLng(lat, long)}

        let map = new google.maps.Map(ReactDOM.findDOMNode(this.refs.map_canvas), mapOptions);
        this.setState({map: map});
        //marker.setAnimation(google.maps.Animation.BOUNCE);
        //setTimeout(function(){ marker.setAnimation(null);}, 1500);
        this.addMarkers();
    }

    render() {
        return ( <div ref="map_canvas" style={{"height":"100%", "width":"100%"}}></div> );
    }

    addMarkers() {
        $.get('https://kavourias.me/locations', this.addLocations.bind(this)); 
    }

    addLocations(locations) {
        locations.forEach(this.addLocationMarker.bind(this));
    }

    addLocationMarker(location) {
        //console.log(this);
        let oldLocations = this.state.locations.splice();
        let oldMarkers = this.state.markers.splice();
        let marker = new google.maps.Marker({
          position:  new google.maps.LatLng(location.latitude, location.longitude),
          map: this.state.map,
          title: location.city
        });
        oldMarkers.push(marker);
        oldLocations.push(location);
        this.setState({locations: oldLocations, markers: oldMarkers});
    }
}
