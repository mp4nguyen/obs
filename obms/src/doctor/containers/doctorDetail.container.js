import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';

import * as actions from '../../redux/actions';
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
import DoctorRoster from "./doctorRoster.container";

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
    //this.props.uploadPhotoDoctor(this.props.currentDoctor);
    this.props.saveCurrentDoctor(this.props.currentCompany.companyId,this.props.currentDoctor);

  }

  _addNewBookingTypeCallBack(bt){
    this.props.addNewDoctorBookingType(this.props.currentDoctor,bt);
  }

  _removeBookingTypeCallBack(bt){
    this.props.removeDoctorBookingType(this.props.currentDoctor,bt);
  };

  _addNewClinicCallBack(bt){
    this.props.addDoctorClinic(this.props.currentDoctor,bt);
  }

  _removeClinicCallBack(bt){
    this.props.removeDoctorClinic(this.props.currentDoctor,bt);
  };

  render() {

    return (
      (
        <div>
          <Tabs>
            <Tab label="Person Information" >
             <MyForm
               update={this.props.updateCurrentDoctorFields}
               onSubmit={this._submit.bind(this)}
               value={this.props.currentDoctor}
             >
               {/*Begin: Personal Information*/}
               <Person subModel="Person" />
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
                             <Checkbox name= "isenable" label= "Enable"/>
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
                  data={this.props.currentDoctor.BookingTypes}
                  addNewBookingTypeCallBack={this._addNewBookingTypeCallBack.bind(this)}
                  removeBookingTypeCallBack={this._removeBookingTypeCallBack.bind(this)}/>
               {/*End: Booking type*/}
               {/*Begin: Clinic*/}
               <ClinicsChip
                  label="Working Sites"
                  clinics={this.props.currentCompany.Clinics}
                  data={this.props.currentDoctor.Clinics}
                  addNewClinicCallBack={this._addNewClinicCallBack.bind(this)}
                  removeClinicCallBack={this._removeClinicCallBack.bind(this)}/>
               {/*End: Clinic*/}
               <SubmitButton className="pull-right"/>
             </MyForm>
            </Tab>
            <Tab
              label="Roster"
            >
              <div>
               <DoctorRoster/>
              </div>
            </Tab>

         </Tabs>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(DoctorDetail);
