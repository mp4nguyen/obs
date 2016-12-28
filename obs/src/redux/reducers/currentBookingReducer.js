var clone = require('clone');
import {CURRENT_BOOKING_SET_CALENDAR,CURRENT_BOOKING_SET_PATIENT,CURRENT_BOOKING_SUBMIT} from '../actions/types';

let currentBookingReducer = function(currentBooking = {}, action) {
  switch (action.type) {
    case CURRENT_BOOKING_SET_CALENDAR:
    	return Object.assign({},currentBooking,{
                                                calendarId: action.calendar.calendarId,
                                                bookingTypeId: action.calendar.bookingTypeId,
                                                clinicId: action.calendar.clinicId,
                                                doctorId: action.calendar.doctorId,

                                                personId: action.calendar.personId,
                                                title: action.calendar.title,
                                                firstName: action.calendar.firstName,
                                                lastName: action.calendar.lastName,
                                                gender: action.calendar.gender,

                                                calendarDateInStr: action.calendar.calendarDateInStr,
                                                calendarTimeInStr: action.calendar.calendarTimeInStr,
                                                fromTime: action.calendar.fromTime,
                                                toTime: action.calendar.toTime,
                                                timeInterval: action.calendar.timeInterval,
                                                rosterId: action.calendar.rosterId,
                                                clinicName: action.clinic.clinicName,
                                                address: action.clinic.address,
                                                ward: action.clinic.ward,
                                                suburbDistrict: action.clinic.suburbDistrict,
                                                stateProvince: action.clinic.stateProvince,
                                                country: action.clinic.country,
                                                companyId: action.clinic.companyId
                                              });
    case CURRENT_BOOKING_SET_PATIENT:
        return Object.assign({},currentBooking,action.patient);
    case CURRENT_BOOKING_SUBMIT:
        console.log('action =',action);
        let newObject = clone(currentBooking);
        return newObject;
    case "ACTION1":
        console.log("action 1 is triggered !");
        return currentBooking;
    default:
      return currentBooking;

    return currentBooking;
  }
};

export default currentBookingReducer;
