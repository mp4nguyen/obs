import React,{Component,PropTypes} from 'react';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import Dimensions from 'react-dimensions';

var classNames = require( 'classnames' ); 

class DatePicker extends Component{
  
  static propTypes = {
    datePickerOnSelect: PropTypes.func.isRequired
  };

  _onSelect(date){
    console.log(date)
    this.props.datePickerOnSelect(date);
  }

	render(){
    let minDate = moment().format('YYYY-MM-DD');    		
    return(
      <div>
        <InfiniteCalendar
            min={minDate}
            minDate={minDate}
            width={this.props.containerWidth}
            rowHeight={70}                 
            onSelect={this._onSelect.bind(this)}  
        />
      </div>              
    )      
    
	}
}


export default Dimensions()(DatePicker);

