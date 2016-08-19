import {
          UPDATE_FIELDS_FOR_PATIENT_DETAIL,
          SAVE_FOR_PATIENT_DETAIL,
          CREATE_PATIENT_FOR_PATIENT_DETAIL
        } from '../actions/types';

let patientDetailReducer = function(patientDetail={},action){
  console.log('patientDetail = ',action);
  switch(action.type){
    case UPDATE_FIELDS_FOR_PATIENT_DETAIL:
        return Object.assign({},patientDetail,action.field);
    case CREATE_PATIENT_FOR_PATIENT_DETAIL:
        return Object.assign({},action.payload);
    default:
        return patientDetail;
  }
}

export default patientDetailReducer;
