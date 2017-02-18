import {
        SET_CURRENT_CLINIC,
        UPDATE_CURRENT_CLINIC_FIELDS,
        SAVE_CURRENT_CLINIC,
        ADD_BOOKING_TYPE_TO_CURRENT_CLINIC,
        REMOVE_BOOKING_TYPE_TO_CURRENT_CLINIC,
        ADD_DOCTOR_TO_CURRENT_CLINIC,
        REMOVE_DOCTOR_TO_CURRENT_CLINIC
      } from '../actions/types';
import clone from 'clone';

let currentClinicReducer = function(currentClinic={},action){
  switch(action.type){
    case SET_CURRENT_CLINIC:
      return action.currentClinic;
    case UPDATE_CURRENT_CLINIC_FIELDS:
        return Object.assign({},currentClinic,action.currentClinic);
    case SAVE_CURRENT_CLINIC:
        return Object.assign({},action.payload);
    case ADD_BOOKING_TYPE_TO_CURRENT_CLINIC:
        if(currentClinic.BookingTypes){
            return {...currentClinic,BookingTypes:[...currentClinic.BookingTypes,action.bookingType]};
        }else{
            let btArray = [];
            btArray.push(action.bookingType);
            return {...currentClinic,BookingTypes:btArray};
        }
    case REMOVE_BOOKING_TYPE_TO_CURRENT_CLINIC:
        let bts = clone(currentClinic.BookingTypes);
        let index = -1;
        bts.map((bt,i)=>{
          if(bt.bookingTypeId == action.bookingType.bookingTypeId){
            index = i;
          }
        });
        bts.splice(index,1);
        return {...currentClinic,BookingTypes:bts};
    case ADD_DOCTOR_TO_CURRENT_CLINIC:
        if(currentClinic.Doctors){
            return {...currentClinic,Doctors:[...currentClinic.Doctors,action.doctor]};
        }else{
            let btArray = [];
            btArray.push(action.doctor);
            return {...currentClinic,Doctors:btArray};
        }
    case REMOVE_DOCTOR_TO_CURRENT_CLINIC:
        let doctors = clone(currentClinic.Doctors);
        doctors.map((bt,i)=>{
          if(bt.doctorId == action.doctor.doctorId){
            index = i;
            doctors.splice(i,1);
          }
        });

        return {...currentClinic,Doctors:doctors};
    default:
        return currentClinic;
  }
}

export default currentClinicReducer;
