import {SET_EVENTS} from './index'

export default function setEvents(data){
  console.log("-----------> setEvents is running");
  return (dispatch,getState) => {
    dispatch({type:SET_EVENTS,payload:data})
  }
}
