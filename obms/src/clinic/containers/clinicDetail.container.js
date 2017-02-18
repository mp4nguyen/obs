import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/currentClinicAction';

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
    this.props.addNewClinicBookingType(this.props.currentClinic,bt);
  }

  _removeBookingTypeCallBack(bt){
    this.props.removeClinicBookingType(this.props.currentClinic,bt);
  };

  _addNewDoctorCallBack(bt){
    this.props.addNewClinicDoctor(this.props.currentClinic,bt);
  }

  _removeDoctorCallBack(bt){
    console.log('ClinicDetail._removeDoctorCallBack................');
    this.props.removeClinicDoctor(this.props.currentClinic,bt);
  };

  _submit(){
    console.log('submit company detail');
    this.props.saveCurrentClinic(this.props.currentCompany.companyId,this.props.currentClinic);
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
                <Checkbox name= "isenable" label= "Enable" defaultValue={1}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "iscalendar" label= "Calendar" defaultValue={1}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isbookable" label= "Bookable" defaultValue={1}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "istelehealth" label= "Telehealth"/>
              </div>
            </div>
            <Address/>
            <Text name= "description" placeholder= "Description" label= "Description" multiLine={true} rows={2}/>
            <BookingTypesChip
               label="Services"
               bookingTypes={this.props.bookingTypes}
               data={this.props.currentClinic.BookingTypes}
               addNewBookingTypeCallBack={this._addNewBookingTypeCallBack.bind(this)}
               removeBookingTypeCallBack={this._removeBookingTypeCallBack.bind(this)}/>
             <DoctorsChip
                label="Doctors"
                doctors={this.props.currentCompany.Doctors}
                doctorSubModel="Person"
                data={this.props.currentClinic.Doctors}
                addNewDoctorCallBack={this._addNewDoctorCallBack.bind(this)}
                removeDoctorCallBack={this._removeDoctorCallBack.bind(this)}/>
            <SubmitButton/>
          </MyForm>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return {currentClinic:state.currentClinic,currentCompany:state.currentCompany,bookingTypes:state.bookingTypes};
}

export default connect(mapStateToProps,actions)(ClinicDetail);
