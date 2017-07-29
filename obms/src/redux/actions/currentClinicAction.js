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
      console.log("update bookingType into new clinic");
      let addBookingType = {
                            clinicId:currentClinic.clinicId,
                            bookingTypeId:bookingType.bookingTypeId,
                            bookingTypeName:bookingType.bookingTypeName,
                            isenable:bookingType.isenable
                          };
      postRequest('/ClinicCtrls/addClinicBookingType',addBookingType).then(res => {
          console.log('response=',res);
          if(res.data.bookingType){
            toastr.success('', 'Saved booking type successfully !');
            dispatch({type:types.ADD_BOOKING_TYPE_TO_CURRENT_CLINIC,bookingType:addBookingType});
          }
        })
        .catch((err) => {
          console.log('err=',err);
          toastr.error('Fail to save booking type (' + err + ')')
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

export function	removeClinicBookingType(currentClinic,bookingType){
  //let doctorObject = clone(currentDoctor);
  console.log('will removeClinicBookingType = ',currentClinic,bookingType);
  if(currentClinic.clinicId){
    //remove bookingType from the existing doctor
    let removeBookingType = {
                          clinicId:currentClinic.clinicId,
                          bookingTypeId:bookingType.bookingTypeId
                        };
    return function(dispatch){
      postRequest('/ClinicCtrls/removeClinicBookingType',removeBookingType)
        .then(res => {
          console.log('response=',res);
          if(res.data.bookingType.count ==1){
            toastr.success('', 'Removed booking type successfully !');
            dispatch({type:types.REMOVE_BOOKING_TYPE_TO_CURRENT_CLINIC,bookingType:removeBookingType});
          }

        })
        .catch((err) => {
          console.log('err=',err);
          toastr.error('Fail to remove booking type (' + err + ')')
        });
    }
  }else{
    //remove bookingType from the new doctor
    let removeBookingType = {
                          clinicId:currentClinic.clinicId,
                          bookingTypeId:bookingType.bookingTypeId
                        };
    return {
  		type: types.REMOVE_BOOKING_TYPE_TO_CURRENT_CLINIC,
      bookingType: removeBookingType
  	}
  }

};

export function	addNewClinicDoctor(doctor){
  return function(dispatch,getState){
    var currentClinic = getState().currentCompany.currentClinic;
    console.log('will addNewClinicBookingType = ',doctor,currentClinic);
    if(currentClinic.clinicId){
      console.log("update doctor into new clinic");
      let addDoctor = {
                        clinicId:currentClinic.clinicId,
                        doctorId:doctor.doctorId,
                        fullName:doctor.Person.firstName+' '+doctor.Person.lastName
                      };
      postRequest('/ClinicCtrls/addClinicDoctor',addDoctor).then(res => {
          console.log('=====>response=',res);
          if(res.data.doctor){
            toastr.success('', 'Saved booking type successfully !');
            dispatch({type:types.ADD_DOCTOR_TO_CURRENT_CLINIC,doctor:addDoctor});
          }
        })
        .catch((err) => {
          console.log('err=',err);
          toastr.error('Fail to save booking type (' + err + ')')
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
  //////////////////////
};

export function	removeClinicDoctor(currentClinic,doctor){
  //let doctorObject = clone(currentDoctor);
  console.log('will removeClinicDoctor = ',currentClinic,doctor);
  if(currentClinic.clinicId){
    //remove bookingType from the existing doctor
    let removeDoctor = {
                          clinicId:currentClinic.clinicId,
                          doctorId:doctor.doctorId
                        };
    return function(dispatch){
      postRequest('/ClinicCtrls/removeClinicDoctor',removeDoctor)
        .then(res => {
          console.log('==========>response=',res);
          if(res.data.doctor.count ==1){
            toastr.success('', 'Removed booking type successfully !');
            dispatch({type:types.REMOVE_DOCTOR_TO_CURRENT_CLINIC,doctor:removeDoctor});
          }

        })
        .catch((err) => {
          console.log('err=',err);
          toastr.error('Fail to remove booking type (' + err + ')')
        });
    }
  }else{
    //remove bookingType from the new doctor
    let removeDoctor = {
                          clinicId:currentClinic.clinicId,
                          doctorId:doctor.doctorId
                        };
    return {
  		type: types.REMOVE_DOCTOR_TO_CURRENT_CLINIC,
      bookingType: removeDoctor
  	}
  }

};
