import {
          FETCH_DOCTORS_FOR_BOOKING,
          FETCH_BOOKINGS_FOR_BOOKING,
          UPDATE_FIELDS_FOR_CURRENT_BOOKING,
          ADD_TIME_FOR_NEW_APPT_FOR_BOOKING,
          ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING,
          ADD_APPT_FOR_BOOKING
        } from '../actions/types';

// let bookingReducer = function(booking={
//                                       bookings:[],
//                                       doctors:[],
//                                       currentBooking: {},
//                                       newAppt: {}
//                                     },action){
//   //console.log('bookingReducer = ',action);
//   switch(action.type){
//     case FETCH_BOOKINGS_FOR_BOOKING:
//         return {...booking,bookings:action.payload};
//     case FETCH_DOCTORS_FOR_BOOKING:
//         console.log("==========> action.payload = ",action.payload.length);
//         return {...booking,doctors:action.payload};
//     case UPDATE_FIELDS_FOR_CURRENT_BOOKING:
//         return {...booking,currentBooking: Object.assign({},booking.currentBooking,action.field)};
//     case ADD_TIME_FOR_NEW_APPT_FOR_BOOKING:
//         return {...booking,newAppt: Object.assign({},booking.newAppt,{bookingTime:action.bookingTime})};
//     case ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING:
//         return {...booking,newAppt: Object.assign({},booking.newAppt,{patient:action.patient})};
//     case ADD_APPT_FOR_BOOKING:
//         return {...booking,newAppt: Object.assign({},booking.appointments,{appointments:action.appointments})};
//     default:
//         return booking;
//   }
// }
//
// export default bookingReducer;

let initState = {
                  bookings:[],
                  doctors:[],
                  currentBooking: {},
                  newAppt: {},
                };


const ACTION_HANDLERS = {
  [FETCH_DOCTORS_FOR_BOOKING]: (state, action) => {
    return {...state,doctors:action.payload};
  },
  [FETCH_BOOKINGS_FOR_BOOKING]: (state, action) => {
    return action.payload
    return {...state,bookings:action.payload};
  },
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
