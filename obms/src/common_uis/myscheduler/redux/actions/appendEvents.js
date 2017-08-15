import {APPEND_EVENTS} from './index'

export default function appendEvents(data){
  return (dispatch,getState) => {
    dispatch({type:APPEND_EVENTS,payload:data})
  }
}
