import {SET_CURRENT_RESOURCE} from './index'

export default function setCurrentResource(data){
  return (dispatch,getState) => {
    dispatch({type:SET_CURRENT_RESOURCE,payload:data})
  }
}
