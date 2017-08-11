import {
          FETCH_DOCTORS_FOR_BOOKING,
          FETCH_BOOKINGS_FOR_BOOKING,
          UPDATE_FIELDS_FOR_CURRENT_BOOKING,
          ADD_TIME_FOR_NEW_APPT_FOR_BOOKING,
          ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING,
          ADD_APPT_FOR_BOOKING
        } from '../actions/types';


let initState = {
                  bookings:[],
                  doctors:[],
                  currentBooking: {},
                  newAppt: {patient:{},calendar:{}},
                };


const ACTION_HANDLERS = {
  [FETCH_DOCTORS_FOR_BOOKING]: (state, action) => {
    return {...state,doctors:action.payload};
  },
  [FETCH_BOOKINGS_FOR_BOOKING]: (state, action) => {
    return {...state,bookings:action.payload};
  },
  [ADD_TIME_FOR_NEW_APPT_FOR_BOOKING]: (state, action) => {
    return {...state,newAppt:{...state.newAppt,calendar: action.payload}};
  },
  [ADD_PATIENT_FOR_NEW_APPT_FOR_BOOKING]: (state, action) => {
    return {...state,newAppt:{...state.newAppt,patient: action.payload}};
  },

};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
