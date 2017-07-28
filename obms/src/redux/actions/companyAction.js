import axios from 'axios';

import * as types from './types';
import {getRequest,goPostRequest,goGetRequest} from './lib/request';
import {imageToBase64} from './lib/utils';

export function loadCompaniesFromServer(){
    let request = getRequest('/getCompanies');
    return{
      type: types.LOAD_COMPANIES_FROM_SERVER,
      payload: request
    }
}


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
	return (dispatch,getState) => {
    var company = getState().currentCompany.company;

    var saveCompany = ()=>{
      console.log('will save currentCompany = ',company);
      goPostRequest('/admin/saveCompany',company).then(res => {
          console.log('response=',res);
          if(company.companyId){
            //dispatch({type:types.UPDATE_BOOKING_TYPE,bookingType:data});
          }else{
            //dispatch({type:types.ADD_BOOKING_TYPE,bookingType:res.data});
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


   imageToBase64(company.iconBase64).then((base64String)=>{
     company.iconBase64 = base64String;
     saveCompany();
   },(err)=>{
     saveCompany();
   });

  }

};

export function	addDoctorToCurrentCompany(doctor){
	return {
		type: types.ADD_DOCTOR_TO_CURRENT_COMPANY,
		doctor
	}
};
