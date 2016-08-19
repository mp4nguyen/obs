import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';

import Text from './text.component';
import Date from './date.component';
import PersonTitle from './PersonTitle.component';
import PersonGender from './PersonGender.component';
import Address from './address.component';
import UploadPhoto from './uploadPhoto.component';
import * as validators from './validators';

//postUrl: 'https://0.0.0.0:3000/api/CContainers/avatar/upload'

export default React.createClass({

  displayName: 'Person',

  propTypes: {
    subModel: PropTypes.string,
    isNoAvatar: PropTypes.bool
  },

  renderPersonalInformation(){

    return (
      <div className="todo-project-list">
        <div className="row">
          <div className="col-md-3">
            <PersonTitle subModel={this.props.subModel} name="title" placeholder="Title" label= "Title *" validate={["required"]}></PersonTitle>
          </div>
          <div className="col-md-3">
            <Text subModel={this.props.subModel} name= "firstName" placeholder= "First name" label= "First name *"validate={["required"]}/>
          </div>
          <div className="col-md-3">
            <Text subModel={this.props.subModel} name= "lastName" placeholder= "Last name" label= "Last name *"validate={["required"]}/>
          </div>
          <div className="col-md-3">
            <PersonGender subModel={this.props.subModel} name="gender" placeholder="Gender" label= "Gender *" validate={["required"]}></PersonGender>  
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
  );
  },

  render() {

    if(this.props.isNoAvatar){
      return (
        <div>
          <div className="row">
              {this.renderPersonalInformation()}
          </div>
        </div>
      );
    }else {
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
                    {this.renderPersonalInformation()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

  }
});
