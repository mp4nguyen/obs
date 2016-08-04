
import {LOAD_PRACTITIONER_FROM_SERVER,SELECT_PRACTITIONER} from '../actions/types';

let practitionerReducer = function(practitioners = [], action) {
  switch (action.type) {
  	case LOAD_PRACTITIONER_FROM_SERVER:
  		//console.log('reducer = ', action);
  		let isSelected = true;
  		let isFirst = true;

  		return action.payload.data.map(practitioner=>{ 
	  			if(isFirst){
	  				isFirst = false;
	  				return Object.assign({},practitioner,{isSelected})	
	  			}else{
	  				isSelected = false;
  					return Object.assign({},practitioner,{isSelected})		  				
	  			}
  			});
    case SELECT_PRACTITIONER:
    	return practitioners.map((practitioner) => {return practitioner.bookingTypeName === action.practitioner.bookingTypeName ? 
    			Object.assign({},practitioner,{isSelected:true}):Object.assign({},practitioner,{isSelected:false})
    		})
    default: 
      return practitioners;

    return practitioners;  
  }
};

export default practitionerReducer;
