import React, { PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import * as validators from './validators';
import moment from 'moment';


var m = moment();
var dates = [];
var months = [];
var years = [];
var currentYear = m.year();

for (var i = 1; i < 32; i++) {
 dates.push(''+i+'');
}

for (var i = 0; i < 12; i++) {
  months.push(m.month(i).format('MM'));
}

for (var i = 0; i < 100; i++) {
 years.push(m.year(currentYear - i).format('YYYY'));
}


export default React.createClass({

  displayName: 'MyDateInput',

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
      //console.log('on update');
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

    //console.log(minDate,' ',dates);

    return (
      <div className="row">
        <div className="col-md-3">
          <AutoComplete
            hintText={this.props.placeholder}
            floatingLabelText={this.props.label}
            openOnFocus={true}
            fullWidth={true}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={dates}
          />
        </div>
        <div className="col-md-1">
        </div>
        <div className="col-md-3">
          <AutoComplete
            floatingLabelText="MM"
            openOnFocus={true}
            fullWidth={true}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={months}
          />
        </div>
        <div className="col-md-1">
        </div>
        <div className="col-md-3">
          <AutoComplete
            floatingLabelText="YYYY"
            openOnFocus={true}
            fullWidth={true}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={years}
          />
        </div>
      </div>
    );
  }
});
