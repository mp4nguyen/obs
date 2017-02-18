import {
        FETCH_BOOKING_TYPES_FROM_SERVER,
        ADD_BOOKING_TYPE,
        UPDATE_BOOKING_TYPE
      } from '../actions/types';

let bookingTypesReducer = function(bookingTypes=[],action){
  switch(action.type){
    case FETCH_BOOKING_TYPES_FROM_SERVER:
      return action.payload.data.bookingTypes;
    case ADD_BOOKING_TYPE:
        return [...bookingTypes,action.bookingType];
    case UPDATE_BOOKING_TYPE:
        var bts = [...bookingTypes];
        //console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctors = ',doctors);
        //console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctor = ',action.doctor);
        bts.forEach((bt,index)=>{
          if(bt.bookingTypeId == action.bookingType.bookingTypeId){
            bts[index] = action.bookingType;
          }
        });
        // console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctors = ',doctors);
        return bts;

    default:
      return bookingTypes;
  }
}

export default bookingTypesReducer;
