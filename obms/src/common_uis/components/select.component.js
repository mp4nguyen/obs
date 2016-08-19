import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as validators from './validators';

export default React.createClass({

  displayName: 'Select',

  propTypes: {
    dataSource: PropTypes.array,
    primaryField: PropTypes.string,
    valueField: PropTypes.string,
    subModel: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
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

  shouldComponentUpdate(nextProp,nextState,nextContext){

    if(this.props.subModel && this.context.value[this.props.subModel]){
      return !(this.context.value[this.props.subModel][this.props.name]==nextContext.value[this.props.subModel][this.props.name]);
    }else{
      return !(this.context.value[this.props.name]==nextContext.value[this.props.name])
    }
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

    if (this.state.errors.length) {
      //console.log('on update');
      setTimeout(() => this.isValid(true,value), 0);
    }
  },

  onChange(event, index, value) {
    console.log('select =',value);
    this.updateValue(value)
  },

  isValid(showErrors,value) {
    let valueOfThisObject = "";
    if(this.props.subModel){
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

  render() {
    //console.log('text value=',this.context.value);
    let items = [];
    let value = null;
    if(this.props.dataSource){
      items = this.props.dataSource.map((value,index)=>{
        return (<MenuItem key={index} value={value[this.props.valueField]} primaryText={value[this.props.primaryField]} />);
      });
    }

    if(this.props.subModel){
      value=this.context.value[this.props.subModel][this.props.name];
    }else{
      value=this.context.value[this.props.name];
    }

    return (
      <div>
        <SelectField
          onChange={this.onChange}
          value={value}
          floatingLabelText={this.props.label}
          disabled={this.props.disabled}
        >
          {items}
        </SelectField>
        </div>
    );


  }
});
