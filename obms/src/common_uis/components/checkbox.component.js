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
    subModel: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.number
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

    // let value = this.props.defaultValue;
    // if(this.props.subModel && this.context.value[this.props.subModel]){
    //     value = this.context.value[this.props.subModel][this.props.name];
    // }
    //
    // if(!this.props.subModel && this.context.value[this.props.name]){
    //   value = this.context.value[this.props.name]
    // }
    //
    // console.log('checkbox.component.getInitialState value = ',value,' this.props.defaultValue = ',this.props.defaultValue);

    return {
      errors: [],
      checked: false
    };
  },

  componentWillMount(){
    let value = this.props.defaultValue;
    if(this.props.subModel && this.context.value[this.props.subModel]){
        value = this.context.value[this.props.subModel][this.props.name];
    }

    if(!this.props.subModel && this.context.value[this.props.name]){
      value = this.context.value[this.props.name]
    }

    console.log(this.props.name,'checkbox.component.componentWillMount value = ',value,' this.props.defaultValue = ',this.props.defaultValue);

    this.updateValue(value);

    this.setState({checked: (value == 1 ? true : false) });
  },

  shouldComponentUpdate(nextProp,nextState,nextContext){
    //
    // if(this.props.subModel && this.context.value[this.props.subModel]){
    //   return !(this.context.value[this.props.subModel][this.props.name]==nextContext.value[this.props.subModel][this.props.name]);
    // }else{
      //console.log(this.context.value[this.props.name],'    -    ',nextContext.value[this.props.name]);
      //return !(this.context.value[this.props.name]==nextContext.value[this.props.name]) ;
    //}
    var returnValue = true;
    if(this.props.subModel){
      if(this.context.value[this.props.subModel]){
        returnValue = !(this.context.value[this.props.subModel][this.props.name]==nextContext.value[this.props.subModel][this.props.name]);
      }else if(nextContext.value[this.props.subModel] && nextContext.value[this.props.subModel][this.props.name]){
        returnValue = true;
      }
    }else{
      //console.log(this.context.value[this.props.name],'    -    ',nextContext.value[this.props.name]);
      returnValue = !(this.context.value[this.props.name]==nextContext.value[this.props.name]);
    }

    return returnValue;
  },

  updateValue(value) {
    var valueObject = {};
    valueObject[this.props.name] = value;
    this.context.update(valueObject,this.props.subModel);
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
