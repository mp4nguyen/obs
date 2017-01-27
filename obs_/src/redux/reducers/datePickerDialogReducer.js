
import {OPEN_DATEPICKER_DIALOG,CLOSE_DATEPICKER_DIALOG,DATEPICKER_ON_SELECT} from '../actions/types';

let datePickerDialogReducer = function(datePickerDialog = {showDialog:false,currentDateSelection: ''}, action) {
  console.log('datePickerDialogReducer = ',action);
  switch (action.type) {
    case OPEN_DATEPICKER_DIALOG:
    	return Object.assign({},datePickerDialog,{showDialog:true});
    case CLOSE_DATEPICKER_DIALOG:
      return Object.assign({},datePickerDialog,{showDialog:false});
    case DATEPICKER_ON_SELECT:
      return Object.assign({},datePickerDialog,{currentDateSelection:action.date.format('DD/MM/YYYY')});
    default:
      return datePickerDialog;

    return datePickerDialog;
  }
};

export default datePickerDialogReducer;
