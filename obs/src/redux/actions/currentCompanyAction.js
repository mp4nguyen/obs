import axios from 'axios';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {postRequest} from './lib/request';

export function setCurrentCompany(currentCompany){
    return{
      type: types.SET_CURRENT_COMPANY,
      currentCompany
    }
};

export function	updateCurrentCompanyFields(currentCompany){
	return {
		type: types.UPDATE_CURRENT_COMPANY_FIELDS,
		currentCompany
	}
};

export function	saveCurrentCompany(currentCompany){
  console.log('will save currentCompany = ',currentCompany);
  var companyObject = currentCompany;
  delete companyObject.Doctors;
  delete companyObject.Clinics;
	return function(dispatch){
    postRequest('/CCompanies/save',companyObject)
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
