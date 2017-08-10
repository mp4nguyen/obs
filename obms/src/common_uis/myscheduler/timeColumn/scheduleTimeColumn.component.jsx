import React, { Component,PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'underscore'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


import ScheduleResourceSlot from '../ScheduleResourceSlot.component';
import ScheduleTimeSlot from '../ScheduleTimeSlot.component';

class ScheduleTimeColumn extends Component {

  constructor(props) {
     super(props);
     this.resources = [];
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //only allow to render 1 time when initial the Schedule
    //If nedd to re-render the timeslots based on the condition like adding more time ....
    // => add more code to compare here
    //console.log("====>ScheduleTimeColumn.js.shouldComponentUpdate bool = ",_.isEqual(nextProps,this.props));
    return !_.isEqual(nextProps,this.props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  _rowClick(row){
    console.log('click on row',row);
    //this.props.onRowClick(row);
  }

  _celClick(cell){
    console.log('click on cell',cell);
  }

  _buildTimeSlots(isFirstForTime){

    let timeslots = [];
    let groups = [];
    let groupTimeInStr;
    let groupTimeInNumber;
    let groupTimeInMoment;
    let groupToTimeInStr;
    let groupToTimeInMoment;
    let eventsInGroup = [];

    let timeFrame={};
    let rowObject = {};
    let currentTime = moment(this.props.minTime);
    let lastTime = moment(this.props.maxTime);
    let duration = this.props.minDuration;
    let resourceId = null;
    let events = [];
    let groupId = 0;
    let numberTimeSlotsInGroup = 1;

    console.log(' ===> ScheduleTimeColumn._buildTimeSlots.resources =  ',this.resources);
    console.log(' ===> ScheduleTimeColumn._buildTimeSlots.minTime =  ',this.props.minTime,currentTime);
    console.log(' ===> ScheduleTimeColumn._buildTimeSlots.maxTime =  ',this.props.maxTime,lastTime);
    console.log(' ===> ScheduleTimeColumn._buildTimeSlots.minDuration =  ',this.props.minDuration,duration);

    //console.log('=+++++++++>build slot...... duration =',duration,' minTime = ',currentTime.format('DD/MM/YYYY HH:mm:ss'));
    /*
    will run thought the current day each a duration time (for example:15 minutes)
    and create the timeFrame object,
    each property of timeFrame is an object that contain data of bookings of the doctor
    */
    while(currentTime.isSameOrBefore(lastTime)){
      let timeInStr = currentTime.format('HH:mm');
      let timeInMoment = moment(currentTime);
      let timeInStrWithoutMark = currentTime.format('HHmmss');
      let label = null;
      let timeInNumber = Number(currentTime.minute());
      let isEnable = false;
      let eventObject = null;
      if(timeInNumber == 0){
        label = currentTime.format('HH:mm');
      }else if(timeInNumber%30 == 0){
        label = currentTime.format('HH:mm');
      }

      ///get fromTime for group
      if(timeslots.length == 0){
          groupTimeInStr = currentTime.format('HH:mm');
          groupTimeInMoment = moment(currentTime);
          groupTimeInNumber = currentTime.format('HHmmss');
      }

      currentTime.add(duration - 1,'m');
      let toTimeInStr = currentTime.format('HH:mm');
      let toTimeInMoment = moment(currentTime);


      //console.log('resourceId=',resourceId,'eventObject = ',eventObject,currentTime.format('HH:mm'));
      //console.log('resourceId = ',resourceId,'timeInStr = ',timeInStr,' duration = ',duration);
      //timeslots.push({timeInStr,label});


        groups.push(

                    <ScheduleTimeSlot
                                        key={timeInStr}
                                        resourceId={resourceId}
                                        timeInStr={timeInStr}
                                        timeInNumber={timeInStrWithoutMark}
                                        timeInMoment={timeInMoment}
                                        toTimeInStr={toTimeInStr}
                                        toTimeInMoment={toTimeInMoment}
                                        label={label}
                                        isFirstForTime={true}
                                        isEnable={true}
                                        event={eventObject}
                                        />

                  );

      currentTime.add(1,'m');
      //console.log('4.   adding 5 minutes into currentTime = ',currentTime.format('DD/MM/YYYY HH:mm:ss'),' lastTime = ',lastTime.format('DD/MM/YYYY HH:mm:ss'),' timeInStr = ',timeInStr);
    }

    return groups;

  }



  _buildResourceFrame(){
      //console.log('this.context.displayDate=',this.context.displayDate);
      if(this.props.resources.length > 0){
        this.resources = this.props.resources;
        //console.log('this.resources=',this.context.resources);
        //loop through all rosters of doctors to find the min time and max time of the display day
        //will generate the time slots for all resources from 'minTime' -> 'maxTime'

        let resourceSlots =
                            (
                              <ScheduleResourceSlot key={-1} isFirstForTime={true} hasTimeSlots={true}>
                                {this._buildTimeSlots(true)}
                              </ScheduleResourceSlot>
                            );


        return resourceSlots;
      }else{
        return null;
      }

  }

  render() {
      console.log((new Date()),'render ScheduleTimeColumn......... ');
      return (
        (
          <tbody>
            <tr>
              {this._buildResourceFrame()}
            </tr>
          </tbody>
        )
      );


  }
}

function bindAction(dispatch) {
  return {};
}

function mapStateToProps(state){
	return {
          resources: state.scheduler.resourcesAfterProcess,
          displayDate: state.scheduler.displayDate,
          minTime: state.scheduler.minTime,
          maxTime: state.scheduler.maxTime,
          minDuration: state.scheduler.minDuration
         };
}

export default connect(mapStateToProps,bindAction)(ScheduleTimeColumn);
