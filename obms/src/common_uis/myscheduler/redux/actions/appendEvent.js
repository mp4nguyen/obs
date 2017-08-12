import {APPEND_EVENT} from './index'

export default function appendEvent(data){
  return (dispatch,getState) => {
    let appointment = getState().booking.newAppt;
    dispatch({type:APPEND_EVENT,payload:data,appointment})
  }
}
