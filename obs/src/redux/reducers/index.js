import { combineReducers } from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';

import bookingTypesReducer from './bookingTypesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  toastr: toastrReducer,
  bookingType: bookingTypesReducer,
  user: userReducer
});

export default rootReducer;
