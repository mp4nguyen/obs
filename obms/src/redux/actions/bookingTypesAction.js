import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';
import clone from 'clone';

import * as types from './types';
import {goGetRequest,goPostRequest} from './lib/request';
import {imageToBase64} from './lib/utils';


export function fetchBookingTypesFromServer(){
  goGetRequest('/admin/getBookingTypes').then(response => {
      console.log('______________userAction.login.listBookingTypes =',response);
      dispatch({type: types.FETCH_BOOKING_TYPES_FROM_SERVER,payload:response.data});
    })
    .catch(err => {

    });
}

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



export function saveCurrentBookingType(currentBookingType){
  console.log('will save currentBookingType = ',currentBookingType);
  return dispatch => new Promise((resolve) => {
      var base64String

      var saveBT = (data) =>{
        console.log("Will call api /admin/saveBookingType with data = ",data);
        goPostRequest('/admin/saveBookingType',data).then(res => {
            console.log('response=',res);
            if(data.bookingTypeId){
              dispatch({type:types.UPDATE_BOOKING_TYPE,bookingType:data});
            }else{
              dispatch({type:types.ADD_BOOKING_TYPE,bookingType:res.data});
            }

            toastr.success('', 'Saved company information successfully !')
          })
          .catch(function (error) {

             if (error.response) {
               toastr.error('Fail to save company information (' + error.response.data + ')')
              //  console.log(error.response.data);
              //  console.log(error.response.status);
              //  console.log(error.response.headers);
             } else {
               toastr.error('Fail to save company information (' + error.message + ')')
               console.log('Error', error.message);
             }
             console.log(error.config);
           });
      }

      imageToBase64(currentBookingType.icon).then((base64String)=>{
        currentBookingType.icon = base64String;
        saveBT(currentBookingType);
      },(err)=>{
        //currentBookingType.icon = "";
        console.log(" convert Image to base64String err = ",err);
        saveBT(currentBookingType);
      })


      //   // postRequest2('/api/v1/submitMoles',body,config).then(res=>{
      //   //   console.log("/api/v1/submitMoles = ",res);
      //   //
      //   //   dispatch({
      //   //     type: ADD_APPOINTMENT,
      //   //     payload:res
      //   //   });
      //   //
      //   //   dispatch({
      //   //     type: ADD_APPOINTMENT_TO_MEMBER,
      //   //     payload:res
      //   //   });
      //   //
      //   //   resolve();
      //   // });
  });
}
