import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';
import clone from 'clone';

import apiUrl from './lib/url';
import * as types from './types';
import {getRequest,postRequest,goGetRequest,goPostRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';
import {imageToBase64,errHandler} from './lib/utils';

export function fetchDoctorsFromServer(){
  return (dispatch,getState) => {
    var currentCompany = getState().currentCompany.company;
    goPostRequest("/admin/getDoctors",{companyId:0}).then((res)=>{
      console.log("res = ",res);
      dispatch({type:types.FETCH_DOCTOR_FROM_SERVER,payload:res.data});
    },err=>{
      console.log("err = ",err);
    });
  };
}

export function newDoctor(){
    browserHistory.push('/Home/Doctor');
    return{
      type: types.NEW_DOCTOR
    }
};

export function setCurrentDoctor(currentDoctor){
    var doctorObject = clone(currentDoctor)

    return function(dispatch){
      dispatch({type: types.SET_CURRENT_DOCTOR,payload: doctorObject});
      browserHistory.push('/Home/Doctor');
    }

};

export function	updateCurrentDoctorFields(currentDoctor){
	return {
		type: types.UPDATE_CURRENT_DOCTOR_FIELDS,
		payload: currentDoctor,
	}
};

export function	saveCurrentDoctor(){
  return (dispatch,getState) => {
    var currentDoctor = getState().currentCompany.currentDoctor;

    var saveDoctor = ()=>{
      console.log('will save currentDoctor = ',currentDoctor);
      goPostRequest('/admin/saveDoctor',currentDoctor).then(res => {
          console.log('response=',res);
          if(currentDoctor.doctorId){
            //dispatch({type:types.UPDATE_BOOKING_TYPE,bookingType:data});
          }else{
            //dispatch({type:types.ADD_BOOKING_TYPE,bookingType:res.data});
          }
          toastr.success('', 'Saved doctor information successfully !')
        },err=>{
          errHandler('save doctor',err);
        });
    }

   currentDoctor.timeInterval = Number(currentDoctor.timeInterval);

   imageToBase64(currentDoctor.avatar).then((base64String)=>{
     currentDoctor.iconBase64 = base64String;
     saveDoctor();
   },(err)=>{
     saveDoctor();
   });
  }
};

export function	addNewDoctorBookingType(bookingType){

  return function(dispatch,getState){
    var currentDoctor = getState().currentCompany.currentDoctor;
    console.log('will addNewDoctorBookingType = ',bookingType,currentDoctor);
    if(currentDoctor.doctorId){
      console.log("update bookingType into new doctor");
      let addBookingType = {
                            doctorId:currentDoctor.doctorId,
                            bookingTypeId:bookingType.bookingTypeId,
                            bookingTypeName:bookingType.bookingTypeName,
                          };
      goPostRequest('/admin/addDoctorBookingType',addBookingType).then(res => {
          console.log('response=',res);
          toastr.success('', 'Added booking type successfully !');
          dispatch({type:types.ADD_BOOKING_TYPE_OF_DOCTOR,payload:addBookingType});
        })
        .catch((err) => {
          errHandler('save doctor booking type',err);
        });
    }else{
      console.log("add bookingType into new doctor");
      let addBookingType = {
                            doctorId:0,
                            bookingTypeId:bookingType.bookingTypeId,
                            bookingTypeName:bookingType.bookingTypeName,
                          };

      dispatch({
        type: types.ADD_BOOKING_TYPE_OF_DOCTOR,
        payload: addBookingType
      });
    }
  }

};

export function	removeDoctorBookingType(bookingType){
  return function(dispatch,getState){
    var currentDoctor = getState().currentCompany.currentDoctor;
    console.log('will removeDoctorBookingType = ',bookingType,currentDoctor);
    if(currentDoctor.doctorId){
      console.log("update bookingType into new doctor");
      let removeBookingType = {
                            doctorId:currentDoctor.doctorId,
                            bookingTypeId:bookingType.bookingTypeId
                          };
      goPostRequest('/admin/removeDoctorBookingType',removeBookingType).then(res => {
          console.log('response=',res);
          toastr.success('', 'Removed booking type successfully !');
          dispatch({type:types.REMOVE_BOOKING_TYPE_OF_DOCTOR,payload: removeBookingType});
        })
        .catch((err) => {
          errHandler('remove doctor booking type',err);
        });
    }else{
      console.log("add bookingType into new doctor");
      let removeBookingType = {
                            doctorId:currentDoctor.doctorId,
                            bookingTypeId:bookingType.bookingTypeId
                          };

      dispatch({
        type: types.REMOVE_BOOKING_TYPE_OF_DOCTOR,
        payload: removeBookingType
      });
    }
  }
};

export function	addDoctorClinic(clinic){
  return function(dispatch,getState){
    var currentDoctor = getState().currentCompany.currentDoctor;
    console.log('will addDoctorClinic = ',clinic,currentDoctor);
    if(currentDoctor.doctorId){
      console.log("update doctor into new clinic");
      let addDoctor = {
                        clinicId:clinic.clinicId,
                        clinicName: clinic.clinicName,
                        doctorId:currentDoctor.doctorId,
                      };
      goPostRequest('/admin/addDoctorClinic',addDoctor).then(res => {
          console.log('=====>response=',res);
            toastr.success('', 'Added clinic successfully !');
            dispatch({type:types.ADD_CLINIC_OF_DOCTOR,payload:addDoctor});
        })
        .catch((err) => {
          errHandler('save doctor clinic',err);
        });
    }else{
      console.log("add doctor into new clinic");
      let addDoctor = {
                      clinicId:clinic.clinicId,
                      clinicName: clinic.clinicName,
                      doctorId:currentDoctor.doctorId,
                      };

      dispatch({
    		type: types.ADD_CLINIC_OF_DOCTOR,
        payload: addDoctor
    	});
    }
  }
};

export function	removeDoctorClinic(clinic){
  return function(dispatch,getState){
    var currentDoctor = getState().currentCompany.currentDoctor;
    console.log('will removeDoctorClinic = ',clinic,currentDoctor);
    if(currentDoctor.doctorId){
      console.log("update doctor into new clinic");
      let removeClinic = {
                            doctorId:currentDoctor.doctorId,
                            clinicId:clinic.clinicId
                          };
      goPostRequest('/admin/removeDoctorClinic',removeClinic).then(res => {
          console.log('=====>response=',res);
          toastr.success('', 'Removed clinic successfully !');
          dispatch({type:types.REMOVE_CLINIC_OF_DOCTOR,payload: removeClinic});
        })
        .catch((err) => {
          errHandler('remove doctor clinic ',err);
        });
    }else{
      console.log("add doctor into new clinic");
      let removeClinic = {
                            doctorId:currentDoctor.doctorId,
                            clinicId:clinic.clinicId
                          };

      dispatch({
    		type: types.REMOVE_CLINIC_OF_DOCTOR,
        payload: removeClinic
    	});
    }
  }
};

export function uploadPhotoDoctor(currentDoctor){
  console.log('uploadPhotoDoctor.currentDoctor = ',currentDoctor);
  //currentDoctor.Person.avatar.append('container','doctorAvatar');
  var fd = new FormData();
  fd.append('file',currentDoctor.Person.avatar);
  fd.append('firstName',currentDoctor.Person.firstName);
  fd.append('lastName',currentDoctor.Person.lastName);
  //  '/CContainers/avatar/upload'   '/CFiles/upload'
  //params: {container: 'doctorAvatar'},

  postRequest('/Files/upload',fd,{container: 'doctorAvatar'})
    .then(succ => {
        console.log('uploadfile = ',succ);
    })
    .catch(err => {
        console.log('uploadfile = ',err);
    });
}
