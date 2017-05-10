import React from 'react';
import Bootstrap from './Bootstrap.jsx';
import Image from './Image.jsx';
import SelectImage from './SelectImage.jsx';

export default class UploadPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {images: []};
        this.addImages = this.addImages.bind(this);
    }

    addImages(images) {
        console.log('here');
        let temp = this.state.images.splice();
        this.setState(temp.concat(images));    
        console.log(images);
    }
    

    render() {
       return (
         <Bootstrap>
          <SelectImage addImages={this.addImages}/>
          {this.state.images.map((image) =>
            <Image props={image}/>
          )} 
         </Bootstrap> )

    }




}
