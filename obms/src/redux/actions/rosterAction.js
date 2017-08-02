import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import {getRequest,postRequest,goGetRequest,goPostRequest} from './lib/request';
import * as types from './types';
import {imageToBase64,errHandler} from './lib/utils';
import {mySqlDateToString} from './lib/mySqlDate';

export function openClickDayModal(currentRoster){
    console.log("rosterAction.js.openClickDayModal => currentRoster = ",currentRoster);
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

export function	fetchRoster(){
  return (dispatch,getState) => {
    var currentDoctor = getState().currentCompany.currentDoctor;
    var currentCompany = getState().currentCompany.company;
    goPostRequest("/admin/getRosters",{doctorId:currentDoctor.doctorId,companyId:currentCompany.companyId}).then((res)=>{
      console.log("res = ",res);
      let rosters = []
      res.data.forEach(roster=>{
        roster.start = moment(roster.fromDate);
        roster.end = moment(roster.toDate);
        roster.breakTime = moment(roster.breakTime);
        rosters.push(roster)
      });
      dispatch({type:types.FETCH_ROSTER_OF_DOCTOR,payload:rosters});
    },err=>{
      console.log("err = ",err);
    });
  };
};

export function	rosterGeneration(){

  return (dispatch,getState) => {
    var currentRoster = getState().roster.currentRoster;
    var currentCompany = getState().currentCompany.company;
    var rosterDate = moment(currentRoster.start,'YYYY-MM-DD HH:mm:ss');
    var fromDate = moment(currentRoster.start,'YYYY-MM-DD HH:mm:ss');
    var toDate = moment(currentRoster.end,'YYYY-MM-DD HH:mm:ss');
    var breakTime = null;
    if(currentRoster.breakTime){
      var breakTimeTemp = moment(currentRoster.breakTime,'YYYY-MM-DD HH:mm:ss');
      breakTime = moment(fromDate.format('YYYY-MM-DD')+' '+breakTimeTemp.format('HH:mm:ss'),'YYYY-MM-DD HH:mm:ss');
    }

    var def = {
            companyId: currentCompany.companyId,
            "rosterId": currentRoster.rosterId,
      			"doctorId": currentRoster.doctorId,
      			"workingSiteId": currentRoster.workingSiteId,
      			"bookingTypeId": currentRoster.bookingTypeId,
      			"timeInterval": Number(currentRoster.timeInterval),
      			"fromTime": fromDate,
      			"toTime": moment(fromDate.format('YYYY-MM-DD')+' '+toDate.format('HH:mm:ss'),'YYYY-MM-DD HH:mm:ss'),
      			"fromDate": fromDate,
      			"toDate": toDate,//.format('YYYY-MM-DD'),
      			"repeatType": currentRoster.repeatType,
            rosterDate: rosterDate.startOf('date'),
            "breakDuration": Number(currentRoster.breakDuration),
            breakTime,
          };
    console.log('will generate roster currentRoster = ',def);

    goPostRequest("/admin/generateRosters",def).then((res)=>{
      console.log("res = ",res);
      let rosters = []
      res.data.rosters.forEach(roster=>{
        roster.start = moment(roster.fromDate);
        roster.end = moment(roster.toDate);
        rosters.push(roster)
      });

      dispatch({type:types.FETCH_ROSTER_OF_DOCTOR,payload:rosters});
      let overLapsStr = " There are " + res.data.overLaps.length + " overlap rosters ["
      let overLapsDetail = ""
      res.data.overLaps.forEach(roster=>{
        overLapsDetail += moment(roster.fromDate).format("DD/MM/YYYY HH:mm") + " - " + moment(roster.toDate).format("DD/MM/YYYY HH:mm") + "; ";
      });

      if(res.data.overLaps.length > 0){
        toastr.success('', 'Generate roster successfully !' + overLapsStr + overLapsDetail + "]")
      }else{
        toastr.success('', 'Generate roster successfully !' )
      }

    },err=>{
      errHandler("generate rosters ",err)
      console.log("err = ",err);
    });
  };

};


export function	rosterDelete(){

  return (dispatch,getState) => {
    var currentRoster = getState().roster.currentRoster;
    var currentCompany = getState().currentCompany.company;
    var rosterDate = moment(currentRoster.start,'YYYY-MM-DD HH:mm:ss');
    var fromDate = moment(currentRoster.start,'YYYY-MM-DD HH:mm:ss');
    var toDate = moment(currentRoster.end,'YYYY-MM-DD HH:mm:ss');
    var breakTimeTemp = moment(currentRoster.breakTime,'YYYY-MM-DD HH:mm:ss');
    var breakTime = moment(fromDate.format('YYYY-MM-DD')+' '+breakTimeTemp.format('HH:mm:ss'),'YYYY-MM-DD HH:mm:ss');

    var def = {
            companyId: currentCompany.companyId,
            "rosterId": currentRoster.rosterId,
      			"doctorId": currentRoster.doctorId,
      			"workingSiteId": currentRoster.workingSiteId,
      			"bookingTypeId": currentRoster.bookingTypeId,
      			"timeInterval": Number(currentRoster.timeInterval),
      			"fromTime": fromDate,
      			"toTime": moment(fromDate.format('YYYY-MM-DD')+' '+toDate.format('HH:mm:ss'),'YYYY-MM-DD HH:mm:ss'),
      			"fromDate": fromDate,
      			"toDate": toDate,//.format('YYYY-MM-DD'),
      			"repeatType": currentRoster.repeatType,
            rosterDate: rosterDate.startOf('date'),
            "breakDuration": Number(currentRoster.timeInterval),
            breakTime,
          };
    console.log('will delete roster currentRoster = ',def);

    goPostRequest("/admin/deleteRosters",def).then((res)=>{
      console.log("res = ",res);
      let rosters = []
      res.data.forEach(roster=>{
        roster.start = moment(roster.fromDate);
        roster.end = moment(roster.toDate);
        rosters.push(roster)
      });
      dispatch({type:types.FETCH_ROSTER_OF_DOCTOR,payload:rosters});
      toastr.success('', 'Generate roster successfully !')
    },err=>{
      errHandler("generate rosters ",err)
      console.log("err = ",err);
    });
  };

};
