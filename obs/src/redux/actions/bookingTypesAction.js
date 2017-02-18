import axios from 'axios';

import * as types from './types';
import {getRequest} from './lib/request';

export function fetchBookingTypesFromServer(){
    let request = getRequest('/BookingTypes');
    return{
      type: types.FETCH_BOOKING_TYPES_FROM_SERVER,
      payload: request
    }
}

export function setClickedBookingType(bt){
    return{
      type: types.SET_CLICKED_BOOKING_TYPE,
      bookingType: bt
    }
}
