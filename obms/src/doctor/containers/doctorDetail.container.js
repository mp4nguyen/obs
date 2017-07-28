import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {updateCurrentDoctorFields,saveCurrentDoctor,addNewDoctorBookingType,removeDoctorBookingType,addDoctorClinic,removeDoctorClinic} from '../../redux/actions/currentDoctorAction';

import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Address from  "../../common_uis/components/address.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";

import Person from  "../../common_uis/components/person.component";
import BookingTypesChip from "../../common_uis/components/bookingTypesChip.component";
import ClinicsChip from "../../common_uis/components/ClinicsChip.component";

import BookingTypes from "../../common_uis/components/bookingTypes.component";
import Clinics from "../../common_uis/components/clinics.component";


const log = (type) => console.log.bind(console, type);

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class DoctorDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit company detail');
    this.props.saveCurrentDoctor();
  }

  _addNewBookingTypeCallBack(bt){
    this.props.addNewDoctorBookingType(bt);
  }

  _removeBookingTypeCallBack(bt){
    this.props.removeDoctorBookingType(bt);
  };

  _addNewClinicCallBack(bt){
    this.props.addDoctorClinic(bt);
  }

  _removeClinicCallBack(bt){
    this.props.removeDoctorClinic(bt);
  };

  render() {
    let isNew = this.props.currentDoctor.doctorId ? false:true;
    //console.log('DoctorDetail.Containers.render  isNew = ',isNew);
    return (
      (
        <MyForm
          update={this.props.updateCurrentDoctorFields}
          onSubmit={this._submit.bind(this)}
          value={this.props.currentDoctor}
        >
          {/*Begin: Personal Information*/}
          <Person  isAccount={true} isNew={isNew}/>
          {/*Begin: Personal Information*/}
          {/*Begin: Time setting*/}
          <div className="portlet light bordered">
              <div className="portlet-title">
                  <div className="caption">
                      <span className="caption-subject font-red bold uppercase">Time Setting</span>
                  </div>
              </div>
              <div className="portlet-body todo-project-list-content todo-project-list-content-tags" style={{height: 'auto'}}>
                    <div className="row">
                      <div className="col-md-3">
                        <Checkbox name= "isEnable" label= "Doctor enable" defaultValue = {1}/>
                      </div>
                      <div className="col-md-3">
                        <Text name= "timeInterval" placeholder= "Time Interval" label= "Time Interval" validate={["number"]}/>
                      </div>
                    </div>
              </div>
          </div>
          {/*End: Time setting*/}
          {/*Begin: Booking type*/}
          <BookingTypesChip
             label="Specialist"
             bookingTypes={this.props.bookingTypes}
             data={this.props.currentDoctor.bookingTypes}
             addNewBookingTypeCallBack={this._addNewBookingTypeCallBack.bind(this)}
             removeBookingTypeCallBack={this._removeBookingTypeCallBack.bind(this)}/>
          {/*End: Booking type*/}
          {/*Begin: Clinic*/}
          <ClinicsChip
             label="Working Sites"
             clinics={this.props.clinics}
             data={this.props.currentDoctor.clinics}
             addNewClinicCallBack={this._addNewClinicCallBack.bind(this)}
             removeClinicCallBack={this._removeClinicCallBack.bind(this)}/>
          {/*End: Clinic*/}
          <SubmitButton className="pull-right"/>
        </MyForm>
      )
    );
  }
}

function bindAction(dispatch) {
  return {
    updateCurrentDoctorFields: (data) => dispatch(updateCurrentDoctorFields(data)),
    saveCurrentDoctor: () => dispatch(saveCurrentDoctor()),
    addNewDoctorBookingType: (data)=> dispatch(addNewDoctorBookingType(data)),
    removeDoctorBookingType: (data)=> dispatch(removeDoctorBookingType(data)),
    addDoctorClinic: (data)=> dispatch(addDoctorClinic(data)),
    removeDoctorClinic: (data)=> dispatch(removeDoctorClinic(data)),
  };
}

function mapStateToProps(state){
	return {
          currentDoctor:state.currentCompany.currentDoctor,
          clinics:state.currentCompany.clinics,
          bookingTypes:state.bookingType.bookingTypes
        };
}

export default connect(mapStateToProps,bindAction)(DoctorDetail);
