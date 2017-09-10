import {
          UPDATE_FIELDS_FOR_PATIENT_DETAIL,
          SAVE_FOR_PATIENT_DETAIL,
          CREATE_PATIENT_FOR_PATIENT_DETAIL
        } from '../actions/types';

let initState = {
  address:null,
  country:null,
  dob:null,
  email:null,
  firstName:null,
  gender:null,
  lastName:null,
  mobile:null,
  phone:null,
  stateProvince:null,
  suburbDistrict:null,
  title:null,
  ward:null,
};

let patientDetailReducer = function(patientDetail=initState,action){
  //console.log('patientDetail = ',action);
  switch(action.type){
    case UPDATE_FIELDS_FOR_PATIENT_DETAIL:
        return Object.assign({},patientDetail,action.field);
    case CREATE_PATIENT_FOR_PATIENT_DETAIL:
        return Object.assign({});
    default:
        return patientDetail;
  }
}

export default patientDetailReducer;
