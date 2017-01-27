import  * as types from './types';
import store from '../store';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
let apiUrl = 'https://localhost:3001';//'https://192.168.36.56:3001'

import {mySqlDateToMoment} from '../lib/mySqlDate';

export function logInAsGuest(){
	const request = axios.post(apiUrl + '/api/BUsers/login',{username:'GUEST',password:'1234'});
	return {
		type: types.LOG_IN_AS_GUEST,
		payload: request
	};
}

export function otherUsersReserveAppt(calendar){
	return {
		type: types.OTHER_USERS_RESERVE_APPT,
		calendar
	};
}

export function	loadPractitionerFromServer(){
	//socket.emit('msg', { user: 'me', msg: 'loadPractitionerFromServer' });
	//const request = axios.get('https://0.0.0.0:3001/api/BBookingTypes');
	const request = axios.get(apiUrl + '/api/BBookingTypes');
	return {
		type: types.LOAD_PRACTITIONER_FROM_SERVER,
		payload: request
	}
}

export function	selectPractitioner(practitioner){
	//socket.emit('msg', { user: 'me', msg: 'selectPractitioner' });
	return {
		type: types.SELECT_PRACTITIONER,
		practitioner: practitioner
	}
};

export function	loadClinicsFromServer(pBookingTypeId){
	//socket.emit('msg', { user: 'me', msg: 'loadClinicsFromServer' });
	const request = axios.post(apiUrl + '/api/BClinics/filterClinic',{bookingTypeId:pBookingTypeId,time:'Today',long:1,lat:1});
	return (dispatch)=>{
		request.then(({data})=>{
			console.log('data =',data);
			//dispatch({type:types.LOAD_CLINICS_FROM_SERVER, payload: data});
			dispatch({type:types.INITIAL_TIME, payload: data});
		});
	};
/*	return {
		type: types.LOAD_CLINICS_FROM_SERVER,
		payload: request
	}*/
};

export function	mouseEnterClinic(clinicIndex,clinic){

	return {
		type: types.MOUSE_ENTER_CLINIC,
		clinicIndex,
		clinic
	}
};

export function	mouseLeaveClinic(clinicIndex,clinic){

	return {
		type: types.MOUSE_LEAVE_CLINIC,
		clinicIndex,
		clinic
	}
};

export function	selectClinic(clinic){
	return {
		type: types.SELECT_CLINIC,
		clinic
	}
};

export function	initialTime(pBookingTypeId){
	const request = axios.post(apiUrl + '/api/BClinics/filterClinic',{bookingTypeId:pBookingTypeId,time:'Today',long:1,lat:1});

	return {
		type: types.INITIAL_TIME,
		payload: request
	}
};

export function	selectTime(time){
	//socket.emit('msg', { user: 'me', msg: 'selectTime' });
	return {
		type: types.SELECT_TIME,
		time
	}
};

export function	datePickerOnSelect(date){
	return {
		type: types.DATEPICKER_ON_SELECT,
		date
	}
};

export function	openDatePickerDialog(){
	return {
		type: types.OPEN_DATEPICKER_DIALOG
	}
};

export function	closeDatePickerDialog(date,pBookingTypeId){
      console.log('closeDatePickerDialog = ',date,pBookingTypeId);
      let ptoday = moment().format('DD/MM/YYYY');
      let ptomorrow = moment().add(1,'d').format('DD/MM/YYYY');

			return ((dispatch)=>{
				if(date == ptoday){
					console.log('closeDatePickerDialog today running');
					dispatch({type: types.CLOSE_DATEPICKER_DIALOG,date});
					dispatch({type :types.SELECT_TIME, time: {name:'Today'}});
	      }else if(date == ptomorrow){
					console.log('closeDatePickerDialog ptomorrow running');
					dispatch({type: types.CLOSE_DATEPICKER_DIALOG,date});
					dispatch({type :types.SELECT_TIME, time: {name:'Tomorrow'}});
	      }else{
					console.log('closeDatePickerDialog other day running');
	        //otherwise, have to connect to the server to get the data of the seleted date
					axios.post(apiUrl + '/api/BClinics/filterClinic',{bookingTypeId:pBookingTypeId,time:date,long:1,lat:1})
						.then(data=>{
							console.log(data);
							dispatch({type: types.CLOSE_DATEPICKER_DIALOG,date});
							dispatch({type: types.LOAD_CLINICS_FROM_SERVER,payload: data,date});
						})
						.catch(err=>{
							console.log(err);
						});

	      }
			});
      //return {type: types.CLOSE_DATEPICKER_DIALOG,date}
};

export function	setCalendarForCurrentBooking(calendar,clinic){
	//socket.emit('APPOINTMENT_RESERVE', { user: 'me', msg: 'setCalendarForCurrentBooking',calendar });
	return {
		type: types.CURRENT_BOOKING_SET_CALENDAR,
		calendar,
		clinic
	}
};

export function	setPatientForCurrentBooking(patient){
	return {
		type: types.CURRENT_BOOKING_SET_PATIENT,
		patient
	}
};

export function	submitCurrentBooking(currentBooking){

	var apptTime = currentBooking.calendarDateInStr+' '+currentBooking.calendarTimeInStr;
	console.log('submit currentBooking = ',apptTime,moment(apptTime,'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss'));

	var bookingObject = {
		"apptId": 0,
    "firstName": currentBooking.patientFirstName,
    "lastName": currentBooking.patientLastName,
    "dob": currentBooking.patientDOB,
    "reason": currentBooking.patientReason,
    "mobile": currentBooking.patientMobile,
    "email": currentBooking.patientEmail,
    "companyId": currentBooking.companyId,
    "clinicId": currentBooking.clinicId,
    "bookingTypeId": currentBooking.bookingTypeId,
    "doctorId": currentBooking.doctorId,
    "personId": currentBooking.personId,
    "rosterId": currentBooking.rosterId,
    "calendarId": currentBooking.calendarId,
    "appointmentTime": moment(apptTime,'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss'),
		"fromTime": mySqlDateToMoment(currentBooking.fromTime).format('YYYY-MM-DD HH:mm:ss'),
		"toTime": mySqlDateToMoment(currentBooking.toTime).format('YYYY-MM-DD HH:mm:ss'),
		"duration": currentBooking.timeInterval,
    "source": "string"
	};
	console.log('will make the booking = ',bookingObject);

	const request = axios.post(apiUrl + '/api/BAppointments',bookingObject);
	return {
		type: types.CURRENT_BOOKING_SUBMIT,
		payload: request
	}

};
