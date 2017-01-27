import React, { PropTypes } from 'react';
import Select from  "./select.component";
import * as validators from './validators';

export default React.createClass({

  displayName: 'PersonTitle',

  propTypes: {
    subModel: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    validate: PropTypes.array,
    isFocus: PropTypes.bool
  },

  render() {
    let titles = [{title:"Miss"},{title:"Ms"},{title:"Mrs"},{title:"Mr"}];
    return (
      <Select
          subModel={this.props.subModel}
          name={this.props.name}
          dataSource={titles}
          valueField="title"
          primaryField="title"
          placeholder={this.props.placeholder}
          label= {this.props.label}
          validate={this.props.validate}
          isFocus={this.props.isFocus}
          />

    );
  }
});
