import React from 'react';

export default class Image extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="col-md-4 col-sm-6 col-lg-6">
            <div>
              <form method="POST" action="/photos/">
                <input type="file"/> 
                <input type="text"/> 
                <input type="text"/> 
              </form>
            </div>
        </div>
      )
    }



}
