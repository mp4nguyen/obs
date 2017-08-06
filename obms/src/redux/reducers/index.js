import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import bookingTypesReducer from './bookingTypesReducer';
import userReducer from './userReducer';
import companyReducer from './companyReducer';
import currentCompanyReducer from './currentCompanyReducer';
import currentClinicReducer from './currentClinicReducer';
import currentDoctorReducer from './currentDoctorReducer';
import rosterReducer from './rosterReducer';
import bookingReducer from './bookingReducer';
import patientSearchReducer from './patientSearchReducer';
import patientDetailReducer from './patientDetailReducer';
import currentAccountReducer from './currentAccountReducer';
import scheduler from '../../common_uis/myscheduler/redux/reducer'

const rootReducer = combineReducers({
  bookingType: bookingTypesReducer,
  user: userReducer,
  companies: companyReducer,
  currentCompany: currentCompanyReducer,
  currentAccount: currentAccountReducer,
  toastr: toastrReducer,
  roster: rosterReducer,
  booking: bookingReducer,
  patientSearch: patientSearchReducer,
  patientDetail: patientDetailReducer,
  scheduler
});

export default rootReducer;
