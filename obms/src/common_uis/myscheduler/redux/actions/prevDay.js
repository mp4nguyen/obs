import moment from 'moment';
import {SET_DISPLAY_DATE} from './index';
import transformResourceData from './transformResourceData'

export default function prevDay(){
  return (dispatch,getState) => {
    let scheduler = getState().scheduler;
    let displayDate = moment(scheduler.displayDate);
    displayDate.add(-1,'d');

    dispatch({type:SET_DISPLAY_DATE,payload:displayDate});
    transformResourceData(dispatch,displayDate,scheduler.resource)

  }
}
