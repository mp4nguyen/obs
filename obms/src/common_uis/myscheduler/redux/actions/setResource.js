import moment from 'moment';
import {getBoundsForNode,addEventListener,findTimeSlot,findResource,findRosterByDate,findElementInMatrixByDate,findRosterForCurrentDate,findRostersForCurrentDate} from '../../helper';
import {SET_RESOURCE,PROCESSING_RESOURCE,SET_MIN_MAX_DURATION} from './index'
import transformResourceData from './transformResourceData'

export default function setResource(resources){
  return (dispatch,getState)=>{
    return new Promise((resolve,reject)=>{
      var schedulerState = getState().scheduler;
      dispatch({type:SET_RESOURCE,payload:resources});
      let displayDate = schedulerState.displayDate;
      transformResourceData(resolve,dispatch,displayDate,resources)
    });
  }
}
