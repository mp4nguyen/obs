
import {LOG_IN_AS_GUEST} from '../actions/types';

let userReducer = function(user = {}, action) {
  switch (action.type) {
    case LOG_IN_AS_GUEST:
      console.log(action);
      return action.payload.data;
    default:
      return user;
  }
};

export default userReducer;
