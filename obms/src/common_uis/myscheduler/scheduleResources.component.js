import React, { Component,PropTypes } from 'react';
import moment from 'moment';

import ScheduleResourceSlot from './ScheduleResourceSlot.component';
import ScheduleTimeSlot from './ScheduleTimeSlot.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';

export default class ScheduleResources extends Component {

  static propTypes = {
    isContent: PropTypes.bool,
    hasTimeSlots: PropTypes.bool
  }

  static contextTypes = {
    resources: PropTypes.array,
    fromTime: PropTypes.object,
    toTime: PropTypes.object,
    duration: PropTypes.number
  };

  constructor(props) {
     super(props);
     this.resources = null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    //only allow to render 1 time when initial the Schedule
    //If nedd to re-render the timeslots based on the condition like adding more time ....
    // => add more code to compare here
    return false;
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

  _buildTimeSlots(minTime,maxTime,minDuration,isFirstForTime,buildForResource){
    //console.log('build slot...... buildForResource =',buildForResource);
    let timeslots = [];
    let timeFrame={};
    let rowObject = {};
    let currentTime = moment(minTime);
    let lastTime = moment(maxTime);
    let duration = minDuration;
    let resourceId = null;
    let events = [];
    if(buildForResource){
      //in case build time slots for resource; must use the duration of the resource
      //the min resouce is used to build the time column
      resourceId = buildForResource.resourceId;
      duration = buildForResource.rosters[0].duration;
      /*
      Run through all events of the display day to create a list oj event object
      */
      if(buildForResource.rosters[0].events){
        buildForResource.rosters[0].events.map(event=>{
          let fromTimeInMoment = moment(event.fromTime,'DD/MM/YYYY HH:mm:ss');
          let toTimeInMoment = moment(event.toTime,'DD/MM/YYYY HH:mm:ss');
          events.push({
            eventId: event.eventId,
            resourceId: event.resourceId,
            fromTime: event.fromTime,
            toTime: event.toTime,
            fromTimeInMoment: fromTimeInMoment,
            toTimeInMoment: toTimeInMoment,
            fromTimeInHHMM: fromTimeInMoment.format('HH:mm'),
            toTimeInHHMM: toTimeInMoment.format('HH:mm'),
            duration: toTimeInMoment.diff(fromTimeInMoment,'minutes'),
            title: event.title,
            top: null,
            left: null,
            bottom: null,
            width: null,
            height: null
          });
        });
      }
    }


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
      }

      currentTime.add(duration - 1,'m');
      let toTimeInStr = currentTime.format('HH:mm');
      let toTimeInMoment = moment(currentTime);

      if(buildForResource){
        let rosterFromTime = buildForResource.rosters[0].fromTimeInMoment;
        let rosterToTime = buildForResource.rosters[0].toTimeInMoment;
        //Set enable timeslots for resource from time - to time
        if( currentTime.isSameOrAfter(rosterFromTime) && currentTime.isSameOrBefore(rosterToTime) ){
              isEnable = true;
        }
        //Assign event object for timeslot
        events.map(event=>{
          if(event.toTimeInMoment.isSameOrAfter(currentTime) && event.fromTimeInMoment.isSameOrBefore(currentTime)){
              eventObject = event;
          }
        });
      }
      //console.log('resourceId = ',resourceId,'timeInStr = ',timeInStr,' duration = ',duration);
      //timeslots.push({timeInStr,label});
      timeslots.push(<ScheduleTimeSlot
                          key={timeInStr}
                          resourceId={resourceId}
                          timeInStr={timeInStr}
                          timeInNumber={timeInStrWithoutMark}
                          timeInMoment={timeInMoment}
                          toTimeInStr={toTimeInStr}
                          toTimeInMoment={toTimeInMoment}
                          label={label}
                          isFirstForTime={isFirstForTime}
                          isEnable={isEnable}
                          event={eventObject}
                          />);

      currentTime.add(1,'m');
      //console.log('4.   adding 5 minutes into currentTime = ',currentTime.format('DD/MM/YYYY HH:mm:ss'),' lastTime = ',lastTime.format('DD/MM/YYYY HH:mm:ss'),' timeInStr = ',timeInStr);
    }



    return timeslots;

  }



  _buildResourceFrame(){
      //loop through all rosters of doctors to find the min time and max time of the display day
      //will generate the time slots for all resources from 'minTime' -> 'maxTime'
      this.resources = this.context.resources;
      let minTime,maxTime,minDuration;
      this.resources.map(res=>{
          let doctor = res;
          //need to implement the code to find the day of roster that is the display day
          //now, just take the first one
          doctor.rosters[0].fromTimeInMoment = moment(doctor.rosters[0].fromTime,'DD/MM/YYYY HH:mm:ss');
          doctor.rosters[0].toTimeInMoment = moment(doctor.rosters[0].toTime,'DD/MM/YYYY HH:mm:ss');
          if(!minTime){
            minTime = doctor.rosters[0].fromTimeInMoment;
          }else if(minTime.isAfter(doctor.rosters[0].fromTimeInMoment)){
            minTime = doctor.rosters[0].fromTimeInMoment;
          }

          if(!maxTime){
            maxTime = doctor.rosters[0].toTimeInMoment;
          }else if(maxTime.isBefore(doctor.rosters[0].toTimeInMoment)){
            maxTime = doctor.rosters[0].toTimeInMoment;
          }

          if(!minDuration){
            minDuration = doctor.rosters[0].duration;
          }else if(minDuration < doctor.rosters[0].duration){
            minDuration = doctor.rosters[0].duration;
          }

      });


      let resourceSlots = [];
      if(this.props.hasTimeSlots){
        resourceSlots.push(
                            <ScheduleResourceSlot key={-1} isFirstForTime={true} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}>
                              {this._buildTimeSlots(minTime,maxTime,minDuration,true)}
                            </ScheduleResourceSlot>
                          );
        //console.log(' this.resources = ',this.resources,'minTime = ',minTime,' maxTime = ',maxTime);
        this.resources.map((res,index)=>{
          console.log('will build timeslots for resource = ',res);
          resourceSlots.push(
                                <ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}>
                                  {this._buildTimeSlots(minTime,maxTime,minDuration,false,res)}
                                </ScheduleResourceSlot>
                              );
        });
      }else {
        resourceSlots.push(<ScheduleResourceSlot key={-1} isFirstForTime={true} isContent={this.props.isContent} />);
        this.context.resources.map((res,index)=>{
          resourceSlots.push(<ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent} />);
        });
      }

      return resourceSlots;
  }

  render() {
      //console.log('render resources....');
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
