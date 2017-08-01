import {toastr} from 'react-redux-toastr';

import {getRequest,postRequest,goGetRequest,goPostRequest} from './lib/request';
import * as types from './types';
import {imageToBase64,errHandler} from './lib/utils';

export function fetchClinicsFromServer(){
  return (dispatch,getState) => {
    var currentCompany = getState().currentCompany.company;
    goPostRequest("/admin/getClinics",{companyId:0}).then((res)=>{
      console.log("res = ",res);
      dispatch({type:types.FETCH_CLINIC_FROM_SERVER,payload:res.data});
    },err=>{
      console.log("err = ",err);
    });
  };
}

export function newClinic(){
    return{
      type: types.NEW_CLINIC
    }
};

export function setCurrentClinic(currentClinic){
    return{
      type: types.SET_CURRENT_CLINIC,
      payload: currentClinic
    }
};

export function	updateCurrentClinicFields(currentClinic){
	return {
		type: types.UPDATE_CURRENT_CLINIC_FIELDS,
		payload: currentClinic
	}
};


export function	saveCurrentClinic(){

  return (dispatch,getState) => {
    var currentClinic = getState().currentCompany.currentClinic;
    var saveClinic = ()=>{
      console.log('will save currentClinic = ',currentClinic);
      goPostRequest('/admin/saveClinic',currentClinic).then(res => {
          console.log('response=',res);
          if(currentClinic.clinicId){
            //dispatch({type:types.UPDATE_BOOKING_TYPE,bookingType:data});
          }else{
            //dispatch({type:types.ADD_BOOKING_TYPE,bookingType:res.data});
          }
          toastr.success('', 'Saved clinic information successfully !')
        }).catch(function (error) {
            errHandler('save clinic',error);
        });
    }

    imageToBase64(currentClinic.iconBase64).then((base64String)=>{
      currentClinic.iconBase64 = base64String;
      saveClinic();
    },(err)=>{
      saveClinic();
    });

  }
};


export function	addNewClinicBookingType(bookingType){

  return function(dispatch,getState){
    var currentClinic = getState().currentCompany.currentClinic;
    console.log('will addNewClinicBookingType = ',bookingType,currentClinic);
    if(currentClinic.clinicId){
      console.log("add bookingType to clinic");
      let addBookingType = {
                            clinicId:currentClinic.clinicId,
                            bookingTypeId:bookingType.bookingTypeId,
                            bookingTypeName:bookingType.bookingTypeName,
                          };
      goPostRequest('/admin/addClinicBookingType',addBookingType).then(res => {
          console.log('response=',res);
          toastr.success('', 'Added booking type successfully !');
          dispatch({type:types.ADD_BOOKING_TYPE_TO_CURRENT_CLINIC,payload:addBookingType});
        })
        .catch((err) => {
          errHandler('save doctor booking type',err);
        });
    }else{
      console.log("add bookingType into new clinic");
      let addBookingType = {
                            clinicId:0,
                            bookingTypeId:bookingType.bookingTypeId,
                            bookingTypeName:bookingType.bookingTypeName,
                          };

      dispatch({
    		type: types.ADD_BOOKING_TYPE_TO_CURRENT_CLINIC,
        payload: addBookingType
    	});
    }
  }
};

export function	removeClinicBookingType(bookingType){
  return function(dispatch,getState){
    var currentClinic = getState().currentCompany.currentClinic;
    console.log('will removeDoctorBookingType = ',bookingType,currentClinic);
    if(currentClinic.clinicId){
      console.log("remove bookingType from clinic");
      let removeBookingType = {
                            clinicId:currentClinic.clinicId,
                            bookingTypeId:bookingType.bookingTypeId
                          };
      goPostRequest('/admin/removeClinicBookingType',removeBookingType).then(res => {
          console.log('response=',res);
          toastr.success('', 'Removed booking type successfully !');
          dispatch({type:types.REMOVE_BOOKING_TYPE_TO_CURRENT_CLINIC,payload: removeBookingType});
        })
        .catch((err) => {
          errHandler('remove clinic booking type',err);
        });
    }else{
      console.log("remove bookingType into new doctor");
      let removeBookingType = {
                            clinicId:currentClinic.clinicId,
                            bookingTypeId:bookingType.bookingTypeId
                          };

      dispatch({
        type: types.REMOVE_BOOKING_TYPE_TO_CURRENT_CLINIC,
        payload: removeBookingType
      });
    }
  }
};

export function	addNewClinicDoctor(doctor){
  return function(dispatch,getState){
    var currentClinic = getState().currentCompany.currentClinic;
    console.log('will addDoctorClinic = ',doctor,currentClinic);
    if(currentClinic.clinicId){
      console.log("add doctor into  clinic");
      let addDoctor = {
                        clinicId:currentClinic.clinicId,
                        doctorId:doctor.doctorId,
                        title: doctor.title,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                      };
      goPostRequest('/admin/addDoctorClinic',addDoctor).then(res => {
          console.log('=====>response=',res);
            toastr.success('', 'Added clinic successfully !');
            dispatch({type:types.ADD_DOCTOR_TO_CURRENT_CLINIC,payload:addDoctor});
        })
        .catch((err) => {
          errHandler('save doctor clinic',err);
        });
    }else{
      console.log("add doctor into new clinic");
      let addDoctor = {
                        clinicId:0,
                        doctorId:doctor.doctorId,
                        title: doctor.title,
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                      };

      dispatch({
    		type: types.ADD_DOCTOR_TO_CURRENT_CLINIC,
        payload: addDoctor
    	});
    }
  }
};

export function	removeClinicDoctor(doctor){
  return function(dispatch,getState){
    var currentClinic = getState().currentCompany.currentClinic;
    console.log('will removeDoctorClinic = ',doctor,currentClinic);
    if(currentClinic.clinicId){
      console.log("update doctor into new clinic");
      let removeDoctor = {
                            clinicId:currentClinic.clinicId,
                            doctorId:doctor.doctorId
                          };
      goPostRequest('/admin/removeDoctorClinic',removeDoctor).then(res => {
          console.log('=====>response=',res);
          toastr.success('', 'Removed clinic successfully !');
          dispatch({type:types.REMOVE_DOCTOR_TO_CURRENT_CLINIC,payload: removeDoctor});
        })
        .catch((err) => {
          errHandler('remove doctor clinic ',err);
        });
    }else{
      console.log("remove doctor into new clinic");
      let removeDoctor = {
                            clinicId:currentClinic.clinicId,
                            doctorId:doctor.doctorId
                          };
      return {
    		type: types.REMOVE_DOCTOR_TO_CURRENT_CLINIC,
        bookingType: removeDoctor
    	}
    }
  }
};
