import moment from 'moment';
import {SET_MAIN_FRAME_POSITION} from './index'

export default function setMainFramePosition(data){
  return (dispatch,getState) => {
    dispatch({type:SET_MAIN_FRAME_POSITION,payload:data})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
