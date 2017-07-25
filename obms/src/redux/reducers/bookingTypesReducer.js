import {
        FETCH_BOOKING_TYPES_FROM_SERVER,
        ADD_BOOKING_TYPE,
        UPDATE_BOOKING_TYPE,
        SET_CURRENT_BOOKING_TYPE,
        UPDATE_CURRENT_BOOKING_TYPE_FIELDS,
        SAVE_CURRENT_BOOKING_TYPE,
      } from '../actions/types';

let initState = {
  bookingTypes: [],
  currentBookingType:{},
};


const ACTION_HANDLERS = {
  [FETCH_BOOKING_TYPES_FROM_SERVER]: (state, action) => {
    return {...state,bookingTypes:action.payload};
  },
  [ADD_BOOKING_TYPE]: (state, action) => {
    return {...state,bookingTypes:[...state.bookingTypes,action.bookingType]};
  },
  [UPDATE_BOOKING_TYPE]: (state, action) => {
    var bts = [...state.bookingTypes];
    bts.forEach((bt,index)=>{
      if(bt.bookingTypeId == action.bookingType.bookingTypeId){
        bts[index] = action.bookingType;
      }
    });
    return {...state,bookingTypes:bts};
  },
  [SET_CURRENT_BOOKING_TYPE]: (state, action) => {
    return {...state,currentBookingType:action.currentBookingType};
  },
  [UPDATE_CURRENT_BOOKING_TYPE_FIELDS]: (state, action) => {
    return {...state,currentBookingType: {...state.currentBookingType,...action.currentBookingType}};
  },
  [SAVE_CURRENT_BOOKING_TYPE]: (state, action) => {
    return {...state,currentBookingType:action.currentBookingType};
  },
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
