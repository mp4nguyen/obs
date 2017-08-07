import {
        SET_DISPLAY_DATE,
        SET_RESOURCE,
        PROCESSING_RESOURCE,
        SET_MIN_MAX_DURATION,
      } from './actions';

let initState = {
  resource: [],
  resourcesAfterProcess:[],
  displayDate: null,
  minTime: null,
  maxTime: null,
  minDuration: 0,

};


const ACTION_HANDLERS = {
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
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
