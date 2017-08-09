import {
        SET_DISPLAY_DATE,
        SET_RESOURCE,
        PROCESSING_RESOURCE,
        SET_MIN_MAX_DURATION,
        SET_MATRIX_POSITION,
        SET_MATRIX_POSITIONS,
        SET_MOUSE_DOWN_ON_TIME_SLOT,
        SET_REF,
        SET_MAIN_FRAME_POSITION,
        SET_MOUSE_ACTION,
        SET_SCROLLER,
        RESET_SELECTING_AREA,
      } from './actions';

let initState = {
  resource: [],
  resourcesAfterProcess:[],
  events: null,
  displayDate: null,
  minTime: null,
  maxTime: null,
  minDuration: 0,
  matrixPositions: {},
  refs: {},
  mainFramePosition: {},
  selectingArea: {},
  mouseAction: {isClickOnTimeSlot:false,isMouseSelecting:false},
  scroller: {scrollerForTimeSlots: null, scrollerForTimeColumn: null, scrollerForHeaders: null}
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
    return {...state,displayDate:action.payload};
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
  [SET_MOUSE_ACTION]: (state, action) => {
    return {...state,mouseAction: {...state.mouseAction,...action.payload}};
  },
  [SET_MOUSE_DOWN_ON_TIME_SLOT]: (state, action) => {
    return {...state,selectingArea:{...state.selectingArea,...action.payload}};
  },
  [RESET_SELECTING_AREA]: (state, action) => {
    return {...state,selectingArea:{}};
  },
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
