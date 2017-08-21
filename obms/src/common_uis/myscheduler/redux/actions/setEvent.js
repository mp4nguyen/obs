import {SET_EVENT} from './index'

export default function setEvent(data){
  return (dispatch,getState) => {
    console.log("-----------> setEvent is running");
    dispatch({type:SET_EVENT,payload:data})
  }
}
