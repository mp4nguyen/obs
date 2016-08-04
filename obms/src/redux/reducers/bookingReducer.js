import {
          ROSTER_OPEN_CLICK_DAY_MODAL,
          ROSTER_CLOSE_CLICK_DAY_MODAL,
          ROSTER_OPEN_EVENT_DAY_MODAL,
          ROSTER_CLOSE_EVENT_DAY_MODAL,
          ROSTER_UPDATE_MODAL_FIELD,
          FETCH_DOCTORS_FOR_BOOKING,
          FETCH_BOOKINGS_FOR_BOOKING
        } from '../actions/types';

let bookingReducer = function(booking={
                                      isClickDayModalOpen:false,
                                      isEventDayModalOpen:false,
                                      bookings:[],
                                      doctors:[]
                                    },action){
  console.log('bookingReducer = ',action);
  switch(action.type){
    case FETCH_BOOKINGS_FOR_BOOKING:
        return {...booking,bookings:action.payload.data.bookings};
    case FETCH_DOCTORS_FOR_BOOKING:
        return {...booking,doctors:action.payload.data.doctors};
    default:
        return booking;
  }
}

export default bookingReducer;
