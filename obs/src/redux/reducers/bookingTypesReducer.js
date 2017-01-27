import {FETCH_BOOKING_TYPES_FROM_SERVER} from '../actions/types';

let bookingTypesReducer = function(bookingTypes=[],action){
  switch(action.type){
    case FETCH_BOOKING_TYPES_FROM_SERVER:
      return action.payload.data.bookingTypes;
    default:
      return bookingTypes;
  }
}

export default bookingTypesReducer;
