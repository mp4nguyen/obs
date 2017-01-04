var React = require('react')
var InputMask = require('inputmask-core')
import TextField from 'material-ui/TextField';

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
    mask: React.PropTypes.string.isRequired,

    formatCharacters: React.PropTypes.object,
    placeholderChar: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      value: ''
    }
  },

  getInitialState() {
    return {
      value: ''
    };
  },

  componentWillMount() {
    var options = {
      pattern: this.props.mask,
      value: this.props.value,
      formatCharacters: this.props.formatCharacters
    }
    if (this.props.placeholderChar) {
      options.placeholderChar = this.props.placeholderChar
    }
    this.mask = new InputMask(options)
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

  _onChange(e) {

    //console.log('onChange', JSON.stringify(getSelection(this.input)), e.target.value)

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
      //e.target.value = this.mask.getValue()
      this.setState({value: this.mask.getValue()});
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
    // return (
    //         <div className="row">
    //           <div className="input-field">
    //             <input className="validate"  {...inputProps}/>
    //             <label>DOB</label>
    //           </div>
    //         </div>
    // );
          return (
            <div>
            <TextField
              ref="dateinput"
              floatingLabelText={this.props.label}
              onChange={this._onChange}
              value={this.state.value}
              fullWidth={true}
              onKeyDown={this._onKeyDown}
              onKeyPress={this._onKeyPress}
              onPaste={this._onPaste}
            />
              </div>
          );
  }
})

module.exports = DateInput

//
// import React, { PropTypes } from 'react';
// import ReactDOM from 'react-dom';
// import TextField from 'material-ui/TextField';
// import * as validators from './validators';
// import InputMask from 'inputmask-core';
//
// export default React.createClass({
//
//   displayName: 'DateInput',
//
//   propTypes: {
//     dateformat: PropTypes.string,
//     subModel: PropTypes.string,
//     name: PropTypes.string.isRequired,
//     placeholder: PropTypes.string,
//     label: PropTypes.string,
//     validate: PropTypes.arrayOf(PropTypes.string),
//     multiLine: PropTypes.bool,
//     rows: PropTypes.number
//   },
//
//   componentWillMount() {
//
//   },
//
//   componentWillUnmount() {
//     //this.removeValidationFromContext();
//   },
//
//   shouldComponentUpdate(nextProp,nextState,nextContext){
//     return true;
//   },
//
//   componentDidUpdate(prevProps,prevState){
//     //move the cursor back to the current position when the user enter into the dateinput mask
//     //the reason to move the cusor is that:
//     //      - we are using the inputmask to format the date when the user inter the date, for example: __/__/____
//     //      - each time we enter the number (1), the mask format will convert to 1_/__/____ and put into the textbox, so the textbox will think as the whole string,
//     //        so it will move the cursor into the back
//     if(this.refs && this.refs.dateinput && this.refs.dateinput.input){
//       this.refs.dateinput.input.setSelectionRange(this.state.cursorPosition,this.state.cursorPosition);
//     }
//
//   },
//
//   getDefaultProps() {
//     return {
//       validate: []
//     }
//   },
//
//   getInitialState() {
//     return {
//       dateInputValue: '',
//       cursorPosition: 0,
//       prevCursorPosition: -1,
//       isBackSpace: false
//     };
//   },
//
//   updateValue(value,cursorPosition) {
//     this.setState({prevCursorPosition:this.state.cursorPosition});
//
//     let mask = new InputMask({pattern: '11/11/1111',value});
//     let markPosition = mask.getValue().indexOf('/',cursorPosition - 2);
//     let isForward = (this.state.prevCursorPosition <= cursorPosition? true: false);
//
//     if(markPosition == cursorPosition && !this.state.isBackSpace){
//       cursorPosition++;
//     }
//
//     console.log('isForward = ',this.state.isBackSpace,' currorPosition = ',cursorPosition);
//     console.log(' mash value = ',mask.getValue(),' markPosition = ',markPosition);
//
//     if(markPosition == (cursorPosition - 1) && this.state.isBackSpace){
//       cursorPosition--;
//     }
//
//
//     this.setState({dateInputValue:mask.getValue(),cursorPosition});
//     this.setState({isBackSpace:false});
//     console.log('isBackSpace = ',this.state.isBackSpace,' currorPosition = ',cursorPosition,' prevCursorPosition = ',this.state.prevCursorPosition);
//
//
//   },
//
//   onChange(event) {
//     this.updateValue(event.target.value,event.target.selectionStart)
//   },
//
//   onKeyDown(e){
//     console.log('onKeyPress = ',e.currentTarget,e.target.value,e.charCode,e.keyCode,' selectionStart =',event.target.selectionStart);
//     if(e.keyCode == 8){
//       this.setState({isBackSpace:true});
//     }
//   },
//
//   render() {
//     //console.log('text value=',this.context.value);
//
//     let value = null;
//       return (
//         <div>
//         <TextField
//           ref="dateinput"
//           hintText={this.props.placeholder}
//           floatingLabelText={this.props.label}
//           onChange={this.onChange}
//           value={this.state.dateInputValue}
//           fullWidth={true}
//           onKeyDown={this.onKeyDown}
//         />
//           </div>
//       );
//   }
// });
