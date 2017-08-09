import moment from 'moment';
import HashMap from 'HashMap';

import {SET_CURRENT_EVENT_ON_CLICK,SET_EVENTS} from './index';

// import {findResource} from '../../helper';

export default function updateEvent(event,currentEventOnClick){
  return (dispatch,getState) => {
    let scheduler = getState().scheduler;

    //Update event element for events array
    //console.log('ScheduleFrame._updateEvent .....................................');
    console.log("updateEvent.js => event = ",event);
    let events = new HashMap(scheduler.events);
    event.leftInPercent = 1;
    event.rightInPercent = 1;
    event.zIndex = 1;

    let findResource = events.get(event.resourceId);
    console.log("updateEvent.js => findResource = ",findResource);

    findResource.forEach((e,i)=>{
      //console.log(e.fullName,'  ',e.top,' ',e.bottom,' ',e.leftInPercent,'  ',e.rightInPercent);
      if( (e.eventId != event.eventId) &&
          (e.resourceId === event.resourceId) &&
          (
            (e.top == event.top) ||
            (e.bottom == event.bottom) ||
            (e.top < event.top && event.top < e.bottom)||
            (e.top < event.bottom && event.bottom < e.bottom)||
            (event.top < e.top && e.top < event.bottom)||
            (event.top < e.bottom && e.bottom < event.bottom)
          )
        ){
        //event overlap in the same column => adjust the leftInPercent and rightInPercent
        e.leftInPercent = 1;
        e.rightInPercent = 30;
        e.zIndex = 1;
        event.leftInPercent = 30;
        event.rightInPercent = 1;
        event.zIndex = 2;
        console.log('moving event =',event,' event in array = ',e);
      }else{
        e.rightInPercent = 1;
        e.leftInPercent = 1;
        e.zIndex = 1;
      }
    });

    // var pEvent = findResource.get(event.eventId);
    // pEvent = event;
    findResource.set(event.eventId,event);
    events.set(event.resourceId,findResource);

    dispatch({type:SET_CURRENT_EVENT_ON_CLICK,payload:currentEventOnClick})
    dispatch({type:SET_EVENTS,payload:events})

  }
}
