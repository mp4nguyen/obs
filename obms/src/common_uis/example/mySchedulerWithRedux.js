import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

//import Calendar from   "../../common_uis/components/calendar.component";
import MyScheduler from '../MyScheduler';
import * as actions from '../../redux/actions';

const log = (type) => console.log.bind(console, type);


class MySchedulerWithRedux extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state={eventWillAdd:null};
    this.currentEventId = 4;
  }

  componentWillMount(){
      this.props.fetchDoctorsForBookingModule();
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

    _selectingAreaCallback(selectingArea){
      console.log('_selectingAreaCallback = ',selectingArea);
  /*    this.state.resources.map(res=>{
        if(res.resourceId === selectingArea.resourceId){
          let newEvent = {
                            resourceId:selectingArea.resourceId,
                            eventId: this.currentEventId++,
                            fromTimeInMoment: selectingArea.fromTimeInMoment,
                            toTimeInMoment: selectingArea.toTimeInMoment,
                            title:'New Event',
                            top: selectingArea.top,
                            left: selectingArea.left,
                            right: selectingArea.right,
                            height: selectingArea.height,
                            width: selectingArea.width,
                            duration: selectingArea.duration
                          };
          this.setState({eventWillAdd:newEvent});
          res.rosters[0].events.push(newEvent);
        }
      });
*/
    }

    _clickingOnEventCallback(event){
      console.log('ScheduleFrame._clickingOnEventCallback = ',event);
    }

    _resizingEventCallback(event){
      console.log('ScheduleFrame._resizingEventCallback = ',event);
    }

    _movingEventCallback(event){
      console.log('ScheduleFrame._movingEventCallback = ',event);
    }

    render() {
        let displayDate = moment('17/08/2016','DD/MM/YYYY');
        return (
        (
          <MyScheduler
            resources={this.props.booking.doctors}
            displayDate={displayDate}
            selectingAreaCallback={this._selectingAreaCallback.bind(this)}
            clickingOnEventCallback={this._clickingOnEventCallback.bind(this)}
            resizingEventCallback={this._resizingEventCallback.bind(this)}
            movingEventCallback={this._movingEventCallback.bind(this)}
            eventWillAdd = {this.state.eventWillAdd}
            />
        )
      );
    }
}


function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(MySchedulerWithRedux);
