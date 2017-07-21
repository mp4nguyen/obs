import axios from 'axios';
import {browserHistory} from 'react-router';

import * as types from './types';
import {getRequest,postRequest,setAccessToken,goGetRequest,goPostRequest,setToken} from './lib/request';

export function login(user){
  return function(dispatch){
    goPostRequest('/loginAT',user).then(response => {
          console.log(response);
          if(response.data.isLogin){
            setToken(response.data.accessToken);
            dispatch({type: types.AUTH_USER,payload:response.data.account});
            browserHistory.push('/Home');
          }else{
            dispatch({type: types.UNAUTH_USER,payload:response.data.reason});
          }

          //localStorage.setItem('AccessToken',response.data.id);
          //setAccessToken(response.data.id);
          //get initial data for the system after login successfully
          // getRequest('/CCompanies/initData')
          //   .then(response => {
          //     console.log('______________userAction.login.initData =',response);
          //     dispatch({type: types.LOAD_COMPANIES_FROM_SERVER,payload:response});
          //     if(response.data.initData.length == 1){
          //       //if initData returns 1 record => it is a company account => set that record is the current company
          //       dispatch({type: types.SET_CURRENT_COMPANY,currentCompany:response.data.initData[0]});
          //     }
          //   })
          //   .catch(err => {
          //
          //   });
          // postRequest('/CCompanies/listBookingTypes')
          //   .then(response => {
          //     console.log('______________userAction.login.listBookingTypes =',response);
          //     dispatch({type: types.FETCH_BOOKING_TYPES_FROM_SERVER,payload:response});
          //   })
          //   .catch(err => {
          //
          //   });

      })
      .catch((err) => {
          console.log('catch = ',err);
          dispatch({type: types.UNAUTH_USER,msg: err.response.statusText});
      });
  }
}

export function	updateLoginFields(login){
	return {
		type: types.UPDATE_LOGIN_FIELDS,
		login
	}
};
