import {APPEND_EVENT} from './index'

export default function appendEvent(data){
  return (dispatch,getState) => {
    let calendar = getState().booking.newAppt.calendar;
    dispatch({type:APPEND_EVENT,payload:data,calendar})
  }
}
