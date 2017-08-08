import moment from 'moment';
import {SET_MOUSE_ACTION} from './index'

export default function setMouseAction(action){
  return (dispatch,getState) => {
    dispatch({type:SET_MOUSE_ACTION,payload:action})
  }
}
