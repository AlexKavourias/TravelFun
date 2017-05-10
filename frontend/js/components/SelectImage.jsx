import React from 'react';

export default class AddImageForm extends React.Component {

    constructor(props) {
        super(props);
    }

    passImages() {
        this.props.addImages(this.fileUpload.files);
    }

    render() {
        return  <div className="col-md-4 col-md-offset-4">
                    <input onChange={this.passImages.bind(this)} 
                           ref={(ref) => 
                                { console.log(ref); this.fileUpload = ref}}
                           type="file" multiple />
                </div>;
    }

}
