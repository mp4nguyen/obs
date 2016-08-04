import {LOAD_COMPANIES_FROM_SERVER} from '../actions/types';

let companyReducer = function(companies=[],action){
  console.log('companyReducer = ',action);
  switch(action.type){
    case LOAD_COMPANIES_FROM_SERVER:
        console.log('LOAD_COMPANIES_FROM_SERVER = ',action);
        return action.payload.data.initData;
    default:
        return companies;
  }
}

export default companyReducer;
