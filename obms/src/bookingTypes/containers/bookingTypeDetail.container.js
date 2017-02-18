import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/currentBookingTypeAction';
import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Person from  "../../common_uis/components/person.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";



const log = (type) => console.log.bind(console, type);

class BookingTypeDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit bookingtype detail');
    this.props.saveCurrentBookingType(this.props.currentBookingType);
  }

  render() {

    return (
      (
        <div>
          <MyForm
            update={this.props.updateCurrentBookingTypeFields}
            onSubmit={this._submit.bind(this)}
            value={this.props.currentBookingType}
          >
            <div className="row">
              <div className="col-md-9">
                <Text name= "bookingTypeName" placeholder= "Booking type name" label= "Booking type name *"validate={["required"]}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isenable" label= "Enable" defaultValue={1}/>
              </div>
            </div>
            <SubmitButton/>
          </MyForm>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return {currentBookingType:state.currentBookingType};
}

export default connect(mapStateToProps,actions)(BookingTypeDetail);
