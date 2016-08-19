// src/components/SubmitButton.js
import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classnames from 'classnames';

export default React.createClass({

  displayName: 'SubmitButton',

  propTypes: {
    label: PropTypes.string,
    className: PropTypes.string
  },

  contextTypes: {
    isFormValid: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      label: 'Submit'
    };
  },

  render() {
    let className = classnames(this.props.className);
    return (
      <RaisedButton
        className = {className}
        primary
        disabled={!this.context.isFormValid()}
        label={this.props.label}
        onTouchTap={this.context.submit}/>
    );
  }
});
