import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {saveCurrentBookingType,updateCurrentBookingTypeFields} from '../../redux/actions/bookingTypesAction';
import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Person from  "../../common_uis/components/person.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";
import UploadPhoto from  "../../common_uis/components/uploadPhoto.component";



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
    console.log("bookingTypeDetail is rendering......");
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
            <div className="row">
              <div className="col-md-2">
                <UploadPhoto  name="icon" photoData="icon"/>
              </div>
              <div className="col-md-10">

              </div>
            </div>
            <SubmitButton/>
          </MyForm>
        </div>
      )
    );
  }
}
//<img style={{width: 50, height: 50}} src={this.props.currentBookingType.icon}/>
//<Text name= "icon" placeholder= "Icon base64 PNG" label= "Icon base64 PNG" />
function bindAction(dispatch) {
  return {
    saveCurrentBookingType: (data) => dispatch(saveCurrentBookingType(data)),
    updateCurrentBookingTypeFields: (data) => dispatch(updateCurrentBookingTypeFields(data)),
  };
}

function mapStateToProps(state){
	return {currentBookingType:state.bookingType.currentBookingType};
}

export default connect(mapStateToProps,bindAction)(BookingTypeDetail);
