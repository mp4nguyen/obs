import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';

import Text from './text.component';
import Date from './date.component';
import Address from './address.component';
import UploadPhoto from './uploadPhoto.component';
import * as validators from './validators';

//postUrl: 'https://0.0.0.0:3000/api/CContainers/avatar/upload'
var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: false

};

var eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: null,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: null,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
};

var djsConfig = {
    addRemoveLinks: true,
    params: {
        myParameter: "I'm a parameter!"
    }
};

export default React.createClass({

  displayName: 'Person',

  propTypes: {
    subModel: PropTypes.string
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            <UploadPhoto subModel={this.props.subModel} name="avatar" photoData="avatarData"/>
          </div>
          <div className="col-md-9">
            <div className="portlet light bordered">
              <div className="portlet-title">
                  <div className="caption">
                      <span className="caption-subject font-red bold uppercase">Personal Information</span>
                  </div>
              </div>
              <div className="portlet-body todo-project-list-content todo-project-list-content-tags" style={{height: 'auto'}}>
                  <div className="todo-project-list">
                    <div className="row">
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "title" placeholder= "Title" label= "Title *"validate={["required"]}/>
                      </div>
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "firstName" placeholder= "First name" label= "First name *"validate={["required"]}/>
                      </div>
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "lastName" placeholder= "Last name" label= "Last name *"validate={["required"]}/>
                      </div>
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "gender" placeholder= "Gender" label= "Gender *"validate={["required"]}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <Date subModel={this.props.subModel} name= "dob" placeholder= "Date of birth" label= "Date of birth *"validate={["required"]}/>
                      </div>
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "mobile" placeholder= "Mobile" label= "Mobile *"validate={["required"]}/>
                      </div>
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "phone" placeholder= "Phone" label= "Phone" />
                      </div>
                      <div className="col-md-3">
                        <Text subModel={this.props.subModel} name= "email" placeholder= "Email" label= "Email *"validate={["required","email"]}/>
                      </div>
                    </div>
                    <Address subModel={this.props.subModel}/>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
