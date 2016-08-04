var clone = require('clone');
import {MOUSE_ENTER_CLINIC} from '../actions/types';

let currentClinic = function(currentClinic = {}, action) {
  
  switch (action.type) {
    case MOUSE_ENTER_CLINIC:
    	return Object.assign({},action.clinic,{index:action.clinicIndex});
    default: 
      return currentClinic;
  }
};

export default currentClinic;
