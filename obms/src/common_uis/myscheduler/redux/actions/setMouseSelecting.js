import ReactDOM from 'react-dom';
import moment from 'moment';

import {getBoundsForNode,findTimeSlot} from '../../helper';
import {SET_MOUSE_DOWN_ON_TIME_SLOT,SET_MOUSE_ACTION} from './index'

export default function setMouseSelecting(e){
  return (dispatch,getState) => {
    var scheduler = getState().scheduler;
    let resourceId = scheduler.selectingArea.resourceId;

    let mouseY = e.pageY;
    let mouseX = e.pageX;

    if(this.scrollerForTimeSlots){
      mouseY = e.pageY + this.scrollerForTimeSlots.scrollTop;
      mouseX = e.pageX + this.scrollerForTimeSlots.scrollLeft;
    }

    //console.log('mouseX = ',mouseX,'mouseY = ',mouseY);

    //this.isMouseSelecting = true;
    dispatch({type:SET_MOUSE_ACTION,payload:{isMouseSelecting: true}})

    let timeslotAtMouse = findTimeSlot(scheduler.matrixPositions[resourceId].timeslots,mouseY)
    if(timeslotAtMouse){

      this.setState({selectingArea:Object.assign({},this.state.selectingArea,{
                                      height: timeslotAtMouse.bottom - this.state.selectingArea.top,
                                      bottom: timeslotAtMouse.bottom,
                                      toTimeInMoment: timeslotAtMouse.toTimeInMoment,
                                      toTimeInStr: timeslotAtMouse.toTimeInStr,
                                      duration: timeslotAtMouse.toTimeInMoment.diff(this.state.selectingArea.fromTimeInMoment,'minutes')

                                   })
                    });
    }

    dispatch({type:SET_MOUSE_DOWN_ON_TIME_SLOT,payload:selectingArea})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
