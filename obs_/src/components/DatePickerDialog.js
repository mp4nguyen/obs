import React,{Component,PropTypes} from 'react';
import moment from 'moment';
import {Modal,ModalHeader,ModalBody,Button,OverlayTrigger,Popover,Tooltip} from 'react-bootstrap';
import InfiniteCalendar from 'react-infinite-calendar';
import DatePicker from './DatePicker';

var classNames = require( 'classnames' ); 

class DatePickerDialog extends Component{
  
  static propTypes = {
    datePickerDialog: PropTypes.object.isRequired,
    closeDatePickerDialog: PropTypes.func.isRequired,
    datePickerOnSelect: PropTypes.func.isRequired,
    currentPractitioner: PropTypes.object.isRequired
  };

  _close(date) {
    console.log('close dialog = ',date);
    this.props.closeDatePickerDialog(date,this.props.currentPractitioner.bookingTypeId);
  }

	render(){    		
    return(
      <div>
          <Modal show={this.props.datePickerDialog.showDialog} onHide={this._close.bind(this,this.props.datePickerDialog.currentDateSelection)} bsSize={'lg'}>
            <Modal.Body>
              <DatePicker datePickerOnSelect={this.props.datePickerOnSelect}/>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this._close.bind(this,this.props.datePickerDialog.currentDateSelection)}>Close</Button>
            </Modal.Footer>
          </Modal>
      </div>              
    )      
    
	}
}


export default DatePickerDialog;

