import {combineReducers} from 'redux';
import practitionerReducer from './practitionerReducer';
import currentPractitionerReducer from './currentPractitionerReducer';
import clinicReducer from './clinicReducer';
import currentClinicReducer from './currentClinicReducer';
import timeReducer from './timeReducer';
import datePickerDialogReducer from './datePickerDialogReducer';
import currentBookingReducer from './currentBookingReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	clinics: clinicReducer,
	practitioners: practitionerReducer,
	timeSelection: timeReducer,
	currentPractitioner: currentPractitionerReducer,
	currentClinic: currentClinicReducer,
	datePickerDialog: datePickerDialogReducer,
	currentBooking : currentBookingReducer,
	user: userReducer
});

export default rootReducer;
