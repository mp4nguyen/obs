import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';
import clone from 'clone';

import * as types from './types';
import {getRequest,postRequest} from './lib/request';

export function setCurrentAccount(currentAccount){
    var accountObject = clone(currentAccount)

    return function(dispatch){
      dispatch({type: types.SET_CURRENT_ACCOUNT,currentAccount: accountObject});
      browserHistory.push('/Home/Account');
      // if(doctorObject.Person.Avatar){
      //   doctorObject.Person.avatarData = apiUrl(doctorObject.Person.Avatar.fileUrl);
      //   dispatch({type: types.SET_CURRENT_ACCOUNT,currentAccount: accountObject});
      //   browserHistory.push('/Home/Account');
      // }else{
      //   dispatch({type: types.SET_CURRENT_ACCOUNT,currentAccount: accountObject});
      //   browserHistory.push('/Home/Account');
      // }
    }
};

export function	updateCurrentAccountFields(currentAccount,subModel){
	return {
		type: types.UPDATE_CURRENT_ACCOUNT_FIELDS,
    subModel,
		currentAccount
	}
};

export function	saveCurrentAccount(companyId,currentAccount){
  //let doctorObject = clone(currentDoctor);
  console.log('will save currentAccount = ',currentAccount);

  var fd = new FormData();

  if(currentAccount.Person.avatar){
    fd.append('avatar',currentAccount.Person.avatar);
  }

  fd.append('Person', JSON.stringify(currentAccount.Person));
  fd.append('Account', JSON.stringify(currentAccount.Account));
  fd.append('companyId',companyId);
  console.log('saveCurrentAccount.saveCurrentAccount  with data = ',fd);

	return function(dispatch){
    postRequest('/CCompanies/saveAccount',fd,{container: 'doctorAvatar'})
      .then(res => {
        console.log('response=',res);
        // if(res.data.doctor.msg == "updated successfully"){
        //   //update doctor
        //   dispatch({type:types.UPDATE_DOCTOR_TO_CURRENT_COMPANY,doctor:currentDoctor});
        // }else{
        //   //new doctor return
        //   dispatch({type:types.SAVE_CURRENT_DOCTOR,payload:res.data.doctor});
        //   dispatch({type:types.ADD_DOCTOR_TO_CURRENT_COMPANY,doctor:res.data.doctor});
        // }

        toastr.success('', 'Saved company information successfully !')
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to save company information (' + err + ')')
      });
  }
};
