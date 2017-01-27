import React,{Component,PropTypes} from 'react';
import moment from 'moment';
var classNames = require( 'classnames' ); 

class ClinicCalendars extends Component{
  
  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    setCalendarForCurrentBooking: PropTypes.func.isRequired,
    clinic: PropTypes.object.isRequired,
    calendars: PropTypes.array.isRequired
  };

  _onClick(cal){
    console.log('clicked on clinical calendar...',cal);
    this.props.setCalendarForCurrentBooking(cal,this.props.clinic);
    this.context.router.push('/MakeABooking');
  }

	render(){
    
    if(!this.props.calendars){
      return (<p>No time slot</p>)
    }            
		
    return(
      <div>
            {
                this.props.calendars.map(
                  cal=>{                    
                    return(<a style={{margin:'5px'}} className="btn btn-lg btn-theme-colored" onClick={this._onClick.bind(this,cal)}>{cal.calendarTimeInStr}</a>);      
                  })                                                               
            }            
      </div>              
    )      
    
	}
}


export default ClinicCalendars;