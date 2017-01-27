import React, { PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import * as validators from './validators';
import moment from 'moment';

export default React.createClass({

  displayName: 'Date',

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
    valueObject[this.props.name] = moment(value).format('DD/MM/YYYY');
    this.context.update(valueObject);
    //console.log("text = ",value,this.state.errors);

    if (this.state.errors.length) {
      console.log('on update');
      setTimeout(() => this.isValid(true,value), 0);
    }
  },

  onChange(event) {
    //console.log('date value = ',event);
    this.updateValue(event)
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
    let DateTimeFormat = global.Intl.DateTimeFormat;
    const defaultDate = new Date();
    defaultDate.setFullYear(1990);
    defaultDate.setHours(0, 0, 0, 0);

    const maxDate = new Date();

    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    minDate.setHours(0, 0, 0, 0);

    //console.log(minDate,' ',maxDate);

    return (
      <div>
        <DatePicker
          hintText={this.props.placeholder}
          floatingLabelText={this.props.label}
          onChange={this.onChange}
          onBlur={this.onBlur}
          errorText={this.state.errors.length ? (
            <div>
              {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
            </div>
          ) : null}
          minDate={minDate}
          maxDate={maxDate}
          formatDate={ new DateTimeFormat('en-AU', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              }).format
          }
        />
      </div>
    );
  }
});
