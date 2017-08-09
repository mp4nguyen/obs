import {SET_COLUMNS} from './index'

export default function setColumns(data){
  return (dispatch,getState) => {
    dispatch({type:SET_COLUMNS,payload:data})
  }
}
