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
  //fd.append('file',currentDoctor.Person.avatar);

  //delete doctorObject.Person.avatar;
  //delete doctorObject.Person.Avatar;
  //delete doctorObject.Person.Signature;
  for ( var key in currentDoctor.Person ) {
    fd.append(key, currentDoctor.Person[key]);
  }
  fd.append('doctorIsenable',currentDoctor.isenable);
  fd.append('doctorTimeInterval',currentDoctor.timeInterval);
  fd.append('doctorId',currentDoctor.doctorId);
  fd.append('companyId',companyId);

  //{doctor:doctorObject,avatar:currentDoctor.Person.avatar}

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
