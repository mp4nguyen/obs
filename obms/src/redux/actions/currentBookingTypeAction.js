import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';
import clone from 'clone';

import * as types from './types';
import {getRequest,postRequest} from './lib/request';

export function setCurrentBookingType(currentBookingType){
    var bookingTypeObject = clone(currentBookingType)
    return function(dispatch){
      dispatch({type: types.SET_CURRENT_BOOKING_TYPE,currentBookingType: bookingTypeObject});
      browserHistory.push('/Home/BookingTypeDetail');
    }
};

export function	updateCurrentBookingTypeFields(currentBookingType){
	return {
		type: types.UPDATE_CURRENT_BOOKING_TYPE_FIELDS,
		currentBookingType
	}
};

export function	saveCurrentBookingType(currentBookingType){
  //let doctorObject = clone(currentDoctor);
  console.log('will save currentBookingType = ',currentBookingType);

	return function(dispatch){
    postRequest('/CCompanies/saveBookingType',currentBookingType)
      .then(res => {
        console.log('response=',res);
        if(res.data.bookingType == "updated successfully"){
          //update doctor
          dispatch({type:types.UPDATE_BOOKING_TYPE,bookingType:currentBookingType});
        }else{
          //new doctor return
          dispatch({type:types.ADD_BOOKING_TYPE,bookingType:res.data.bookingType});
        }

        toastr.success('', 'Saved company information successfully !')
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to save company information (' + err + ')')
      });
  }
};
