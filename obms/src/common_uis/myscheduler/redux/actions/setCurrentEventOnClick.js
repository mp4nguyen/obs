import {SET_CURRENT_EVENT_ON_CLICK} from './index'

export default function setCurrentEventOnClick(data){
  return (dispatch,getState) => {
    dispatch({type:SET_CURRENT_EVENT_ON_CLICK,payload:data})
  }
}
