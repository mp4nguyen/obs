import ReactDOM from 'react-dom';
import moment from 'moment';

import {getBoundsForNode} from '../../helper';
import {SET_MOUSE_ACTION,SET_MOUSE_DOWN_ON_TIME_SLOT} from './index'

export default function setMouseDownOnTimeSlot(timeslotPosition){
  return (dispatch,getState) => {
    var mainFramePosition = getState().scheduler.mainFramePosition;
    // var refs = getState().scheduler.refs;
    // var container = ReactDOM.findDOMNode(refs.mainContainerForTimeSlots);
    // var mainFrame = getBoundsForNode(container);
    //
    // console.log('frame._setMouseDownOnTimeSlot = ',timeslotPosition,'mainFrame=',mainFrame,'this.mainFramePosition=',mainFramePosition);
    //this.isClickOnTimeSlot = true;
    var selectingArea = {
                            resourceId: timeslotPosition.resourceId,
                            rosterId: timeslotPosition.rosterId,
                            topAfterOffset: timeslotPosition.top - mainFramePosition.top,
                            top: timeslotPosition.top,
                            left: timeslotPosition.left,
                            height: timeslotPosition.height,
                            width: timeslotPosition.width,
                            bottom: timeslotPosition.bottom,
                            right: timeslotPosition.right,
                            fromTimeInMoment: timeslotPosition.timeInMoment,
                            fromTimeInStr: timeslotPosition.timeInStr,
                            toTimeInMoment: timeslotPosition.toTimeInMoment,
                            toTimeInStr: timeslotPosition.toTimeInStr
                         };

    dispatch({type:SET_MOUSE_ACTION,payload:{isClickOnTimeSlot: true}})
    dispatch({type:SET_MOUSE_DOWN_ON_TIME_SLOT,payload:selectingArea})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
