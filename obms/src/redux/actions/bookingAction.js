import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {getRequest,postRequest,goPostRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';
import {errHandler} from './lib/utils';

export function	fetchBookingsForBookingModule(doctorId){
  var req = postRequest('/CCompanies/listBookings');
  return {
    type: types.FETCH_BOOKINGS_FOR_BOOKING,
    payload: req
  };
};

export function	fetchDoctorsForBookingModule(doctorId){
  return (dispatch,getState) =>{

    goPostRequest('/admin/getDoctorsWithRosters').then(res=>{
      console.log(" =====> res = ",res);
      dispatch({
        type: types.FETCH_DOCTORS_FOR_BOOKING,
        payload: res.data
      });

    },err=>{
      errHandler("fetch doctor and rosters from server",err)
    });
  }
};

export function	fetchAppointments(rosterIds){
  return (dispatch,getState) =>{
    return new Promise((resolve,reject)=>{
      goPostRequest('/admin/getPatientAppointmentBasedOnRosters',rosterIds).then(res=>{
        console.log(" =====>/admin/getPatientAppointmentBasedOnRosters res = ",res);
        dispatch({
          type: types.FETCH_BOOKINGS_FOR_BOOKING,
          payload: res.data
        });
        resolve(res.data)
      },err=>{
        //console.log("err = ",err);
        errHandler("get appointments from server ",err)
        reject(err)
      });
    });
  }
};

export function	updateFieldForCurrentBooking(field){
  return {
    type: types.UPDATE_FIELDS_FOR_CURRENT_BOOKING,
    field
  };
};

export function	addTimeForNewApptForBookingModule(bookingTime){
  return {
    type: types.ADD_TIME_FOR_NEW_APPT_FOR_BOOKING,
    payload: bookingTime
  };
};

export function	addPatientForNewApptForBookingModule(patient,cb){
  console.log('addPatientForNewApptForBookingModule is running.....');
  return function(dispatch,getState){
    dispatch({
      type: types.ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING,
      payload: patient
    });
  };
};

export function	addApptForBookingModule(cb){
  return function(dispatch,getState){
    return new Promise((resolve,reject)=>{
      let newAppt = getState().booking.newAppt;
      console.log("will make appointment for the patient with apptInfo = ",newAppt);

      var apptObject = {
        fromTime: newAppt.calendar.fromTimeInMoment,
        toTime: newAppt.calendar.toTimeInMoment,
        resourceId: newAppt.calendar.resourceId,
        rosterId: newAppt.calendar.rosterId,
        patientId: newAppt.patient.patientId,
        personId: newAppt.patient.personId,
      };

      goPostRequest('/admin/adminMakeAppointment',apptObject).then(res => {
          console.log('==================>/admin/makeAppointment   response=',res);
          toastr.success('', 'Saved company information successfully !');
          resolve(res.data);
        }).catch((err) => {
          console.log('===================>err=',err);
          errHandler("add a new appointment ",err)
          reject(err);
        });
    });
  };
};

export function	updateApptForBookingModule(event){
  return function(dispatch,getState){
    return new Promise((resolve,reject)=>{
      //
      var apptObject = {
        fromTime: event.event.fromTimeInMoment,
        toTime: event.event.toTimeInMoment,
        resourceId: event.event.resourceId,
        rosterId: event.event.rosterId,
        patientId: event.event.patientId,
        personId: event.event.personId,
        eventId: event.event.eventId,
        apptId: event.event.eventId,
        description: event.event.description,
      };

      goPostRequest('/admin/adminUpdateAppointment',apptObject).then(res => {
          console.log('==================>/admin/makeAppointment   response=',res);
          toastr.success('', 'Saved company information successfully !');
          resolve(res.data);
        }).catch((err) => {
          console.log('===================>err=',err);
          errHandler("update the appointment ",err)
          reject(err);

        });
    });
  };
};



export function	rosterGeneration(currentRoster){
  var fromDate = moment(currentRoster.start,'YYYY-MM-DD HH:mm:ss');
  var toDate = moment(currentRoster.end,'YYYY-MM-DD HH:mm:ss');
  var def = {
          "rosterId": currentRoster.rosterId,
    			"doctorId": currentRoster.doctorId,
    			"workingSiteId": currentRoster.workingSiteId,
    			"bookingTypeId": currentRoster.bookingTypeId,
    			"timeInterval": currentRoster.timeInterval,
    			"fromTime": fromDate.format('HH:mm'),
    			"toTime": toDate.format('HH:mm'),
    			"fromDate": fromDate.format('YYYY-MM-DD'),
    			"toDate": toDate.format('YYYY-MM-DD'),
    			"repeatType": currentRoster.repeatType
        };
  console.log('will generate roster currentRoster = ',def);
	return function(dispatch){
    postRequest('/CCompanies/generateRoster',def)
      .then(res => {
        console.log('response=',res);
        //after generate, fetch roster again to display on the calendar
        dispatch({type:types.FETCH_ROSTER_OF_DOCTOR, payload:res});
        toastr.success('', 'Generate roster successfully !')
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to generate roster (' + err + ')')
      });
  }
};
