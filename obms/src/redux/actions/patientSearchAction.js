import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {getRequest,postRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';


export function	fetchPatientForPatientSearch(criteria){
  var req = postRequest('/CCompanies/listPatients',criteria);
  return {
    type: types.FETCH_PATIENTS_FOR_PATIENT_SEARCH,
    payload: req
  };
};

export function	updateFieldForPatientSearch(field){
  return {
    type: types.UPDATE_FIELDS_FOR_PATIENT_SEARCH,
    field
  };
};

export function	setPatientForPatientSearch(patient){
  return {
    type: types.SET_PATIENT_FOR_PATIENT_SEARCH,
    patient
  };
};
