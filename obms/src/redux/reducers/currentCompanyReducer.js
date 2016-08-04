import {SET_CURRENT_COMPANY,UPDATE_CURRENT_COMPANY_FIELDS,SAVE_CURRENT_COMPANY} from '../actions/types';

let currentCompanyReducer = function(currentCompany={},action){
  console.log('currentCompanyReducer = ',action);
  switch(action.type){
    case SET_CURRENT_COMPANY:
      return action.currentCompany;
    case UPDATE_CURRENT_COMPANY_FIELDS:
        return Object.assign({},currentCompany,action.currentCompany);
    case SAVE_CURRENT_COMPANY:
        return currentCompany;
    default:
        return currentCompany;
  }
}

export default currentCompanyReducer;
