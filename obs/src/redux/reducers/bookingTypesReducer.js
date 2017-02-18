import {
        FETCH_BOOKING_TYPES_FROM_SERVER,
        SET_CLICKED_BOOKING_TYPE
       } from '../actions/types';

import clone from 'clone';

let bookingTypesReducer = function(bookingType={bookingTypes:[],clickedBookingType:{}},action){
  switch(action.type){
    case FETCH_BOOKING_TYPES_FROM_SERVER:
      //console.log('FETCH_BOOKING_TYPES_FROM_SERVER = ',action.payload);
      return Object.assign({},bookingType,{bookingTypes:action.payload.data});
    case SET_CLICKED_BOOKING_TYPE:
      //console.log('SET_CLICKED_BOOKING_TYPE = ',action.bookingType);
      var bts = clone(bookingType.bookingTypes);
      bts.forEach(bt=>{
        if(bt.bookingTypeId == action.bookingType.bookingTypeId){
          bt.isActive = true;
        }else{
          bt.isActive = false;
        }
      });
      return Object.assign({},bookingType,{bookingTypes:bts,clickedBookingType:action.bookingType});
    default:
      return bookingType;
  }
}

export default bookingTypesReducer;
