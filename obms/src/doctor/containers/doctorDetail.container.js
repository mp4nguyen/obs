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

  _updateBookingTypeCallBack(bt){
    this.props.updateDoctorBookingType(this.props.currentDoctor,bt);
  };

  render() {

    return (
      (
        <div>
          <Tabs>
            <Tab label="Setup" >
              <div>
               <h1/>
               <BookingTypes
                  bookingTypes={this.props.bookingTypes}
                  data={this.props.currentDoctor.BookingTypes}
                  addNewBookingTypeCallBack={this._addNewBookingTypeCallBack.bind(this)}
                  updateBookingTypeCallBack={this._updateBookingTypeCallBack.bind(this)}/>
               <Clinics  data={this.props.currentDoctor.Clinics}/>
              </div>
            </Tab>
            <Tab
              label="Roster"
            >
              <div>
               <DoctorRoster/>
              </div>
            </Tab>
            <Tab label="Person Information" >
             <MyForm
               update={this.props.updateCurrentDoctorFields}
               onSubmit={this._submit.bind(this)}
               value={this.props.currentDoctor}
             >
               <Person subModel="Person" />
               <div className="col-md-3">

               </div>
               <div className="col-md-9">
                 <div className="row">
                   <div className="col-md-3">
                     <Checkbox name= "isenable" label= "Enable"/>
                   </div>
                   <div className="col-md-3">
                     <Text name= "timeInterval" placeholder= "Time Interval" label= "Time Interval" validate={["number"]}/>
                   </div>
                 </div>
               </div>
               <SubmitButton className="pull-right"/>
             </MyForm>
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
