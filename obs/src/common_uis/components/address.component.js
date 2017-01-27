import React, { PropTypes } from 'react';

import Text from './text.component';
import * as validators from './validators';

export default React.createClass({

  displayName: 'Person',

  propTypes: {
    subModel: PropTypes.string
  },

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Text subModel={this.props.subModel} name= "address" placeholder= "Address" label= "Address *"validate={["required"]}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <Text subModel={this.props.subModel} name= "ward" placeholder= "Ward" label= "Ward *"validate={["required"]}/>
          </div>
          <div className="col-md-3">
            <Text subModel={this.props.subModel} name= "suburbDistrict" placeholder= "District" label= "District *"validate={["required"]}/>
          </div>
          <div className="col-md-3">
            <Text subModel={this.props.subModel} name= "stateProvince" placeholder= "Province" label= "Province *"validate={["required"]}/>
          </div>
          <div className="col-md-3">
            <Text subModel={this.props.subModel} name= "country" placeholder= "Country" label= "Country *"validate={["required"]}/>
          </div>
        </div>
      </div>
    );
  }
});
