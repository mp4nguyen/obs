import axios from 'axios';

import * as types from './types';
import {getRequest} from './lib/request';

export function fetchBookingTypesFromServer(){
    let request = getRequest('/CCompanies/listBookingTypes');
    return{
      type: types.FETCH_BOOKING_TYPES_FROM_SERVER,
      payload: request
    }
}
