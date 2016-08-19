import React, { PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import * as validators from './validators';
import moment from 'moment';

export default React.createClass({

  displayName: 'Date',

  propTypes: {
    dateType: PropTypes.string,
    subModel: PropTypes.string,
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

  shouldComponentUpdate(nextProp,nextState,nextContext){
    var dateValue,nextDateValue;
    if(this.props.subModel){
      if(this.context.value[this.props.subModel] && this.context.value[this.props.subModel][this.props.name]){
        if(moment.isMoment(this.context.value[this.props.subModel][this.props.name])){
          dateValue = this.context.value[this.props.subModel][this.props.name];
          nextDateValue = nextContext.value[this.props.subModel][this.props.name];
        }else{
          dateValue = moment(this.context.value[this.props.subModel][this.props.name],'YYYY/MM/DD HH:mm:ss');
          nextDateValue = moment(nextContext.value[this.props.subModel][this.props.name],'YYYY/MM/DD HH:mm:ss');
        }
      }
    }else{
      if(this.context.value[this.props.name]){
        if(moment.isMoment(this.context.value[this.props.name])){
          dateValue = this.context.value[this.props.name];
          nextDateValue = nextContext.value[this.props.name];
        }else {
          dateValue = moment(this.context.value[this.props.name],'YYYY/MM/DD HH:mm:ss');
          nextDateValue = moment(nextContext.value[this.props.name],'YYYY/MM/DD HH:mm:ss');
        }
      }
    }
    console.log('shouldComponentUpdate of',this.props.name,' ',dateValue,'  ',nextDateValue);
    if(dateValue && nextDateValue) return !dateValue.isSame(nextDateValue);

    //if no value => no render
    return false;
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
    var dateValue = "";

    if(this.props.subModel && this.context.value[this.props.subModel]){
      if(this.context.value[this.props.subModel][this.props.name]){
        dateValue = moment(value).format('YYYY/MM/DD') + ' ' + moment(this.context.value[this.props.subModel][this.props.name],'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
      }else{
        dateValue = moment(value).format('YYYY/MM/DD');
      }
    }else{
      if(this.context.value[this.props.name]){
        console.log('this.context.value[this.props.name]=',this.context.value[this.props.name]);
        dateValue = moment(value).format('YYYY/MM/DD') + ' ' + moment(this.context.value[this.props.name],'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
      }else{
        dateValue = moment(value).format('YYYY/MM/DD');
      }
    }

    valueObject[this.props.name] = dateValue;
    console.log('date.updateValue = ',valueObject);

    this.context.update(valueObject,this.props.subModel);
    //console.log("text = ",value,this.state.errors);

    if (this.state.errors.length) {
      console.log('on update');
      setTimeout(() => this.isValid(true,value), 0);
    }
  },

  onChange(x,event) {
    console.log('date.onChange = ',x,event);
    this.updateValue(event)
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

  render() {

    let DateTimeFormat = global.Intl.DateTimeFormat;
    const defaultDate = new Date();
    var dateValue;

    if(this.props.subModel){
      if(this.context.value[this.props.subModel] && this.context.value[this.props.subModel][this.props.name]){
        if(moment.isMoment(this.context.value[this.props.subModel][this.props.name])){
          dateValue = this.context.value[this.props.subModel][this.props.name].toDate();
        }else{
          dateValue = moment(this.context.value[this.props.subModel][this.props.name],'YYYY/MM/DD HH:mm:ss').toDate();
        }
      }
    }else{
      if(this.context.value[this.props.name]){

        if(moment.isMoment(this.context.value[this.props.name])){

          dateValue = this.context.value[this.props.name].toDate();
        }else {

          dateValue = moment(this.context.value[this.props.name],'YYYY/MM/DD HH:mm:ss').toDate();
        }

      }
    }
    //console.log(' dateValue = ',dateValue);

    let maxDate;
    let minDate;

    if(this.props.dateType == 'BIRTHDAY' || !this.props.dateType){
      maxDate = new Date();
      minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      minDate.setHours(0, 0, 0, 0);
      defaultDate.setFullYear(1990);
      defaultDate.setHours(0, 0, 0, 0);
    }else if(this.props.dateType == 'FUTURE'){
      minDate = new Date();
      maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 100);
      maxDate.setHours(0, 0, 0, 0);
    }

    //console.log(minDate,' ',maxDate);

      return (
        <div>
          <DatePicker
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
            value={dateValue}
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
