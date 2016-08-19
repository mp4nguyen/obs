import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {getRequest,postRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';


export function	fetchBookingsForBookingModule(doctorId){
  var req = postRequest('/CCompanies/listBookings');
  return {
    type: types.FETCH_BOOKINGS_FOR_BOOKING,
    payload: req
  };
};

export function	fetchDoctorsForBookingModule(doctorId){
  var req = postRequest('/CCompanies/listDoctors');
  return {
    type: types.FETCH_DOCTORS_FOR_BOOKING,
    payload: req
  };
};

export function	updateFieldForCurrentBooking(field){
  return {
    type: types.UPDATE_FIELDS_FOR_CURRENT_BOOKING,
    field
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
