import ReactDOM from 'react-dom';
import moment from 'moment';

import {getBoundsForNode} from '../../helper';
import {SET_MOUSE_ACTION,SET_MOUSE_DOWN_ON_TIME_SLOT} from './index'

export default function setMouseDownOnTimeSlot(timeslotPosition){
  return (dispatch,getState) => {
    let mainFramePosition = getState().scheduler.mainFramePosition;
    let displayDate = getState().scheduler.displayDate;
    let resourcesAfterProcess = getState().scheduler.resourcesAfterProcess;
    var fromTimeInMoment = moment(displayDate.format('DD/MM/YYYY') + ' ' + timeslotPosition.timeInMoment.format('HH:mm'),'DD/MM/YYYY HH:mm');
    var toTimeInMoment = moment(displayDate.format('DD/MM/YYYY') + ' ' + timeslotPosition.toTimeInMoment.format('HH:mm'),'DD/MM/YYYY HH:mm');
    var rosterId = null;

    //get roster id at that time and resource id
    //this happen because the matrixPositions no more being updated each time change displayDate
    //only update if currentRoster has segments are different
    for(let i=0;i<resourcesAfterProcess.length;i++){
      var res = resourcesAfterProcess[i];
      if(res.resourceId == timeslotPosition.resourceId){
        for(let j=0;j<res.currentRoster.segments.length;j++){
          var seg = res.currentRoster.segments[j];
          if(seg.fromTimeInMoment.isSameOrBefore(toTimeInMoment) && fromTimeInMoment.isSameOrBefore(seg.toTimeInMoment)){
            rosterId = seg.rosterId;
            break;
          }
        };
        break;
      }
    };

    let selectingArea = {
                            resourceId: timeslotPosition.resourceId,
                            rosterId,
                            topAfterOffset: timeslotPosition.top - mainFramePosition.top,
                            top: timeslotPosition.top,
                            left: timeslotPosition.left,
                            height: timeslotPosition.height,
                            width: timeslotPosition.width,
                            bottom: timeslotPosition.bottom,
                            right: timeslotPosition.right,
                            fromTimeInMoment,
                            fromTimeInStr: timeslotPosition.timeInStr,
                            toTimeInMoment,
                            toTimeInStr: timeslotPosition.toTimeInStr
                         };

    dispatch({type:SET_MOUSE_ACTION,payload:{isClickOnTimeSlot: true}})
    dispatch({type:SET_MOUSE_DOWN_ON_TIME_SLOT,payload:selectingArea})
    //this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  }
}
