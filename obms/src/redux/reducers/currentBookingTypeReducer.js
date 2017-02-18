import {
        SET_CURRENT_BOOKING_TYPE,
        UPDATE_CURRENT_BOOKING_TYPE_FIELDS,
        SAVE_CURRENT_BOOKING_TYPE
      } from '../actions/types';

import clone from 'clone';
import moment from 'moment';

let currentBookingTypeReducer = function(currentBookingType={},action){
  switch(action.type){
    case SET_CURRENT_BOOKING_TYPE:
      return action.currentBookingType;
    case UPDATE_CURRENT_BOOKING_TYPE_FIELDS:
      return Object.assign({},currentBookingType,action.currentBookingType);
    case SAVE_CURRENT_BOOKING_TYPE:
        return Object.assign({},action.currentBookingType);
    default:
        return currentBookingType;
  }
}

export default currentBookingTypeReducer;
