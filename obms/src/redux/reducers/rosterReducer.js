import {
          ROSTER_OPEN_CLICK_DAY_MODAL,
          ROSTER_CLOSE_CLICK_DAY_MODAL,
          ROSTER_OPEN_EVENT_DAY_MODAL,
          ROSTER_CLOSE_EVENT_DAY_MODAL,
          ROSTER_UPDATE_MODAL_FIELD
        } from '../actions/types';

let rosterReducer = function(roster={
                                      isClickDayModalOpen:false,
                                      isEventDayModalOpen:false,
                                      currentRoster:{}
                                    },action){
  console.log('companyReducer = ',action);
  switch(action.type){
    case ROSTER_OPEN_CLICK_DAY_MODAL:
        return Object.assign({},roster,{isEventDayModalOpen:action.isOpen,currentRoster:action.currentRoster});
    case ROSTER_CLOSE_CLICK_DAY_MODAL:
        return Object.assign({},roster,{isClickDayModalOpen:action.isOpen});
    case ROSTER_OPEN_EVENT_DAY_MODAL:
        return Object.assign({},roster,{isEventDayModalOpen:action.isOpen,currentRoster:action.currentRoster});
    case ROSTER_CLOSE_EVENT_DAY_MODAL:
        return Object.assign({},roster,{isEventDayModalOpen:action.isOpen});
    case ROSTER_UPDATE_MODAL_FIELD:
        var object2 = Object.assign({},roster.currentRoster,action.field);
        return Object.assign({},roster,{currentRoster:object2});
    default:
        return roster;
  }
}

export default rosterReducer;
