import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <div> Hi There </div>
            <Link to='/galleries'> Galleries </Link> 
            <Link to='/map'> Travel Map </Link>
            <Link to='/upload'> Travel Map </Link>
          </div>
        );

    }


}
