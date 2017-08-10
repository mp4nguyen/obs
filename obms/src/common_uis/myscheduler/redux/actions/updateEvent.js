import moment from 'moment';
import HashMap from 'HashMap';

import {UPDATE_EVENT,SET_EVENTS} from './index';

// import {findResource} from '../../helper';

export default function updateEvent(currentEventOnClick){
  return (dispatch,getState) => {
    dispatch({type:UPDATE_EVENT,payload:currentEventOnClick})
  }
}
