import React, { PropTypes } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

var fd = new FormData();

export default React.createClass({

  displayName: 'DropZonePhoto',

  propTypes: {
    name: PropTypes.string.isRequired,
    photoData: PropTypes.string.isRequired,
    subModel: PropTypes.string
  },

  contextTypes: {
    value: PropTypes.object,
    update: PropTypes.func.isRequired
  },

  getInitialState() {
    if(this.props.subModel && this.context.value[this.props.subModel] &&this.props.photoData){
      return {
        file: '',
        imagePreviewUrl: this.context.value[this.props.subModel][this.props.photoData]
      };
    }else {
      return {
        file: '',
        imagePreviewUrl: this.context.value[this.props.photoData]
      };
    }

  },

  uploadFile: function (e) {
    console.log('file = ',this.refs.file);
  },

  handleChange: function(file) {
    console.log("file = ",file);
    // console.log('--------->Selected file:', event.target.files[0]);
    // fd.append( 'file',event.target.files[0]);
    // console.log('Selected file:', fd);
    // let reader = new FileReader();
    // let file = event.target.files[0];
    //
    // reader.onloadend = () => {
    //   this.setState({
    //     file: file,
    //     imagePreviewUrl: reader.result
    //   });
    // }
    //
    // reader.readAsDataURL(file)
    //
    // var valueObject = {};
    // valueObject[this.props.name] = event.target.files[0];
    // this.context.update(valueObject,this.props.subModel);


  },

  handleFileAdded(file) {
      console.log(file);
  },
//style={{height:'200px'}}
  render() {

    var componentConfig = {
        iconFiletypes: ['.jpg', '.png', '.gif'],
        showFiletypeIcon: true,
        postUrl: 'no-url'
    };
    var djsConfig = {
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png,image/gif",
        autoProcessQueue: false
    };

    const eventHandlers = {
        addedfile: this.handleFileAdded.bind(this)
    }

    return (
      <div>
          <DropzoneComponent config={componentConfig}
                             eventHandlers={eventHandlers}
                             djsConfig={djsConfig} />
      </div>
    );
  }
});
