import {getRequest,postRequest,goGetRequest,goPostRequest} from './lib/request';
import * as types from './types';
import {toastr} from 'react-redux-toastr';

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


export function	saveCurrentClinic(companyId,currentClinic){

  console.log('will save currentClinic = ',currentClinic);
  currentClinic.companyId = companyId;
	return function(dispatch){
    postRequest('/ClinicCtrls/saveClinic',currentClinic)
      .then(res => {
        console.log('response=',res);
        if(res.data.clinic == "updated successfully"){
          //update doctor
          dispatch({type:types.UPDATE_CLINIC_TO_CURRENT_COMPANY,clinic:currentClinic});
        }else{
          //new doctor return
          dispatch({type:types.SAVE_CURRENT_CLINIC,payload:res.data.clinic});
          dispatch({type:types.ADD_CLINIC_TO_CURRENT_COMPANY,clinic:res.data.clinic});
        }

        toastr.success('', 'Saved clinic information successfully !')
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to save clinic information (' + err + ')')
      });
  }
};


export function	addNewClinicBookingType(currentClinic,bookingType){
  //let doctorObject = clone(currentDoctor);
  console.log('will addNewClinicBookingType = ',currentClinic,bookingType);

  if(currentClinic.clinicId){
    //add new bookingType into the existing doctor
    let addBookingType = {
                          clinicId:currentClinic.clinicId,
                          bookingTypeId:bookingType.bookingTypeId,
                          bookingTypeName:bookingType.bookingTypeName,
                          isenable:bookingType.isenable
                        };

    return function(dispatch){
      postRequest('/ClinicCtrls/addClinicBookingType',addBookingType)
        .then(res => {
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
    }
  }else{
    //add new bookingType into the new doctor
    let addBookingType = {
                          clinicId:0,
                          bookingTypeId:bookingType.bookingTypeId,
                          bookingTypeName:bookingType.bookingTypeName,
                          isenable:bookingType.isenable
                        };

    return {
  		type: types.ADD_BOOKING_TYPE_TO_CURRENT_CLINIC,
      bookingType: addBookingType
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

export function	addNewClinicDoctor(currentClinic,doctor){
  //let doctorObject = clone(currentDoctor);
  console.log('will addNewClinicDoctor = ',currentClinic,doctor);

  if(currentClinic.clinicId){
    //add new bookingType into the existing doctor
    let addDoctor = {
                          clinicId:currentClinic.clinicId,
                          doctorId:doctor.doctorId,
                          fullName:doctor.Person.firstName+' '+doctor.Person.lastName
                        };

    return function(dispatch){
      postRequest('/ClinicCtrls/addClinicDoctor',addDoctor)
        .then(res => {
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
    }
  }else{
    //add new bookingType into the new doctor
    let addDoctor = {
                          clinicId:0,
                          doctorId:doctor.doctorId,
                          fullName:doctor.Person.firstName+' '+doctor.Person.lastName
                        };

    return {
  		type: types.ADD_DOCTOR_TO_CURRENT_CLINIC,
      doctor: addDoctor
  	}
  }

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
