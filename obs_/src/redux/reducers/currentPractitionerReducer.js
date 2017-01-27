
var clone = require('clone');
import {SELECT_PRACTITIONER,LOAD_PRACTITIONER_FROM_SERVER} from '../actions/types';

let currentPractitionerReducer = function(currentPractitioner = {Clinics:[]}, action) {
  switch (action.type) {
    case LOAD_PRACTITIONER_FROM_SERVER:
		let isSelected = true;    
		return Object.assign({},action.payload.data[0],{isSelected});
    case SELECT_PRACTITIONER:
    	return action.practitioner;
    default: 
      	return currentPractitioner;
  }
};

export default currentPractitionerReducer;
