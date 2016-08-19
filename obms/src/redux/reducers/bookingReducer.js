import {
          FETCH_DOCTORS_FOR_BOOKING,
          FETCH_BOOKINGS_FOR_BOOKING,
          UPDATE_FIELDS_FOR_CURRENT_BOOKING
        } from '../actions/types';

let bookingReducer = function(booking={
                                      bookings:[],
                                      doctors:[],
                                      currentBooking: {}
                                    },action){
  console.log('bookingReducer = ',action);
  switch(action.type){
    case FETCH_BOOKINGS_FOR_BOOKING:
        return {...booking,bookings:action.payload.data.bookings};
    case FETCH_DOCTORS_FOR_BOOKING:
        return {...booking,doctors:action.payload.data.doctors};
    case UPDATE_FIELDS_FOR_CURRENT_BOOKING:
        return {...booking,currentBooking: Object.assign({},booking.currentBooking,action.field)};
    default:
        return booking;
  }
}

export default bookingReducer;
