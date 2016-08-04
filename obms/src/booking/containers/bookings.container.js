import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

//import Calendar from   "../../common_uis/components/calendar.component";
import Scheduler from   "../../common_uis/scheduler";
import * as actions from '../../redux/actions';

const log = (type) => console.log.bind(console, type);


class Bookings extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentWillMount(){
      this.props.fetchDoctorsForBookingModule();
      this.props.fetchBookingsForBookingModule();
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit company detail');
    //this.props.uploadPhotoDoctor(this.props.currentDoctor);

  }

  render() {

    return (
      (
        <div >
          <Scheduler data={this.props.booking.doctors}/>
        </div>
      )
    );
  }
}

/*<Calendar
  defaultView="agendaDay"
  resources={this.props.booking.doctors}
  events={this.props.booking.bookings}
/>*/

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(Bookings);
