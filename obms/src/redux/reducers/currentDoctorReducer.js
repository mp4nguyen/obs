import {
        SET_CURRENT_DOCTOR,
        UPDATE_CURRENT_DOCTOR_FIELDS,
        SAVE_CURRENT_DOCTOR,
        FETCH_ROSTER_OF_DOCTOR,
        ADD_BOOKING_TYPE_OF_DOCTOR,
        REMOVE_BOOKING_TYPE_OF_DOCTOR,
        ADD_CLINIC_OF_DOCTOR,
        REMOVE_CLINIC_OF_DOCTOR
      } from '../actions/types';
import clone from 'clone';

let currentDoctorReducer = function(currentDoctor={},action){
  switch(action.type){
    case SET_CURRENT_DOCTOR:
      return action.currentDoctor;
    case UPDATE_CURRENT_DOCTOR_FIELDS:
      if(action.subModel){
          var object2 = Object.assign({},currentDoctor[action.subModel],action.currentDoctor);
          console.log('currentDoctorReducer = ',object2);
          return Object.assign({},currentDoctor,{Person:object2});
      }else{
          return Object.assign({},currentDoctor,action.currentDoctor);
      }
    case FETCH_ROSTER_OF_DOCTOR:
        return {...currentDoctor,RostersV:action.payload.data.rosters};
    case ADD_BOOKING_TYPE_OF_DOCTOR:
        if(currentDoctor.BookingTypes){
            return {...currentDoctor,BookingTypes:[...currentDoctor.BookingTypes,action.payload]};
        }else{
            let btArray = [];
            btArray.push(action.payload);
            return {...currentDoctor,BookingTypes:btArray};
        }
    case REMOVE_BOOKING_TYPE_OF_DOCTOR:
        let bts = clone(currentDoctor.BookingTypes);
        let index = -1;
        bts.map((bt,i)=>{
          if(bt.bookingTypeId == action.payload.bookingTypeId){
            index = i;
          }
        });
        bts.splice(index,1);
        return {...currentDoctor,BookingTypes:bts};
    case ADD_CLINIC_OF_DOCTOR:
        if(currentDoctor.Clinics){
            return {...currentDoctor,Clinics:[...currentDoctor.Clinics,action.payload]};
        }else{
            let clinicArray = [];
            clinicArray.push(action.payload);
            return {...currentDoctor,Clinics:clinicArray};
        }
    case REMOVE_CLINIC_OF_DOCTOR:
        let clinics = clone(currentDoctor.Clinics);
        let index2 = -1;
        clinics.map((bt,i)=>{
          if(bt.clinicId == action.payload.clinicId){
            index2 = i;
          }
        });
        clinics.splice(index2,1);
        return {...currentDoctor,Clinics:clinics};
    default:
        return currentDoctor;
  }
}

export default currentDoctorReducer;
