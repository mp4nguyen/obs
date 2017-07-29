import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {saveCurrentClinic,addNewClinicBookingType,removeClinicBookingType,addNewClinicDoctor,removeClinicDoctor,updateCurrentClinicFields} from '../../redux/actions/currentClinicAction';

import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Address from  "../../common_uis/components/address.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";
import BookingTypesChip from "../../common_uis/components/bookingTypesChip.component";
import DoctorsChip from "../../common_uis/components/doctorsChip.component";

const log = (type) => console.log.bind(console, type);

class ClinicDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _addNewBookingTypeCallBack(bt){
    this.props.addNewClinicBookingType(bt);
  }

  _removeBookingTypeCallBack(bt){
    this.props.removeClinicBookingType(bt);
  };

  _addNewDoctorCallBack(bt){
    this.props.addNewClinicDoctor(bt);
  }

  _removeDoctorCallBack(bt){
    console.log('ClinicDetail._removeDoctorCallBack................');
    this.props.removeClinicDoctor(bt);
  };

  _submit(){
    console.log('submit company detail');
    this.props.saveCurrentClinic();
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
            <Text name= "clinicName" placeholder= "Clinic name" label= "Clinic name *"validate={["required"]}/>
            <div className="row">
              <div className="col-md-3">
                <Checkbox name= "isEnable" label= "Enable" defaultValue={1}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isCalendar" label= "Calendar" defaultValue={1}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isBookable" label= "Bookable" defaultValue={1}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isTelehealth" label= "Telehealth"/>
              </div>
            </div>
            <Address/>
            <Text name= "description" placeholder= "Description" label= "Description" multiLine={true} rows={2}/>
            <BookingTypesChip
               label="Services"
               bookingTypes={this.props.bookingTypes}
               data={this.props.currentClinic.bookingTypes}
               addNewBookingTypeCallBack={this._addNewBookingTypeCallBack.bind(this)}
               removeBookingTypeCallBack={this._removeBookingTypeCallBack.bind(this)}/>
             <DoctorsChip
                label="Doctors"
                doctors={this.props.doctors}
                data={this.props.currentClinic.doctors}
                addNewDoctorCallBack={this._addNewDoctorCallBack.bind(this)}
                removeDoctorCallBack={this._removeDoctorCallBack.bind(this)}/>
            <SubmitButton/>
          </MyForm>
        </div>
      )
    );
  }
}

function bindAction(dispatch) {
  return {
    updateCurrentClinicFields: (data)=> dispatch(updateCurrentClinicFields(data)),
    saveCurrentClinic: () => dispatch(saveCurrentClinic()),
    addNewClinicDoctor: (data)=> dispatch(addNewClinicDoctor(data)),
    removeClinicDoctor: (data)=> dispatch(removeClinicDoctor(data)),
    addNewClinicBookingType: (data)=> dispatch(addNewClinicBookingType(data)),
    removeClinicBookingType: (data)=> dispatch(removeClinicBookingType(data)),
  };
}

function mapStateToProps(state){
	return {
          currentClinic:state.currentCompany.currentClinic,
          doctors:state.currentCompany.doctors,
          bookingTypes:state.bookingType.bookingTypes
        };
}

export default connect(mapStateToProps,bindAction)(ClinicDetail);
