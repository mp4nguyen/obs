import axios from 'axios';
import {browserHistory} from 'react-router';

import * as types from './types';
import {getRequest,goPostRequest,setAccessToken} from './lib/request';

export function pushACall(userId,data){
  return function(dispatch){

    console.log("will call an api /pushACall... data = ", {data:data});

    goPostRequest('/pushACall', {data:data,userId:parseInt(userId)} ).then(result =>{
        //console.log("/api/v1/getSlots = ",result);

        console.log("/pushACall res = ",result);
      },err=>{
        console.log('/pushACall catch = ',err);
      });

  }
}
