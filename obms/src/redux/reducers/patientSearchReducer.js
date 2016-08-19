import {
          FETCH_PATIENTS_FOR_PATIENT_SEARCH,
          UPDATE_FIELDS_FOR_PATIENT_SEARCH,
          SET_PATIENT_FOR_PATIENT_SEARCH
        } from '../actions/types';

let patientSearchReducer = function(patientSearch={
                                      searchCriteria: {},
                                      patients: [],
                                      selectedPatient: {}
                                    },action){
  console.log('bookingReducer = ',action);
  switch(action.type){
    case FETCH_PATIENTS_FOR_PATIENT_SEARCH:
        return {...patientSearch,patients:action.payload.data.patients};
    case UPDATE_FIELDS_FOR_PATIENT_SEARCH:
        return {...patientSearch,searchCriteria: Object.assign({},patientSearch.searchCriteria,action.field)};
    case SET_PATIENT_FOR_PATIENT_SEARCH:
        return {...patientSearch,selectedPatient:action.patient};
    default:
        return patientSearch;
  }
}

export default patientSearchReducer;
