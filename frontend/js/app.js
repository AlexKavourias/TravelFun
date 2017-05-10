import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

var LandingPage = React.createClass({
    render: function () {
        return (
            <div className="container">
              <div id="xinfo" class="row vcenter">
              </div> 
            </div>);
    }
});

import routes from './routes.jsx'

ReactDOM.render((<Router history={browserHistory} routes={routes} />), document.getElementById("app"));
