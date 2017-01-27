var clone = require('clone');
import moment from 'moment';
import {SELECT_TIME,INITIAL_TIME,DATEPICKER_ON_SELECT} from '../actions/types';

let timeReducer = function(timeSelection = {currentDateSelection: '',times: [{name:"Today",isSelected:false},{name:"Tomorrow",isSelected:false},{name:"Later",isSelected:false}]}, action) {
  switch (action.type) {
    case SELECT_TIME:
      let newObject = clone(timeSelection);
      let ptoday = moment().format('DD/MM/YYYY');
      let ptomorrow = moment().add(1,'d').format('DD/MM/YYYY');
          
      newObject.times.map((time) => {
          time.name === action.time.name ? time.isSelected = true : time.isSelected = false
      });      
          
      if(action.time.name == 'Today'){
        newObject.currentDateSelection = ptoday;
      }else if(action.time.name == 'Tomorrow'){
        newObject.currentDateSelection = ptomorrow;
      }else{
        newObject.currentDateSelection = ''
      }

      return newObject;                
/*    	return times.map((time) => {return time.name === action.time.name ? 
    			Object.assign({},time,{isSelected:true}):Object.assign({},time,{isSelected:false})
    		})*/
    case INITIAL_TIME:
      let newObject2 = clone(timeSelection);
      let ptoday2 = moment().format('DD/MM/YYYY');
      var isFirst = true;
    
      newObject2.times.map((time) => {
          if(isFirst){
            isFirst = false;
            time.isSelected = true;
          }else{
            time.isSelected = false;
          }
        })      
      
      newObject2.currentDateSelection = ptoday2;
      return newObject2;            
    case DATEPICKER_ON_SELECT:
      let newObject3 = clone(timeSelection);
      newObject3.currentDateSelection = action.date.format('DD/MM/YYYY');
      return newObject3;            
    default: 
      return timeSelection;

    return timeSelection;  
  }
};

export default timeReducer;
