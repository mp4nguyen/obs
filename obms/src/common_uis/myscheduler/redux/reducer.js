import {
        SET_RESOURCE
      } from './actions';

let initState = {
  resource: [],
  resourcesAfterProcess:{},
};


const ACTION_HANDLERS = {
  [SET_RESOURCE]: (state, action) => {
    return {...state,resource:action.payload};
  },
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
