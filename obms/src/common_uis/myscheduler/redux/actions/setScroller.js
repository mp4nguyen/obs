import moment from 'moment';
import {SET_MOUSE_ACTION,SET_SCROLLER} from './index'

export default function setScroller(action){
  return (dispatch,getState) => {
    dispatch({type:SET_SCROLLER,payload:action})
  }
}
