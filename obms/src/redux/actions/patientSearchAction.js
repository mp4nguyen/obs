import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {goGetRequest,goPostRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';


export function	fetchPatientForPatientSearch(criteria){
  return (dispatch,getState) => {
    let criteria = getState().patientSearch.searchCriteria;
    console.log("will call api /admin/searchPatients creteria = ",criteria);
    goPostRequest('/admin/searchPatients',criteria).then(
      (res)=>{
        dispatch({type: types.FETCH_PATIENTS_FOR_PATIENT_SEARCH,payload: res.data})
      },
      (err)=>{

      }
    );

  }

};

export function	updateFieldForPatientSearch(field){
  return {
    type: types.UPDATE_FIELDS_FOR_PATIENT_SEARCH,
    payload: field
  };
};

export function	setPatientForPatientSearch(patient){

  return {
    type: types.SET_PATIENT_FOR_PATIENT_SEARCH,
    payload: patient
  };
};
