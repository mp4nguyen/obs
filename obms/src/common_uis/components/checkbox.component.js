import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import * as validators from './validators';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    'lineHeight': '24px',
    display: 'inlineBlock',
    marginTop: '30px'
  },
};

export default React.createClass({

  displayName: 'Checkbox',

  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string
  },

  contextTypes: {
    value: PropTypes.object,
    update: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      validate: []
    }
  },

  getInitialState() {
    console.log('textbox getInitialState = ',this.context.value[this.props.name]);
    return {
      errors: [],
      checked: (this.context.value[this.props.name] == 1 ? true : false)
    };
  },

  updateValue(value) {
    var valueObject = {};
    valueObject[this.props.name] = value;
    this.context.update(valueObject);
  },

  onChange(event,isInputChecked) {
    console.log('Checkbox value = ',event,isInputChecked);
    if(isInputChecked){
      this.updateValue(1);
      this.setState({checked:true});
    }else{
      this.updateValue(0);
      this.setState({checked:false});
    }

  },

  render() {

    return (
      <div>
        <Checkbox
          style={styles.checkbox}
          label={this.props.label}
          onCheck={this.onChange}
          checked={this.state.checked}
        />
      </div>
    );
  }
});
