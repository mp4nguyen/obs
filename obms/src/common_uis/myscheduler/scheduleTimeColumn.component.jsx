import React, { Component,PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'underscore'

import ScheduleResourceSlot from './ScheduleResourceSlot.component';
import ScheduleTimeSlot from './ScheduleTimeSlot.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';
import ScheduleGroupByDuration from './ScheduleGroupByDuration.component';

export default class ScheduleTimeColumn extends Component {

  static contextTypes = {
    resources: PropTypes.array,
    displayDate: PropTypes.objectOf(moment)
  };

  constructor(props) {
     super(props);
     this.resources = [];
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //only allow to render 1 time when initial the Schedule
    //If nedd to re-render the timeslots based on the condition like adding more time ....
    // => add more code to compare here
    return !_.isEqual(nextContext,this.context);
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

  _buildTimeSlots(minTime,maxTime,minDuration,isFirstForTime){
    //console.log('build slot...... minDuration =',minDuration);
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
    let currentTime = moment(minTime);
    let lastTime = moment(maxTime);
    let duration = minDuration;
    let resourceId = null;
    let events = [];
    let groupId = 0;
    let numberTimeSlotsInGroup = 1;

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

      this.resources = this.context.resources;
      //console.log('this.resources=',this.context.resources);
      //loop through all rosters of doctors to find the min time and max time of the display day
      //will generate the time slots for all resources from 'minTime' -> 'maxTime'

      let minTime,maxTime,minDuration;
      let UCLN = function(x,y){
        while (x!=y) {
          if(x>y) x=x-y;
          else y=y-x;
        }
        return x;
      }

      this.resources.map(res=>{
          let doctor = res;

          if(doctor.currentRoster){
            //Only generate resource that has the currentRoster = displayDate
            //need to implement the code to find the day of roster that is the display day
            //now, just take the first one
            doctor.currentRoster.fromTimeInMoment = moment(doctor.currentRoster.fromTime,'DD/MM/YYYY HH:mm:ss');
            doctor.currentRoster.toTimeInMoment = moment(doctor.currentRoster.toTime,'DD/MM/YYYY HH:mm:ss');
            if(!minTime){
              minTime = doctor.currentRoster.fromTimeInMoment;
            }else if(minTime.isAfter(doctor.currentRoster.fromTimeInMoment)){
              minTime = doctor.currentRoster.fromTimeInMoment;
            }

            if(!maxTime){
              maxTime = doctor.currentRoster.toTimeInMoment;
            }else if(maxTime.isBefore(doctor.currentRoster.toTimeInMoment)){
              maxTime = doctor.currentRoster.toTimeInMoment;
            }

            if(!minDuration){
              minDuration = doctor.currentRoster.duration;
            }else{
              minDuration = UCLN(minDuration,doctor.currentRoster.duration);
            }
          }
      });


      let resourceSlots =
                          (
                            <ScheduleResourceSlot key={-1} isFirstForTime={true} hasTimeSlots={true}>
                              {this._buildTimeSlots(minTime,maxTime,minDuration,true)}
                            </ScheduleResourceSlot>
                          );


      return resourceSlots;
  }

  render() {
      console.log('render resources....');
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
