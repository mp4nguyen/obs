import moment from 'moment';
import clone from 'clone';

import {
        SET_DISPLAY_DATE,
        SET_RESOURCE,
        PROCESSING_RESOURCE,
        SET_MIN_MAX_DURATION,
        SET_MATRIX_POSITION,
        SET_MATRIX_POSITIONS,
        SET_EVENT,
        SET_EVENTS,
        APPEND_EVENT,
        APPEND_EVENTS,
        UPDATE_EVENT,
        REMOVE_EVENT,
        SET_CURRENT_RESOURCE,
        SET_COLUMNS,
        SET_MOUSE_DOWN_ON_TIME_SLOT,
        SET_REF,
        SET_MAIN_FRAME_POSITION,
        SET_MOUSE_ACTION,
        SET_SCROLLER,
        RESET_SELECTING_AREA,
        SET_CURRENT_EVENT_ON_CLICK,
        SET_CURRENT_ROSTERIDS,
      } from './actions';

let initState = {
  resource: [],
  resourcesAfterProcess:[],
  columns:[],
  currentResource:null,
  currentRosterIds:[],
  events: {},
  displayDate: null,
  minTime: null,
  maxTime: null,
  minDuration: 0,
  matrixPositions: {},
  refs: {},
  mainFramePosition: {},
  selectingArea: {},
  mouseAction: {isClickOnTimeSlot:false,isMouseSelecting:false},
  scroller: {scrollerForTimeSlots: null, scrollerForTimeColumn: null, scrollerForHeaders: null},
  currentEventOnClick: {event:null,isClickOnEvent:false,isResizeOnEvent:false,isMovingEvent:false},
};


const ACTION_HANDLERS = {
  [SET_SCROLLER]: (state, action) => {
    return {...state,scroller: {...state.scroller,...action.payload}};
  },
  [SET_MAIN_FRAME_POSITION]: (state, action) => {
    return {...state,mainFramePosition:action.payload};
  },
  [SET_REF]: (state, action) => {
    return {...state,refs:{...state.refs,...action.payload}};
  },
  [SET_DISPLAY_DATE]: (state, action) => {
    return {...state,displayDate:action.payload, events:null,columns:[],currentResource:null};
  },
  [SET_RESOURCE]: (state, action) => {
    return {...state,resource:action.payload};
  },
  [PROCESSING_RESOURCE]: (state, action) => {
    return {...state,resourcesAfterProcess:action.payload};
  },
  [SET_MIN_MAX_DURATION]: (state, action) => {
    return {...state,minTime:action.payload.minTime,maxTime:action.payload.maxTime,minDuration:action.payload.minDuration};
  },
  [SET_MATRIX_POSITION]: (state, action) => {
    return {...state,matrixPositions:action.payload};
  },
  [SET_MATRIX_POSITIONS]: (state, action) => {
    return {...state,matrixPositions:action.payload};
  },
  [SET_EVENT]: (state, action) => {
    let event = action.payload;
    let events = {...state.events};
    let findResource = events[event.resourceId];
    if(findResource){
      let findEvent = findResource[event.eventId];
      if(!findEvent){
        if(!event.fromTime){
          event.fromTime = event.fromTimeInMoment.format('DD/MM/YYYY HH:mm:ss');
          event.fromTimeInHHMM = event.fromTimeInMoment.format('HH:mm');
          event.toTime = event.toTimeInMoment.format('DD/MM/YYYY HH:mm:ss');
          event.toTimeInHHMM = event.toTimeInMoment.format('HH:mm');
        }
        findResource[event.eventId] = event;
      }
    }else{
      events[event.resourceId] = {[event.eventId]: event};
    }

    return {...state,events};

  },
  [SET_EVENTS]: (state, action) => {
    return {...state,events:action.payload};
  },
  [APPEND_EVENTS]: (state, action) => {
    let matrixPositions = state.matrixPositions;
    let resourcesAfterProcess = state.resourcesAfterProcess;
    let events = action.payload;
    let eventsObj = {};
    let minutesOfDay = function(m){
      return m.minutes() + m.hours() * 60;
    }
    console.log(" --> matrixPositions = ",matrixPositions);

    events.forEach(event=>{
      let doctorObj = eventsObj[event.doctorId];
      let column = matrixPositions[event.doctorId];
      let slots = [];

      console.log(" --> column = ",column);
      console.log(" --> event = ",event);
      console.log(" ------> event.fromTime = ",moment(event.fromTime));
      console.log(" ------> event.toTime = ",moment(event.toTime));

      column.timeslots.forEach(slot=>{
        ///  (a.start < b.end && b.start < a.end) => check overlap
        if( minutesOfDay(moment(event.fromTime)) <= minutesOfDay(slot.toTimeInMoment) && minutesOfDay(slot.timeInMoment) <= minutesOfDay(moment(event.toTime)) ){
          slots.push(slot);
        }
      });


      console.log(" --> slots = ",slots);


      if(slots.length > 0){
        event.top = slots[0].top;
        event.left = slots[0].left;
        event.width = slots[0].width;
        event.bottom = slots[slots.length-1].bottom;
        event.height = event.bottom - event.top;
        event.leftInPercent = 1;
        event.rightInPercent = 1;
        event.zIndex = 1;
        event.opacity = 1;
      }

      if(doctorObj){
        doctorObj[event.eventId] = event;
      }else{
        eventsObj[event.doctorId] = {[event.eventId] : event};
      }
    });

    for(let i = 0; i < resourcesAfterProcess.length; i++){
      let res = resourcesAfterProcess[i];
      if(eventsObj[res.resourceId]){
        resourcesAfterProcess[i].currentRoster.events = eventsObj[res.resourceId];
      }
    }

    return {...state,resourcesAfterProcess,events:eventsObj};
  },
  [APPEND_EVENT]: (state, action) => {
    //Update event element for events array
    //console.log('ScheduleFrame._updateEvent .....................................');
    let matrixPositions = state.matrixPositions;
    let resourcesAfterProcess = clone(state.resourcesAfterProcess);
    let events = JSON.parse(JSON.stringify(state.events));
    let event = {...action.payload,...action.calendar};
    //let calendar = {...action.calendar}

    event.leftInPercent = 1;
    event.rightInPercent = 1;
    event.zIndex = 1;

    ///////////

    for(let i = 0; i < resourcesAfterProcess.length; i++){
      let res = resourcesAfterProcess[i];
      if(res.resourceId == event.resourceId){
        console.log(" i = ",i);
        console.log(" res = ",res);
        console.log(" event = ",event);
        console.log(" resourcesAfterProcess[i] = ",resourcesAfterProcess[i]);
        resourcesAfterProcess[i].currentRoster.events[event.eventId] = event;
        break;
      }
    }
    ///////////
    let findResource = events[event.resourceId];

    if(findResource){
      findResource[event.eventId] = event;
      events[event.resourceId] = findResource;
    }else{
      events[event.resourceId] = {[event.eventId]: event};
    }


    return {...state,events:{...events},resourcesAfterProcess};
  },
  [UPDATE_EVENT]: (state, action) => {
    //Update event element for events array
    //console.log('ScheduleFrame._updateEvent .....................................');
    let events = JSON.parse(JSON.stringify(state.events));
    let event = {...action.payload.event};

    event.leftInPercent = 1;
    event.rightInPercent = 1;
    event.zIndex = 1;

    let findResource = events[event.resourceId];
    if(findResource){
      //console.log("updateEvent.js => findResource = ",findResource);
      for(var eventId in findResource){
        let e = findResource[eventId];
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
      }

      // var pEvent = findResource.get(event.eventId);
      // pEvent = event;
      findResource[event.eventId] = event;
      events[event.resourceId] = findResource;
    }else{
      events[event.resourceId] = {[event.eventId]: event};
    }


    return {...state,events:{...events},currentEventOnClick:action.payload};
  },
  [REMOVE_EVENT]: (state, action) => {
    let events = JSON.parse(JSON.stringify(state.events));
    let event = {...action.payload};
    let findResource = events[event.resourceId];
    if(findResource){
      delete findResource[event.eventId];
    }

    return {...state,events:{...events}};
  },
  [SET_CURRENT_RESOURCE]: (state, action) => {
    return {...state,currentResource:action.payload};
  },
  [SET_COLUMNS]: (state, action) => {
    return {...state,columns:[...state.columns,action.payload]};
  },
  [SET_MOUSE_ACTION]: (state, action) => {
    return {...state,mouseAction: {...state.mouseAction,...action.payload}};
  },
  [SET_MOUSE_DOWN_ON_TIME_SLOT]: (state, action) => {
    return {...state,selectingArea:{...state.selectingArea,...action.payload}};
  },
  [RESET_SELECTING_AREA]: (state, action) => {
    return {...state,selectingArea:{}};
  },
  [SET_CURRENT_EVENT_ON_CLICK]: (state, action) => {
    return {...state,currentEventOnClick:action.payload};
  },
  [SET_CURRENT_ROSTERIDS]: (state, action) => {
    return {...state,currentRosterIds:action.payload};
  },

};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
