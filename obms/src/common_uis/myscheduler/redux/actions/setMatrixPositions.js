import moment from 'moment';
import {SET_MATRIX_POSITIONS} from './index'

export default function setMatrixPositions(data){
  return (dispatch,getState) => {
    dispatch({type:SET_MATRIX_POSITIONS,payload:data})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
