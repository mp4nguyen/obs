import {LOGIN,UPDATE_LOGIN_FIELDS,AUTH_USER,UNAUTH_USER} from '../actions/types';

let userReducer = function(user={},action){
  switch(action.type){
    case UPDATE_LOGIN_FIELDS:
      return Object.assign({},user,action.login);
    case AUTH_USER:
      return Object.assign({},user,{succ:action.user});
    case UNAUTH_USER:
      return Object.assign({},user,{err:action.msg});
    default:
        return user;
  }
}

export default userReducer;
