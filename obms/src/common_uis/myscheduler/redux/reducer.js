import {
        SET_DISPLAY_DATE,
        SET_RESOURCE,
        PROCESSING_RESOURCE,
      } from './actions';

let initState = {
  resource: [],
  resourcesAfterProcess:null,
  displayDate: null
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
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
