import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';
import clone from 'clone';

import apiUrl from './lib/url';
import * as types from './types';
import {getRequest,postRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';

export function setCurrentDoctor(currentDoctor){
    var doctorObject = clone(currentDoctor)
    if(doctorObject.Person && doctorObject.Person.dob){
      console.log(1);
      doctorObject.Person.dob = mySqlDateToString(doctorObject.Person.dob);
    }

    return function(dispatch){
      if(doctorObject.Person.Avatar){
        doctorObject.Person.avatarData = apiUrl(doctorObject.Person.Avatar.fileUrl);
        dispatch({type: types.SET_CURRENT_DOCTOR,currentDoctor: doctorObject});
        browserHistory.push('/Home/DoctorDetail');
      }else{
        dispatch({type: types.SET_CURRENT_DOCTOR,currentDoctor: doctorObject});
        browserHistory.push('/Home/DoctorDetail');
      }
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
  var fd = new FormData();
  for ( var key in currentDoctor.Person ) {
    fd.append(key, currentDoctor.Person[key]);
  }
  fd.append('doctorIsenable',currentDoctor.isenable);
  fd.append('doctorTimeInterval',currentDoctor.timeInterval);
  fd.append('doctorId',currentDoctor.doctorId);
  fd.append('companyId',companyId);

	return function(dispatch){
    postRequest('/CDoctors/save',fd,{container: 'doctorAvatar'})
      .then(res => {
        console.log('response=',res);
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

};

export function	removeDoctorBookingType(currentDoctor,bookingType){
  //let doctorObject = clone(currentDoctor);
  console.log('will removeDoctorBookingType = ',currentDoctor,bookingType);
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
};

export function	addDoctorClinic(currentDoctor,clinic){
  //let doctorObject = clone(currentDoctor);
  console.log('will addDoctorClinic = ',currentDoctor,clinic);
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

};

export function	removeDoctorClinic(currentDoctor,clinic){
  //let doctorObject = clone(currentDoctor);
  console.log('will removeDoctorClinic = ',currentDoctor,clinic);
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
