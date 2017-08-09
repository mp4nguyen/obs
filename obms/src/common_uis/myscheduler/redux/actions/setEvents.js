import moment from 'moment';
import {SET_EVENTS} from './index'

export default function setEvents(data){
  return (dispatch,getState) => {
    dispatch({type:SET_EVENTS,payload:data})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
