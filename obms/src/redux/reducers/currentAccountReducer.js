import {
        SET_CURRENT_ACCOUNT,
        UPDATE_CURRENT_ACCOUNT_FIELDS,
        SAVE_CURRENT_ACCOUNT
      } from '../actions/types';

import clone from 'clone';
import moment from 'moment';

let currentAccountReducer = function(currentAccount={},action){
  switch(action.type){
    case SET_CURRENT_ACCOUNT:
      return action.currentAccount;
    case UPDATE_CURRENT_ACCOUNT_FIELDS:
      //console.log('currentDoctorReducer.updateCurrentDoctorFields => action.subModel = ',action.subModel,' with object',action.currentDoctor,' currentDoctor = ',currentDoctor);
      //console.log('currentDoctor[action.subModel] = ',currentDoctor[action.subModel]);
      if(action.subModel){
          var object2 = Object.assign({},currentAccount[action.subModel],action.currentAccount);
          //console.log('currentDoctorReducer = ',object2);
          var object3 = {};
          object3[action.subModel] = object2
          return Object.assign({},currentAccount,object3);
      }else{
          return Object.assign({},currentAccount,action.currentAccount);
      }
    case SAVE_CURRENT_ACCOUNT:
        return Object.assign({},action.payload);
    default:
        return currentAccount;
  }
}

export default currentAccountReducer;
