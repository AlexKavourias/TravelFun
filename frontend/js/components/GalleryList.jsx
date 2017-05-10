import React from 'react';
import Link from 'react-router';
import Bootstrap from './Bootstrap.jsx'


export default class GalleryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
    }

    componentDidMount() {
        var self = this;
        $.get('https://kavourias.me/locations', function(locations) {
            locations.map(function(location) {
                console.log(location);
                console.log(self.state);
                var oldLocations = self.state.locations.splice();
                self.setState({locations: oldLocations.push(location)});
            });
        });
    }
    render() {
        return (
            <Bootstrap>
              <div className="city"> 
                    <img src={this.props.backgroundUrl}/> 
                    {this.state.locations.forEach(location => {
                        <div>id: {location.id}, backgroundUrl: {location.backgroundUrl}</div>
                     })}
                    <p> Hi </p>
               </div>
            </Bootstrap>
            );
    }
}
