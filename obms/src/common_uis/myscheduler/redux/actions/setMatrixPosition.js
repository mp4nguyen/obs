import moment from 'moment';
import {SET_MATRIX_POSITION} from './index'

export default function setMatrixPosition(resourceId,timeslot){
  return (dispatch,getState) => {
    let matrixPositions = {...getState().scheduler.matrixPositions};
    //console.log(" >>>>> _setMatrixPositionsOfTimeSlots : ",resourceId,timeslot);
    if(matrixPositions[resourceId]){
      matrixPositions[resourceId].timeslots.push(timeslot);
    }else{
      matrixPositions[resourceId] = {timeslots:[]};
      matrixPositions[resourceId].timeslots.push(timeslot);
    }
    dispatch({type:SET_MATRIX_POSITION,payload:matrixPositions})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
