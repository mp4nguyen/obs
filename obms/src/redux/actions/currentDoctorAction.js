import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';
import clone from 'clone';

import apiUrl from './lib/url';
import * as types from './types';
import {getRequest,postRequest,goGetRequest,goPostRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';

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

export function setCurrentDoctor(currentDoctor){
    var doctorObject = clone(currentDoctor)

    return function(dispatch){
      dispatch({type: types.SET_CURRENT_DOCTOR,payload: doctorObject});
      browserHistory.push('/Home/Doctor');
      // if(doctorObject.Person.Avatar){
      //   doctorObject.Person.avatarData = apiUrl(doctorObject.Person.Avatar.fileUrl);
      //   dispatch({type: types.SET_CURRENT_DOCTOR,payload: doctorObject});
      //
      // }else{
      //   dispatch({type: types.SET_CURRENT_DOCTOR,payload: doctorObject});
      //   browserHistory.push('/Home/Doctor');
      // }
    }

};

export function	updateCurrentDoctorFields(currentDoctor,subModel){
	return {
		type: types.UPDATE_CURRENT_DOCTOR_FIELDS,
    subModel,
		currentDoctor
	}
};

export function	saveCurrentDoctor(companyId,currentDoctor){
  //let doctorObject = clone(currentDoctor);
  console.log('will save currentDoctor = ',currentDoctor);
  // if(currentDoctor.Person && currentDoctor.Person.dob){
  //   currentDoctor.Person.dob = currentDoctor.Person.dob.format('YYYY-MM-DD HH:mm:ss');
  // }

  var fd = new FormData();

  // for ( var key in currentDoctor.Person ) {
  //   fd.append(key, currentDoctor.Person[key]);
  // }
  fd.append('avatar',currentDoctor.Person.avatar);

  fd.append('Person', JSON.stringify(currentDoctor.Person));
  fd.append('Account', JSON.stringify(currentDoctor.Account));
  fd.append('BookingTypes', JSON.stringify(currentDoctor.BookingTypes));
  fd.append('Clinics', JSON.stringify(currentDoctor.Clinics));
  fd.append('doctorIsenable',currentDoctor.isenable);
  fd.append('doctorTimeInterval',currentDoctor.timeInterval);
  fd.append('doctorId',currentDoctor.doctorId);
  fd.append('companyId',companyId);
  console.log('currentDoctorAction.saveCurrentDoctor  with data = ',fd);
	return function(dispatch){
    postRequest('/CDoctors/save',fd,{container: 'doctorAvatar'})
      .then(res => {
        console.log('response=',res);
        if(res.data.doctor.msg == "updated successfully"){
          //update doctor
          dispatch({type:types.UPDATE_DOCTOR_TO_CURRENT_COMPANY,doctor:currentDoctor});
        }else{
          //new doctor return
          dispatch({type:types.SAVE_CURRENT_DOCTOR,payload:res.data.doctor});
          dispatch({type:types.ADD_DOCTOR_TO_CURRENT_COMPANY,doctor:res.data.doctor});
        }

        toastr.success('', 'Saved company information successfully !')
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to save company information (' + err + ')')
      });
  }
};

export function	addNewDoctorBookingType(currentDoctor,bookingType){
  //let doctorObject = clone(currentDoctor);
  console.log('will addNewDoctorBookingType = ',currentDoctor,bookingType);

  if(currentDoctor.doctorId){
    //add new bookingType into the existing doctor
    let addBookingType = {
                          doctorId:currentDoctor.doctorId,
                          bookingTypeId:bookingType.bookingTypeId,
                          bookingTypeName:bookingType.bookingTypeName,
                          isenable:bookingType.isenable
                        };

    return function(dispatch){
      postRequest('/CDoctors/addBookingType',addBookingType)
        .then(res => {
          console.log('response=',res);
          if(res.data.bookingType){
            toastr.success('', 'Saved booking type successfully !');
            dispatch({type:types.ADD_BOOKING_TYPE_OF_DOCTOR,payload:addBookingType});
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
                          doctorId:0,
                          bookingTypeId:bookingType.bookingTypeId,
                          bookingTypeName:bookingType.bookingTypeName,
                          isenable:bookingType.isenable
                        };

    return {
  		type: types.ADD_BOOKING_TYPE_OF_DOCTOR,
      payload: addBookingType
  	}
  }


};

export function	removeDoctorBookingType(currentDoctor,bookingType){
  //let doctorObject = clone(currentDoctor);
  console.log('will removeDoctorBookingType = ',currentDoctor,bookingType);
  if(currentDoctor.doctorId){
    //remove bookingType from the existing doctor
    let removeBookingType = {
                          doctorId:currentDoctor.doctorId,
                          bookingTypeId:bookingType.bookingTypeId
                        };
    return function(dispatch){
      postRequest('/CDoctors/removeBookingType',removeBookingType)
        .then(res => {
          console.log('response=',res);
          if(res.data.bookingType.count ==1){
            toastr.success('', 'Removed booking type successfully !');
            dispatch({type:types.REMOVE_BOOKING_TYPE_OF_DOCTOR,payload:removeBookingType});
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
                          doctorId:currentDoctor.doctorId,
                          bookingTypeId:bookingType.bookingTypeId
                        };
    return {
  		type: types.REMOVE_BOOKING_TYPE_OF_DOCTOR,
      payload: removeBookingType
  	}
  }

};

export function	addDoctorClinic(currentDoctor,clinic){
  //let doctorObject = clone(currentDoctor);
  console.log('will addDoctorClinic = ',currentDoctor,clinic);
  if(currentDoctor.doctorId){
    //add clinic into the existing doctor
    let addClinic = {
                          doctorId:currentDoctor.doctorId,
                          clinicId:clinic.clinicId,
                          clinicName:clinic.clinicName
                        };

    return function(dispatch){
      postRequest('/CDoctors/addClinic',addClinic)
        .then(res => {
          console.log('response=',res);
          if(res.data.clinic){
            toastr.success('', 'Saved clinic successfully !');
            dispatch({type:types.ADD_CLINIC_OF_DOCTOR,payload:addClinic});
          }
        })
        .catch((err) => {
          console.log('err=',err);
          toastr.error('Fail to save clinic (' + err + ')')
        });
    }
  }else{
    //add clinic into the new doctor
    let addClinic = {
                          doctorId:currentDoctor.doctorId,
                          clinicId:clinic.clinicId,
                          clinicName:clinic.clinicName
                        };
    return {
  		type: types.ADD_CLINIC_OF_DOCTOR,
      payload: addClinic
  	}
  }

};

export function	removeDoctorClinic(currentDoctor,clinic){
  //let doctorObject = clone(currentDoctor);
  console.log('will removeDoctorClinic = ',currentDoctor,clinic);
  if(currentDoctor.doctorId){
    //remove clinic from the existing doctor
    let removeClinic = {
                          doctorId:currentDoctor.doctorId,
                          clinicId:clinic.clinicId
                        };

    return function(dispatch){
      postRequest('/CDoctors/removeClinic',removeClinic)
        .then(res => {
          console.log('response=',res);
          if(res.data.clinic.count ==1){
            toastr.success('', 'Removed clinic successfully !');
            dispatch({type:types.REMOVE_CLINIC_OF_DOCTOR,payload:removeClinic});
          }
        })
        .catch((err) => {
          console.log('err=',err);
          toastr.error('Fail to save clinic (' + err + ')')
        });
    }
  }else{
    //remove clinic from the new doctor
    let removeClinic = {
                          doctorId:currentDoctor.doctorId,
                          clinicId:clinic.clinicId
                        };
    return {
  		type: types.REMOVE_CLINIC_OF_DOCTOR,
      payload: removeClinic
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
