import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import * as validators from './validators';

export default React.createClass({

  displayName: 'Text',

  propTypes: {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string)
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
    this.context.update(valueObject);
    //console.log("text = ",value,this.state.errors);

    if (this.state.errors.length) {
      //console.log('on update');
      setTimeout(() => this.isValid(true,value), 0);
    }
  },

  onChange(event) {
    this.updateValue(event.target.value)
  },

  isValid(showErrors,value) {
    let valueOfThisObject = this.context.value[this.props.name];
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
    return (
      <div>
      <TextField
        hintText={this.props.placeholder}
        floatingLabelText={this.props.label}
        onChange={this.onChange}
        onBlur={this.onBlur}
        fullWidth={true}
        errorText={this.state.errors.length ? (
          <div>
            {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
          </div>
        ) : null}/>
        </div>
    );
  }
});
