import {LOGIN,UPDATE_LOGIN_FIELDS,AUTH_USER,UNAUTH_USER} from '../actions/types';

let initState = {
    account:{},
    err:"",
    isLogin:false,
}

let userReducer = function(user=initState,action){
  switch(action.type){
    case UPDATE_LOGIN_FIELDS:
      return Object.assign({},user,action.login);
    case AUTH_USER:
      return {...user,account:action.payload,err:"",isLogin:true,}
    case UNAUTH_USER:
      return {...user,err:action.payload,isLogin:false,}
    default:
      return user;
  }
}

export default userReducer;
