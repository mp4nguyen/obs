import React, { PropTypes } from 'react';
import InputMask from 'inputmask-core';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import * as validators from './validators';

var KEYCODE_Z = 90
var KEYCODE_Y = 89

function isUndo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Y : KEYCODE_Z)
}

function isRedo(e) {
  return (e.ctrlKey || e.metaKey) && e.keyCode === (e.shiftKey ? KEYCODE_Z : KEYCODE_Y)
}

function getSelection (el) {
  var start, end, rangeEl, clone

  if (el.selectionStart !== undefined) {
    start = el.selectionStart
    end = el.selectionEnd
  }
  else {
    try {
      el.focus()
      rangeEl = el.createTextRange()
      clone = rangeEl.duplicate()

      rangeEl.moveToBookmark(document.selection.createRange().getBookmark())
      clone.setEndPoint('EndToStart', rangeEl)

      start = clone.text.length
      end = start + rangeEl.text.length
    }
    catch (e) { /* not focused or not visible */ }
  }

  return { start, end }
}

function setSelection(el, selection) {
  console.log(' selectionStart = ',el.selectionStart);
  var rangeEl

  try {
    if (el.selectionStart !== undefined) {
      el.focus()
      el.setSelectionRange(selection.start, selection.end)
    }
    else {
      el.focus()
      rangeEl = el.createTextRange()
      rangeEl.collapse(true)
      rangeEl.moveStart('character', selection.start)
      rangeEl.moveEnd('character', selection.end - selection.start)
      rangeEl.select()
    }
  }
  catch (e) { /* not focused or not visible */ }
}

var DateInput = React.createClass({


  propTypes: {
    dateformat: React.PropTypes.string.isRequired,

    dateType: PropTypes.string,
    subModel: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),

    formatCharacters: React.PropTypes.object,
    placeholderChar: React.PropTypes.string
  },

  contextTypes: {
    value: PropTypes.object,
    update: PropTypes.func.isRequired,
    registerValidation: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      validate: [],
      value: ''
    }
  },

  getInitialState() {
    return {
      value: '',
      isValidDate: true,
      errors: []
    };
  },

  componentWillMount() {
    var pattern = this.props.dateformat.replace(/[a-zA-Z0-9]/g, '1');
    let value = null;
    //get value for the component from the content of father component, it is Form component
    if(this.props.subModel && this.context.value[this.props.subModel]){
        value = this.context.value[this.props.subModel][this.props.name];
    }else{
        value = this.context.value[this.props.name]
    }
    console.log('dateinput.component   value = ',value);
    var options = {
      pattern,
      value: moment(value).format(this.props.dateformat),
      formatCharacters: this.props.formatCharacters
    }
    if (this.props.placeholderChar) {
      options.placeholderChar = this.props.placeholderChar
    }

    this.mask = new InputMask(options)
    console.log('dateinput.component  componentWillMount  options = ',options,' mask value = ',this.mask.getValue());
    this.setState({isValidDate:this._isDate()});

    this.removeValidationFromContext = this.context.registerValidation(show => this.isValid(show));
  },

  componentWillUnmount() {
    this.removeValidationFromContext();
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.mask !== nextProps.mask && this.props.value !== nextProps.mask) {
      // if we get a new value and a new mask at the same time
      // check if the mask.value is still the initial value
      // - if so use the nextProps value
      // - otherwise the `this.mask` has a value for us (most likely from paste action)
      if (this.mask.getValue() === this.mask.emptyValue) {
        this.mask.setPattern(nextProps.mask, {value: nextProps.value})
      }
      else {
        this.mask.setPattern(nextProps.mask, {value: this.mask.getRawValue()})
      }
    }
    else if (this.props.mask !== nextProps.mask) {
      this.mask.setPattern(nextProps.mask, {value: this.mask.getRawValue()})
    }
    else if (this.props.value !== nextProps.value) {
      this.mask.setValue(nextProps.value)
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.mask !== this.props.mask) {
      this._updatePattern(nextProps)
    }
  },

  componentDidUpdate(prevProps) {
    if (prevProps.mask !== this.props.mask && this.mask.selection.start) {
      this._updateInputSelection()
    }
  },

  _isDate(){
    //check the data in the mask is a date or not
    //used to display error message
    var rawValue = this.mask.getRawValue().replace(/_/g,'');

    if(rawValue.length > 0){
      var maskValue = this.mask.getValue().replace(/_/g,'');
      var dateObject = moment(maskValue,this.props.dateformat);
      console.log('_isDate will validate the date = ',this.mask.getValue(),' dateObject.isValid() = ',dateObject.isValid());
      //call this function to update value in the father compoent , it means Form compoent
      this.updateValue(maskValue)
      return dateObject.isValid();
    }else {
      //if no data in mask, return true value
      return true;
    }

  },

  _updatePattern: function(props) {
    this.mask.setPattern(props.mask, {
      value: this.mask.getRawValue(),
      selection: getSelection(this.input)
    })
  },

  _updateMaskSelection() {
    console.log(this.refs);
    this.mask.selection = getSelection(this.refs.dateinput.input)
  },

  _updateInputSelection() {
    console.log(this.refs);
    setSelection(this.refs.dateinput.input, this.mask.selection)
  },

  updateValue(value) {
    //update value of dateinput component into the father component through content
    console.log('dateinput.updateValue of model is running......');
    var valueObject = {};
    var dateValue = "";

    if(this.props.subModel && this.context.value[this.props.subModel]){
      if(this.context.value[this.props.subModel][this.props.name]){
        dateValue = moment(value,this.props.dateformat);//.format('YYYY/MM/DD');// + ' ' + moment(this.context.value[this.props.subModel][this.props.name],'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
      }else{
        dateValue = moment(value,this.props.dateformat);//.format('YYYY/MM/DD');
      }
    }else{
      if(this.context.value[this.props.name]){
        console.log('this.context.value[this.props.name]=',this.context.value[this.props.name]);
        dateValue = moment(value,this.props.dateformat);//.format('YYYY/MM/DD');// + ' ' + moment(this.context.value[this.props.name],'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
      }else{
        dateValue = moment(value,this.props.dateformat);//.format('YYYY/MM/DD');
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

  _onChange(e) {

    console.log('-->dateinput.onChange is running......')

    var maskValue = this.mask.getValue()
    if (e.target.value !== maskValue) {
      // Cut or delete operations will have shortened the value
      if (e.target.value.length < maskValue.length) {
        var sizeDiff = maskValue.length - e.target.value.length
        this._updateMaskSelection()
        this.mask.selection.end = this.mask.selection.start + sizeDiff
        this.mask.backspace()
      }
      var value = this._getDisplayValue()
      console.log(' _getDisplayValue = ',value);
      e.target.value = value
      if (value) {
        this._updateInputSelection()
      }
    }

    this.updateValue(maskValue)

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  },

  _onKeyDown(e) {
     console.log('onKeyDown', JSON.stringify(getSelection(this.refs.dateinput.input)), e.key, e.target.value)

    if (isUndo(e)) {
      e.preventDefault()
      if (this.mask.undo()) {
        e.target.value = this._getDisplayValue()
        this._updateInputSelection()
        if (this.props.onChange) {
          this.props.onChange(e)
        }
      }
      return
    }
    else if (isRedo(e)) {
      e.preventDefault()
      if (this.mask.redo()) {
        e.target.value = this._getDisplayValue()
        this._updateInputSelection()
        if (this.props.onChange) {
          this.props.onChange(e)
        }
      }
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      this._updateMaskSelection()
      if (this.mask.backspace()) {
        var value = this._getDisplayValue()
        e.target.value = value
        this.setState({isValidDate:this._isDate()});
        if (value) {
          this._updateInputSelection()
        }
        if (this.props.onChange) {
          this.props.onChange(e)
        }
      }
    }
  },

  _onKeyPress(e) {
     console.log('onKeyPress', JSON.stringify(getSelection(this.refs.dateinput.input)), e.key, e.target.value)

    // Ignore modified key presses
    // Ignore enter key to allow form submission
    if (e.metaKey || e.altKey || e.ctrlKey || e.key === 'Enter') { return }

    e.preventDefault()
    this._updateMaskSelection()
    console.log('will add value into mask = ',e.key,e.data);
    if (this.mask.input((e.key || e.data))) {
      console.log(' after add into mask = ',this.mask.getValue());
      e.target.value = this.mask.getValue()
      //this.setState({value: this.mask.getValue()});
      this.setState({isValidDate:this._isDate()});
      this._updateInputSelection()
      if (this.props.onChange) {
        this.props.onChange(e)
      }
    }
  },

  _onPaste(e) {
     //console.log('onPaste', JSON.stringify(getSelection(this.input)), e.clipboardData.getData('Text'), e.target.value)

    e.preventDefault()
    this._updateMaskSelection()
    // getData value needed for IE also works in FF & Chrome
    if (this.mask.paste(e.clipboardData.getData('Text'))) {
      e.target.value = this.mask.getValue()
      // Timeout needed for IE
      setTimeout(this._updateInputSelection, 0)
      if (this.props.onChange) {
        this.props.onChange(e)
      }
    }
  },

  _getDisplayValue() {
    var value = this.mask.getValue()
    return value === this.mask.emptyValue ? '' : value
  },

  _keyPressPropName() {
    if (typeof navigator !== 'undefined') {
      return navigator.userAgent.match(/Android/i)
      ? 'onBeforeInput'
      : 'onKeyPress'
    }
    return 'onKeyPress'
  },

  _getEventHandlers() {
    return {
      onChange: this._onChange,
      onKeyDown: this._onKeyDown,
      onPaste: this._onPaste,
      [this._keyPressPropName()]: this._onKeyPress
    }
  },

  focus() {
    this.input.focus()
  },

  blur() {
    this.input.blur()
    this.isValid(true,this.mask.getValue());
  },

  render() {
    var ref = r => this.input = r
    var maxLength = this.mask.pattern.length
    var value = this._getDisplayValue()
    var eventHandlers = this._getEventHandlers()
    var { size = maxLength, placeholder = this.mask.emptyValue } = this.props

    var {placeholderChar, formatCharacters, ...cleanedProps} = this.props
    var inputProps = { ...cleanedProps, ...eventHandlers, ref, maxLength, value, size, placeholder }

    console.log('----------------> render value = ',value);
    //return <input {...inputProps} />
    return (
      <div>
      <TextField
        ref="dateinput"
        floatingLabelText={this.props.label}
        hintText="DD/MM/YYYY"
        onChange={this._onChange}
        value={value}
        fullWidth={true}
        onKeyDown={this._onKeyDown}
        onKeyPress={this._onKeyPress}
        onPaste={this._onPaste}
        errorText={!this.state.isValidDate ? (
          <div>
            Invalid date input
          </div>
        ) : null}
      />
        </div>
    );
  }
})

module.exports = DateInput
