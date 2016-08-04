import axios from 'axios';

import * as types from './types';
import {getRequest} from './lib/request';

export function loadCompaniesFromServer(){
    let request = getRequest('/CCompanies/initData');                                
    return{
      type: types.LOAD_COMPANIES_FROM_SERVER,
      payload: request
    }
}
