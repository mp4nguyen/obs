import ReactDOM from 'react-dom';
import moment from 'moment';

import {getBoundsForNode,findTimeSlot} from '../../helper';
import {SET_MOUSE_DOWN_ON_TIME_SLOT,SET_MOUSE_ACTION} from './index'

let timeOutId = null;

export default function setMouseSelecting(e){
  return (dispatch,getState) => {
    var scheduler = getState().scheduler;
    let resourceId = scheduler.selectingArea.resourceId;

    //console.log(" => setMouseSelecting.js scheduler = ",scheduler," resourceId = ",resourceId);
    let mouseY = e.pageY;
    let mouseX = e.pageX;

    if(scheduler.scroller.scrollerForTimeSlots){
      mouseY = e.pageY + scheduler.scroller.scrollerForTimeSlots.scrollTop;
      mouseX = e.pageX + scheduler.scroller.scrollerForTimeSlots.scrollLeft;
    }

    //console.log('mouseX = ',mouseX,'mouseY = ',mouseY);

    //this.isMouseSelecting = true;


    let timeslotAtMouse = findTimeSlot(scheduler.matrixPositions[resourceId].timeslots,mouseY)
    if(timeslotAtMouse){

      let selectingArea = {
                              height: timeslotAtMouse.bottom - scheduler.selectingArea.top,
                              bottom: timeslotAtMouse.bottom,
                              toTimeInMoment: timeslotAtMouse.toTimeInMoment,
                              toTimeInStr: timeslotAtMouse.toTimeInStr,
                              duration: timeslotAtMouse.toTimeInMoment.diff(scheduler.selectingArea.fromTimeInMoment,'minutes')
                           };

      dispatch({type:SET_MOUSE_ACTION,payload:{isMouseSelecting: true}})
      dispatch({type:SET_MOUSE_DOWN_ON_TIME_SLOT,payload:selectingArea})

      // clearTimeout(timeOutId);
      // timeOutId = setTimeout(()=>{
      //
      // },50);

    }
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
