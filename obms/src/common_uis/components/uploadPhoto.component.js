import React, { PropTypes } from 'react';
import axios from 'axios';

var fd = new FormData();

export default React.createClass({

  displayName: 'UploadPhoto',

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

  handleChange: function(event) {
    console.log('--------->Selected file:', event.target.files[0]);
    fd.append( 'file',event.target.files[0]);
    console.log('Selected file:', fd);
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

    var valueObject = {};
    valueObject[this.props.name] = event.target.files[0];
    this.context.update(valueObject,this.props.subModel);


  },

//style={{height:'200px'}}
  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="img-responsive" src={imagePreviewUrl} style={{maxHeight:'300px', marginLeft: 'auto', marginRight: 'auto'}}/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <div>

            <div className="mt-card-item">
                <div className="mt-card-avatar mt-overlay-1">
                    {$imagePreview}
                </div>
                <div className="mt-card-content">
                  <label className="btn btn-block btn-primary">
                    Browse <input ref="file" type="file" name="file" style={{display:'none'}} onChange={this.handleChange}/>
                  </label>
                </div>
            </div>

       </div>
    );
  }
});


/*
<input type="button" ref="button" value="Upload" onClick={this.uploadFile} />
*/
