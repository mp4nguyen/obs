import moment from 'moment';
import {SET_REF} from './index'

export default function setRef(data){
  return (dispatch,getState) => {
    dispatch({type:SET_REF,payload:data})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
