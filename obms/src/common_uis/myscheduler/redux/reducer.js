import {
        SET_DISPLAY_DATE,
        SET_RESOURCE,
        PROCESSING_RESOURCE,
        SET_MIN_MAX_DURATION,
        SET_MATRIX_POSITION,
        SET_MATRIX_POSITIONS,
        SET_EVENT,
        SET_EVENTS,
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
      } from './actions';

let initState = {
  resource: [],
  resourcesAfterProcess:[],
  columns:[],
  currentResource:null,
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
    return {...state,displayDate:action.payload,matrixPositions: {}, events:null,columns:[],currentResource:null};
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

};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
