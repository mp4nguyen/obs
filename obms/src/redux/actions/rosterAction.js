import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {getRequest,postRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';

export function openClickDayModal(currentRoster){
    return{
      type: types.ROSTER_OPEN_CLICK_DAY_MODAL,
      isOpen: true,
      currentRoster
    }
};

export function closeClickDayModal(){
    return{
      type: types.ROSTER_CLOSE_CLICK_DAY_MODAL,
      isOpen: false
    }
};

export function openEventDayModal(currentRoster){
    return{
      type: types.ROSTER_OPEN_EVENT_DAY_MODAL,
      isOpen: true,
      currentRoster
    }
};

export function closeEventDayModal(){
    return{
      type: types.ROSTER_CLOSE_EVENT_DAY_MODAL,
      isOpen: false
    }
};

export function updateModalField(field){
    return{
      type: types.ROSTER_UPDATE_MODAL_FIELD,
      field
    }
};

export function	fetchRoster(doctorId){
  var req = postRequest('/CCompanies/listRosters',{doctorId});
  return {
    type: types.FETCH_ROSTER_OF_DOCTOR,
    payload: req
  };
};

export function	rosterGeneration(currentRoster){

  var fromDate = moment(currentRoster.start,'YYYY-MM-DD HH:mm:ss');
  var toDate = moment(currentRoster.end,'YYYY-MM-DD HH:mm:ss');
  var def = {
          "rosterId": currentRoster.rosterId,
    			"doctorId": currentRoster.doctorId,
    			"workingSiteId": currentRoster.workingSiteId,
    			"bookingTypeId": currentRoster.bookingTypeId,
    			"timeInterval": currentRoster.timeInterval,
    			"fromTime": fromDate.format('HH:mm:ss'),
    			"toTime": toDate.format('HH:mm:ss'),
    			"fromDate": fromDate.format('YYYY-MM-DD'),
    			"toDate": toDate.format('YYYY-MM-DD'),
    			"repeatType": currentRoster.repeatType
        };
  console.log('will generate roster currentRoster = ',def);
	return function(dispatch){
    postRequest('/CCompanies/generateRoster',def)
      .then(res => {
        console.log('response=',res);
        //after generate, fetch roster again to display on the calendar
        dispatch({type:types.FETCH_ROSTER_OF_DOCTOR, payload:res});
        toastr.success('', 'Generate roster successfully !')
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to generate roster (' + err + ')')
      });
  }
};
