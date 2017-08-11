import {
          FETCH_PATIENTS_FOR_PATIENT_SEARCH,
          UPDATE_FIELDS_FOR_PATIENT_SEARCH,
          SET_PATIENT_FOR_PATIENT_SEARCH
        } from '../actions/types';


let initState = {
  searchCriteria: {},
  patients: [],
  selectedPatient: {}
};


const ACTION_HANDLERS = {
  [FETCH_PATIENTS_FOR_PATIENT_SEARCH]: (state, action) => {
    return {...state,patients:action.payload};
  },
  [UPDATE_FIELDS_FOR_PATIENT_SEARCH]: (state, action) => {
    return {...state,searchCriteria: {...state.searchCriteria,...action.payload}};
  },
  [SET_PATIENT_FOR_PATIENT_SEARCH]: (state, action) => {
    return {...state,selectedPatient:action.payload};
  },
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
