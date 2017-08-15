import {SET_DISPLAY_DATE} from './index'

export default function setDisplayDate(displayDate){
  return (dispatch) => {
    return new Promise((resolve,reject)=>{
      dispatch({type:SET_DISPLAY_DATE,payload:displayDate});
      resolve("Success")
    });
  }
}
