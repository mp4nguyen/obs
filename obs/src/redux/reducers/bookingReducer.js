import {
          FETCH_DOCTORS_FOR_BOOKING,
          FETCH_BOOKINGS_FOR_BOOKING,
          UPDATE_FIELDS_FOR_CURRENT_BOOKING,
          ADD_TIME_FOR_NEW_APPT_FOR_BOOKING,
          ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING,
          ADD_APPT_FOR_BOOKING
        } from '../actions/types';

let bookingReducer = function(booking={
                                      bookings:[],
                                      doctors:[],
                                      currentBooking: {},
                                      newAppt: {}
                                    },action){
  //console.log('bookingReducer = ',action);
  switch(action.type){
    case FETCH_BOOKINGS_FOR_BOOKING:
        return {...booking,bookings:action.payload.data.bookings};
    case FETCH_DOCTORS_FOR_BOOKING:
        return {...booking,doctors:action.payload.data.doctors};
    case UPDATE_FIELDS_FOR_CURRENT_BOOKING:
        return {...booking,currentBooking: Object.assign({},booking.currentBooking,action.field)};
    case ADD_TIME_FOR_NEW_APPT_FOR_BOOKING:
        return {...booking,newAppt: Object.assign({},booking.newAppt,{bookingTime:action.bookingTime})};
    case ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING:
        return {...booking,newAppt: Object.assign({},booking.newAppt,{patient:action.patient})};
    case ADD_APPT_FOR_BOOKING:
        return {...booking,newAppt: Object.assign({},booking.appointments,{appointments:action.appointments})};
    default:
        return booking;
  }
}

export default bookingReducer;
