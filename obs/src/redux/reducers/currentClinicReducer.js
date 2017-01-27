import {SET_CURRENT_CLINIC,UPDATE_CURRENT_CLINIC_FIELDS} from '../actions/types';

let currentClinicReducer = function(currentClinic={},action){
  switch(action.type){
    case SET_CURRENT_CLINIC:
      return action.currentClinic;
    case UPDATE_CURRENT_CLINIC_FIELDS:
        return Object.assign({},currentClinic,action.currentClinic);
    default:
        return currentClinic;
  }
}

export default currentClinicReducer;
