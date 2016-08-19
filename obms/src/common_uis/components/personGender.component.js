import React, { PropTypes } from 'react';
import Select from  "./select.component";
import * as validators from './validators';

export default React.createClass({

  displayName: 'PersonGender',

  propTypes: {
    subModel: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    validate: PropTypes.array
  },

  render() {
    let titles = [{title:"Female"},{title:"Male"},{title:"Other"}];
    return (
      <Select
          subModel={this.props.subModel}
          name={this.props.name}
          dataSource={titles}
          valueField="title"
          primaryField="title"
          placeholder={this.props.placeholder}
          label= {this.props.label}
          validate={this.props.validate}/>
    );
  }
});
