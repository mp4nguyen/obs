import React, { PropTypes } from 'react';
import moment from 'moment';

import Text from './text.component';
import * as validators from './validators';
import Checkbox from  "./checkbox.component";

export default React.createClass({

  displayName: 'Account',

  propTypes: {
    subModel: PropTypes.string,
    isAccount: PropTypes.bool
  },

  getInitialState(){
    return {
            password: "",
            rePassword: "",
            passwordError: ""
           };
  },

  shouldComponentUpdate(nextProps,nextState) {
    return true;
  },

  passwordChangedValueCB(value){
    this.setState({password:value});

  },

  rePasswordChangedValueCB(value){
    this.setState({rePassword:value});
    if(value.length > 0){
      if(this.state.password != value){
        console.log('NOT MATCH');
        this.setState({passwordError:"Re-password does not match with password"})
      }else{
        this.setState({passwordError:""})
      }
    }

  },

  render(){
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
                  <Text subModel={this.props.subModel} name= "username" placeholder= "Username" label= "Username *"validate={["required"]}/>
                </div>
                <div className="col-md-3">
                  <Text type="password" subModel={this.props.subModel} name= "password" placeholder= "Password" label= "Password *"validate={["required"]} changedValueCB={this.passwordChangedValueCB} error={this.state.passwordError} />
                </div>
                <div className="col-md-3">
                  <Text type="password" subModel={this.props.subModel} name= "rePassword" placeholder= "Re-password" label= "Re-password *"validate={["required"]} changedValueCB={this.rePasswordChangedValueCB} error={this.state.passwordError} />
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

  }
});
