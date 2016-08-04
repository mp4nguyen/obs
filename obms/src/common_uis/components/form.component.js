import React, {PropTypes} from 'react';
import without from 'lodash.without';
import assign from 'lodash.assign';

const noop = () => undefined;

export default React.createClass({
  displayName: 'MyForm',

  propTypes: {
    children: PropTypes.node,
    value: PropTypes.object,
    update: PropTypes.func,
    onSubmit: PropTypes.func
  },

  childContextTypes: {
    value: PropTypes.object,
    update: PropTypes.func,
    submit: PropTypes.func,
    registerValidation: PropTypes.func,
    isFormValid: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onSubmit: noop
    };
  },

  validations: [],

  registerValidation(isValidFunc) {
    //console.log('form.registerValidation = ',this.validations);
    this.validations = [...this.validations, isValidFunc];
    //console.log('form.registerValidation = ',this.validations);
    return this.removeValidation.bind(null, isValidFunc);
  },

  removeValidation(ref) {
    this.validations = without(this.validations, ref);
  },

  isFormValid(showErrors) {
    //console.log('isFormValid is running...',this.validations);
    return this.validations.reduce((memo, isValidFunc)=>
    {
      var isValid = isValidFunc(showErrors);
      //console.log('isFormValid.isValidFunc = ',memo,isValidFunc,' = ',isValid);
      return  isValid&& memo;
    }, true);
  },

  submit(){
    if (this.isFormValid(true)) {
      this.props.onSubmit("assign({}, this.props.values)");
    }
  },

  getChildContext() {
    var o = {
      value: this.props.value,
      update: this.props.update,
      submit: this.submit,
      registerValidation: this.registerValidation,
      isFormValid: this.isFormValid
    };

    //console.log('this.getChildContext = ',o);
    return o;
  },

  render() {
    //console.log('form value=',this.props.value);
    return (
      <form>
        {this.props.children}
      </form>
    );
  }
});
