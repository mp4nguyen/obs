import ReactDOM from 'react-dom';
import moment from 'moment';

import {getBoundsForNode,findTimeSlot,findResource} from '../../helper';
import {UPDATE_EVENT,SET_MOUSE_DOWN_ON_TIME_SLOT,SET_MOUSE_ACTION} from './index'

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

    //Get new position of mainContainerForTimeSlots because it can change as we use scroller to move the container
    //So the top position will be changed
    //All caculation for eventslots
    if(scheduler.currentEventOnClick.isResizeOnEvent){
      //check whether resize or not, if yes, update height of event
      //when mouse up, check whether mouse move is used for resize or not
      //If it is resize, so find the timeslot that the mouse cursor is , so
      //=> set the height of event to cover that timeslot
      let event = scheduler.currentEventOnClick.event;
      let resourceId = event.resourceId;
      let timeslotAtMouse = findTimeSlot(scheduler.matrixPositions[resourceId].timeslots,mouseY)

      if(timeslotAtMouse && (timeslotAtMouse.bottom - event.top >= 25 ) && timeslotAtMouse.bottom != event.bottom){
        let newHeight = timeslotAtMouse.bottom - event.top;
        let newBottom =  timeslotAtMouse.bottom;
        let newToTimeInMoment = timeslotAtMouse.toTimeInMoment;
        let newToTimeInHHMM = timeslotAtMouse.toTimeInStr;
        let newToTime = timeslotAtMouse.toTimeInMoment;
        let newDuration = timeslotAtMouse.toTimeInMoment.diff(event.fromTimeInMoment,'minutes');
        let newCurrentEventOnClick =  {...scheduler.currentEventOnClick,event:{...event, height:newHeight, bottom:newBottom, toTimeInMoment:newToTimeInMoment, toTimeInHHMM:newToTimeInHHMM, duration:newDuration, toTime:newToTime}}
        dispatch({type:UPDATE_EVENT,payload:newCurrentEventOnClick})
      }
    }else if(scheduler.currentEventOnClick.isClickOnEvent){
      //check for move the event
      //this.isMovingEvent = true;
      let resourceId = scheduler.currentEventOnClick.event.resourceId;
      let left = scheduler.currentEventOnClick.event.left;
      let width = scheduler.currentEventOnClick.event.width;
      let resourceAtMouse = findResource(scheduler.columns,mouseX);
      //console.log('resourceAtMouse = ',resourceAtMouse);
      if(resourceAtMouse){
        resourceId = resourceAtMouse.resourceId;
        left = resourceAtMouse.left;
        width = resourceAtMouse.width;
      }

      let timeslotAtMouse = findTimeSlot(scheduler.matrixPositions[resourceId].timeslots,mouseY)

      if(resourceAtMouse && timeslotAtMouse && (timeslotAtMouse.top != scheduler.currentEventOnClick.event.top || left != scheduler.currentEventOnClick.event.left)){
        let newToTime = moment(timeslotAtMouse.timeInMoment).add(scheduler.currentEventOnClick.event.duration,'m');
        let newCurrentEventOnClick =  {...scheduler.currentEventOnClick,event:{...scheduler.currentEventOnClick.event,
                                                                                top: timeslotAtMouse.top,
                                                                                bottom: timeslotAtMouse.top + scheduler.currentEventOnClick.event.height,
                                                                                fromTimeInHHMM: timeslotAtMouse.timeInStr,
                                                                                fromTimeInMoment: timeslotAtMouse.timeInMoment,
                                                                                toTimeInMoment: newToTime,
                                                                                toTimeInHHMM: newToTime.format('HH:mm'),
                                                                                left,
                                                                                width,
                                                                                resourceId,
                                                                                opacity: 0.7,
                                                                              }};
        dispatch({type:UPDATE_EVENT,payload:newCurrentEventOnClick})

      }
    }else if(scheduler.mouseAction.isClickOnTimeSlot){
      //this.isClickOnTimeSlot
      //update position for selecting timeslots
      //this.props.setMouseSelecting(e);
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
    }



    }
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
