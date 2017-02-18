import React, { PropTypes } from 'react';
import moment from 'moment';

import Text from './text.component';
import * as validators from './validators';
import Checkbox from  "./checkbox.component";
import * as _ from 'underscore';

export default React.createClass({

  displayName: 'Account',

  propTypes: {
    subModel: PropTypes.string,
    isAccount: PropTypes.bool,
    isNew: PropTypes.bool
  },

  contextTypes: {
    value: PropTypes.object
  },

  getInitialState(){
    return {
            password: "",
            rePassword: "",
            passwordError: ""
           };
  },

  shouldComponentUpdate(nextProp,nextState,nextContext){
    console.log('account.component.shouldComponentUpdate  this.context.value[this.props.subModel] = ',this.context.value[this.props.subModel]);
    console.log('account.component.shouldComponentUpdate  nextContext.value[this.props.subModel] = ',nextContext.value[this.props.subModel]);
    console.log('account.component.shouldComponentUpdate  return = ', !_.isEqual(this.context.value[this.props.subModel],nextContext.value[this.props.subModel]) );
    if(this.props.subModel && this.context.value[this.props.subModel]){
      return !_.isEqual(this.context.value[this.props.subModel],nextContext.value[this.props.subModel]);
    }else{
      //console.log(this.context.value[this.props.name],'    -    ',nextContext.value[this.props.name]);
      return !_.isEqual(this.context.value,nextContext.value);
    }

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
      if(this.props.isNew){
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
                    <Text subModel={this.props.subModel} name= "username" placeholder= "Username" label= "Username *" validate={["required"]}/>
                  </div>
                  <div className="col-md-3">
                    <Text type="password" subModel={this.props.subModel} name= "password" placeholder= "Password" label= "Password *"validate={["required"]} changedValueCB={this.passwordChangedValueCB} error={this.state.passwordError} />
                  </div>
                  <div className="col-md-3">
                    <Text type="password" subModel={this.props.subModel} name= "rePassword" placeholder= "Re-password" label= "Re-password *"validate={["required"]} changedValueCB={this.rePasswordChangedValueCB} error={this.state.passwordError} />
                  </div>
                  <div className="col-md-3">
                    <Checkbox subModel={this.props.subModel} name= "isenable" label= "Account enable" defaultValue = {1}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }else{
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
                    <Text subModel={this.props.subModel} name= "username" placeholder= "Username" label= "Username" disabled={true}/>
                  </div>
                  <div className="col-md-3">
                    <Text type="password" subModel={this.props.subModel} name= "password" placeholder= "Password" label= "Password"  changedValueCB={this.passwordChangedValueCB} error={this.state.passwordError} />
                  </div>
                  <div className="col-md-3">
                    <Text type="password" subModel={this.props.subModel} name= "rePassword" placeholder= "Re-password" label= "Re-password" changedValueCB={this.rePasswordChangedValueCB} error={this.state.passwordError} />
                  </div>
                  <div className="col-md-3">
                    <Checkbox subModel={this.props.subModel} name= "isenable" label= "Account enable" defaultValue = {1}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

    }else{
      return(<div/>);
    }

  }
});
