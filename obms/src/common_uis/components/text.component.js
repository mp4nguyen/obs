import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import * as validators from './validators';
import clone from 'clone';
import * as _ from 'underscore';

export default React.createClass({

  displayName: 'Text',

  propTypes: {
    subModel: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    multiLine: PropTypes.bool,
    rows: PropTypes.number,
    isFocus: PropTypes.bool,
    type: PropTypes.string,
    changedValueCB: PropTypes.func,
    error: PropTypes.string,
    disabled: PropTypes.bool
  },

  contextTypes: {
    value: PropTypes.object,
    update: PropTypes.func.isRequired,
    registerValidation: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show));
  },

  componentWillUnmount() {
    this.removeValidationFromContext();
  },

  componentWillReceiveProps(nextProps){
    if(nextProps.error){
        var errors = clone(this.state.errors);
        var isExisted = false;
        errors.forEach((error,i)=>{
          if (error == "Re-password does not match with password"){
            isExisted = true;
          }
        });
        if(!isExisted){
          errors.push(nextProps.error);
        }
        this.setState({errors});
    }else{
      if(this.props.error){
        var errors = clone(this.state.errors);
        errors.forEach((error,i)=>{
          if (error == "Re-password does not match with password"){
            errors.splice(i,1);
          }
        });
        this.setState({errors});
      }
    }
  },

  shouldComponentUpdate(nextProp,nextState,nextContext){
    // console.log('text.component.shouldComponentUpdate  this.context.value[this.props.subModel] = ',this.context.value[this.props.subModel]);
    // console.log('text.component.shouldComponentUpdate  this.context.value[this.props.subModel][this.props.name] = ',this.context.value[this.props.subModel][this.props.name]);
    // console.log('text.component.shouldComponentUpdate  nextContext.value[this.props.subModel] = ',nextContext.value[this.props.subModel]);
    // console.log('text.component.shouldComponentUpdate  return = ',!(this.context.value[this.props.subModel][this.props.name]==nextContext.value[this.props.subModel][this.props.name]));
    //console.log('text.component.shouldComponentUpdate   name = ',this.props.name);
    var returnValue = true;
    if(this.props.subModel){
      if(this.context.value[this.props.subModel]){
        returnValue = !(this.context.value[this.props.subModel][this.props.name]==nextContext.value[this.props.subModel][this.props.name]) || (nextProp.error != this.props.error) || (!_.isEqual(this.state,nextState));
      }else if(nextContext.value[this.props.subModel] && nextContext.value[this.props.subModel][this.props.name]){
        returnValue = true;
      }
    }else{
      //console.log(this.context.value[this.props.name],'    -    ',nextContext.value[this.props.name]);
      returnValue = !(this.context.value[this.props.name]==nextContext.value[this.props.name]) || (nextProp.error != this.props.error)  || (!_.isEqual(this.state,nextState));
    }

    //console.log('text.component.shouldComponentUpdate   name = ',this.props.name ,' returnValue = ',returnValue);

    return returnValue;
  },

  getDefaultProps() {
    return {
      validate: []
    }
  },

  getInitialState() {
    return {
      errors: []
    };
  },

  updateValue(value) {
    var valueObject = {};
    valueObject[this.props.name] = value;
    this.context.update(valueObject,this.props.subModel);
    //console.log("text = ",value,this.state.errors);
    if(this.props.changedValueCB){
      this.props.changedValueCB(value);
    }

    if (this.state.errors.length) {
      //console.log('on update');
      setTimeout(() => this.isValid(true,value), 0);
    }
  },

  onChange(event) {
    this.updateValue(event.target.value)
  },

  isValid(showErrors,value) {
    let valueOfThisObject = "";
    if(this.props.subModel && this.context.value[this.props.subModel]){
      valueOfThisObject = this.context.value[this.props.subModel][this.props.name];
    }else{
      valueOfThisObject = this.context.value[this.props.name];
    }

    //console.log("isValid is running...",this.props.name,' with value =',valueOfThisObject);
    const errors = this.props.validate.reduce((memo, currentName) => memo.concat(validators[currentName](valueOfThisObject)), []);
    //console.log("isValid is running...",errors,this.props.name,' with value =',valueOfThisObject);
    if (showErrors) {
      this.setState({
        errors
      });
    }
    return !errors.length;
  },

  onBlur(event) {
    //console.log('on blur',event);
    this.isValid(true,event.target.value);
  },

  focusNameInputField(ref){
      //console.log('===================> text.component ref = ',ref);
     if (ref && this.props.isFocus) {
       setTimeout(() => ref.focus(), 100);
     }
  },

  render() {
    //console.log('text value=',this.context.value);
    let value = "";
    let disabled = this.props.disabled||false;
    //console.log('text.component.render  disabled = ',disabled);
    if(this.props.subModel && this.context.value[this.props.subModel]){
        value = this.context.value[this.props.subModel][this.props.name];
    }

    if(!this.props.subModel && this.context.value[this.props.name]){
      value = this.context.value[this.props.name]
    }
    value = value ? value : "";
    //console.log('text.component.render  value = ',value);

    return (
      <div>
      <TextField
        ref={this.focusNameInputField}
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        onChange={this.onChange}
        value={value}
        onBlur={this.onBlur}
        fullWidth={true}
        multiLine={this.props.multiLine}
        rows={this.props.rows}
        type={this.props.type}
        disabled={disabled}
        errorText={this.state.errors.length ? (
          <div>
            {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
          </div>
        ) : null}/>
        </div>
    );



  }
});
