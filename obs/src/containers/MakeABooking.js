import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Text from '../uiComponents/Text';
import Date from '../uiComponents/Date';
import MyDateInput from '../uiComponents/MyDateInput';
import SubmitButton from '../uiComponents/SubmitButton';
import Form from '../uiComponents/Form';

import * as actions from '../redux/actions';
import SelectPractitioner from '../Components/SelectPractitioner';


class MakeABooking extends Component{

	static contextTypes = {
		router: React.PropTypes.object
	};

	constructor(props,context){
		super(props,context);

	}

  _fieldOnChange(fieldName,e,date){
    var object = {};
    console.log('onchange = ',fieldName,e,date);

    if(e){
      object[fieldName] = {value: e.target.value};
    }else if(date){
      object[fieldName] = {value: moment(date).format('DD/MM/YYYY')};
    }

    this.props.setPatientForCurrentBooking(object);
  }

	_submit(){
		//this.props.loadClinicsFromServer(this.props.currentPractitioner.bookingTypeId);
    console.log('Submit....');
		this.props.submitCurrentBooking(this.props.currentBooking);
		//this.context.router.push('/Clinics');
	}

	render(){

    //var defaultDate = moment('01/01/1990','DD/MM/YYYY');


		return (
					  <div >
					    <section id="home" className="divider  "  >
					      <div className="container">
					            <div className="row">
					              <div className="col-md-3">
					              </div>
					              <div className="col-md-6">
					                <div className=" border-1px p-25">
					                  <h2>Booking summary:</h2>
					                  <h3>Booking for {this.props.currentBooking.calendarTimeInStr} {this.props.currentBooking.calendarDateInStr}</h3>
					                  <h3>at {this.props.currentBooking.clinicName} {this.props.currentBooking.address} {this.props.currentBooking.ward} {this.props.currentBooking.suburbDistrict} {this.props.currentBooking.stateProvince}</h3>
					                  <h4 className="text-theme-colored text-uppercase m-0">Patient Details</h4>
					                  <div className="line-bottom mb-30"></div>
														<Form
															update={this.props.setPatientForCurrentBooking}
															onSubmit={this._submit.bind(this)}
															value={this.props.currentBooking}
														>
															<Text
																name= "patientFirstName"
														    placeholder= "First name"
														    label= "First name *"
																validate={["required"]}
															/>
															<Text
																name= "patientLastName"
														    placeholder= "Last name"
														    label= "Last name *"
																validate={["required"]}
															/>
															<MyDateInput
																name= "patientDOB"
																placeholder= "DD"
																label= "DOB *  DD"
															/>
															<Text
																name= "patientReason"
														    placeholder= "Reason for Appointment"
														    label= "Reason for Appointment"
															/>
															<h4 className="text-theme-colored text-uppercase m-0">Contact Information</h4>
						                  <div className="line-bottom mb-30"></div>
															<Text
																name= "patientMobile"
														    placeholder= "Mobile number"
														    label= "Mobile number *"
																validate={["phone","required"]}
															/>
															<Text
																name= "patientEmail"
														    placeholder= "Email"
														    label= "Email *"
																validate={["email","required"]}
															/>
															<SubmitButton/>
														</Form>

					                  <br/>
					                  <div  className="span7 text-center">
					                    <FlatButton
					                      label="Book Now"
					                      primary={true}
					                      onClick={this._submit.bind(this)}
					                    />
					                  </div>

					                </div>
					              </div>
					            </div>
					      </div>
					    </section>
					  </div>
					)
	}
}

function mapStateToProps(state){
	return state;
}

/*<DatePicker
	hintText="Date of Birth"
	floatingLabelText="Date of Birth *"
	fullWidth={true}
	minDate={minDate}
	maxDate={maxDate}
	formatDate={ new DateTimeFormat('en-AU', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			}).format
	}
	onChange={this._fieldOnChange.bind(this,"patientDOB")}
/>*/

export default connect(mapStateToProps,actions)(MakeABooking);
