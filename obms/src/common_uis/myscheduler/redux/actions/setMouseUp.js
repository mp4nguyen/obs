import moment from 'moment';
import {SET_MOUSE_ACTION,RESET_SELECTING_AREA} from './index'

export default function setMouseUp(action){
  return (dispatch,getState) => {
    dispatch({type:SET_MOUSE_ACTION,payload:{isClickOnTimeSlot:false,isMouseSelecting:false}});
    dispatch({type:RESET_SELECTING_AREA});
  }
}
