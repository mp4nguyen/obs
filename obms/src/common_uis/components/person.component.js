import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import Text from './text.component';
import Date from './date.component';
import DateInput from '../components/dateinput.component';
import PersonTitle from './PersonTitle.component';
import PersonGender from './PersonGender.component';
import Address from './address.component';
import UploadPhoto from './uploadPhoto.component';
import * as validators from './validators';
import Checkbox from  "./checkbox.component";
import Account from  "./account.component";
//postUrl: 'https://0.0.0.0:3000/api/CContainers/avatar/upload'

export default React.createClass({

  displayName: 'Person',

  propTypes: {
    personModel: PropTypes.string,
    accountModel: PropTypes.string,
    isNoAvatar: PropTypes.bool,
    isAccount: PropTypes.bool
  },

  renderPersonalInformation(){
    //<Date subModel={this.props.personModel} name= "dob" placeholder= "Date of birth" label= "Date of birth *" validate={["required"]}/>
    return (
      <div className="portlet light bordered">
        <div className="portlet-title">
            <div className="caption">
                <span className="caption-subject font-red bold uppercase">Personal Information</span>
            </div>
        </div>
        <div className="portlet-body todo-project-list-content todo-project-list-content-tags" style={{height: 'auto'}}>
          <div className="todo-project-list">
            <div className="row">
              <div className="col-md-3">
                <PersonTitle subModel={this.props.personModel} name="title" placeholder="Title" label= "Title *" validate={["required"]}></PersonTitle>
              </div>
              <div className="col-md-3">
                <Text subModel={this.props.personModel} name= "firstName" placeholder= "First name" label= "First name *"validate={["required"]}/>
              </div>
              <div className="col-md-3">
                <Text subModel={this.props.personModel} name= "lastName" placeholder= "Last name" label= "Last name *"validate={["required"]}/>
              </div>
              <div className="col-md-3">
                <PersonGender subModel={this.props.personModel} name="gender" placeholder="Gender" label= "Gender *" validate={["required"]}></PersonGender>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <DateInput subModel={this.props.personModel} dateformat="DD/MM/YYYY" name = 'dob' label = 'Date of birth *' validate={["required"]}/>
              </div>
              <div className="col-md-3">
                <Text subModel={this.props.personModel} name= "mobile" placeholder= "Mobile" label= "Mobile *"validate={["required"]}/>
              </div>
              <div className="col-md-3">
                <Text subModel={this.props.personModel} name= "phone" placeholder= "Phone" label= "Phone" />
              </div>
              <div className="col-md-3">
                <Text subModel={this.props.personModel} name= "email" placeholder= "Email" label= "Email *"validate={["required","email"]}/>
              </div>
            </div>
            <Address subModel={this.props.personModel}/>
          </div>
        </div>
      </div>
  );
  },

  renderAccountInformation(){
    if(this.props.isAccount){
      return (
        <div className="portlet light bordered">
          <div className="portlet-title">
              <div className="caption">
                  <span className="caption-subject font-red bold uppercase">Account Information</span>
              </div>
          </div>
          <div className="portlet-body todo-project-list-content todo-project-list-content-tags" style={{height: 'auto'}}>
            <div className="todo-project-list">
              <div className="row">
                <div className="col-md-3">
                  <Text subModel={this.props.personModel} name= "username" placeholder= "Username" label= "Username *"validate={["required"]}/>
                </div>
                <div className="col-md-3">
                  <Text type="password" subModel={this.props.personModel} name= "password" placeholder= "Password" label= "Password *"validate={["required"]}/>
                </div>
                <div className="col-md-3">
                  <Text type="password" subModel={this.props.personModel} name= "rePassword" placeholder= "Re-password" label= "Re-password *"validate={["required"]}/>
                </div>
                <div className="col-md-3">
                  <Checkbox name= "isenable" label= "Enable"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }else{
      return(<div/>);
    }

  },

  render() {

    if(this.props.isNoAvatar){
      return (
        <div>
          <div className="row">
            {this.renderPersonalInformation()}
          </div>
          <div className="row">
            <Account subModel={this.props.accountModel} isAccount={this.props.isAccount}/>
          </div>
        </div>
      );
    }else {
      return (
        <div>
          <div className="row">
            <div className="col-md-3">
              <UploadPhoto subModel={this.props.personModel} name="avatar" photoData="avatarData"/>
            </div>
            <div className="col-md-9">
              {this.renderPersonalInformation()}
              <Account subModel={this.props.accountModel} isAccount={this.props.isAccount}/>
            </div>
          </div>
        </div>
      );
    }

  }
});
