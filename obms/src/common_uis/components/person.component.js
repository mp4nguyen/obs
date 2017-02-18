import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import UploadPhoto from './uploadPhoto.component';
import Account from  "./account.component";
import PersonalDetail from  "./personalDetail.component";
//postUrl: 'https://0.0.0.0:3000/api/CContainers/avatar/upload'

export default React.createClass({

  displayName: 'Person',

  propTypes: {
    personModel: PropTypes.string,
    accountModel: PropTypes.string,
    isNoAvatar: PropTypes.bool,
    isAccount: PropTypes.bool,
    isNew: PropTypes.bool
  },


  contextTypes: {
    value: PropTypes.object
  },

  shouldComponentUpdate(nextProp,nextState,nextContext){

    if(this.props.subModel && this.context.value[this.props.subModel]){
      return !_.isEqual(this.context.value[this.props.subModel],nextContext.value[this.props.subModel]);
    }else{
      //console.log(this.context.value[this.props.name],'    -    ',nextContext.value[this.props.name]);
      return !_.isEqual(this.context.value,nextContext.value);
    }

  },

  render() {

    if(this.props.isNoAvatar){
      return (
        <div>
          <div className="row">
            <PersonalDetail subModel={this.props.personModel}/>
          </div>
          <div className="row">
            <Account subModel={this.props.accountModel} isAccount={this.props.isAccount} isNew={this.props.isNew}/>
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
              <PersonalDetail subModel={this.props.personModel}/>
              <Account subModel={this.props.accountModel} isAccount={this.props.isAccount} isNew={this.props.isNew}/>
            </div>
          </div>
        </div>
      );
    }

  }
});
