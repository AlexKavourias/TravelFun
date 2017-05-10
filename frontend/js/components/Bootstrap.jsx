import React from 'react';

export default class Bootstrap extends React.Component {
    
    render() {
        return (
            <div className="container">
              <div className="row">
                { this.props.children }
              </div>
            </div>
            );
    }
}
