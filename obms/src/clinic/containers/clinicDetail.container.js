import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions';
import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Address from  "../../common_uis/components/address.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";

const log = (type) => console.log.bind(console, type);

class ClinicDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit company detail');
  }

  render() {

    return (
      (
        <div>
          <MyForm
            update={this.props.updateCurrentClinicFields}
            onSubmit={this._submit.bind(this)}
            value={this.props.currentClinic}
          >
            <Text name= "clincName" placeholder= "Clinic name" label= "Clinic name *"validate={["required"]}/>
            <div className="row">
              <div className="col-md-3">
                <Checkbox name= "isenable" label= "Enable"/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "iscalendar" label= "Calendar"/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isbookable" label= "Bookable"/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "istelehealth" label= "Telehealth"/>
              </div>
            </div>
            <Address/>
            <Text name= "description" placeholder= "Description" label= "Description" multiLine={true} rows={2}/>
            <SubmitButton/>
          </MyForm>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(ClinicDetail);
