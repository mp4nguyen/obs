import moment from 'moment';
import {SET_DISPLAY_DATE} from './index';
import transformResourceData from './transformResourceData'

export default function toDay(){
  return (dispatch,getState) => {
    let scheduler = getState().scheduler;
    let displayDate = moment(moment().format('DD/MM/YYYY'),'DD/MM/YYYY');
    dispatch({type:SET_DISPLAY_DATE,payload:displayDate});
    transformResourceData(dispatch,displayDate,scheduler.resource)

  }
}
