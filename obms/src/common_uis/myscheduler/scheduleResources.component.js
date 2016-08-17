import React, { Component,PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'underscore'

import ScheduleResourceSlot from './ScheduleResourceSlot.component';
import ScheduleTimeSlot from './ScheduleTimeSlot.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';
import ScheduleGroupByDuration from './ScheduleGroupByDuration.component';

export default class ScheduleResources extends Component {

  static propTypes = {
    isContent: PropTypes.bool,
    hasTimeSlots: PropTypes.bool
  }

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

  _buildTimeSlots(minTime,maxTime,minDuration,isFirstForTime,buildForResource){
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
    if(buildForResource){
      //in case build time slots for resource; must use the duration of the resource
      //the min resouce is used to build the time column
      resourceId = buildForResource.resourceId;


      numberTimeSlotsInGroup = buildForResource.currentRoster.duration/minDuration;
      /*
      Run through all events of the display day to create a list oj event object
      */

      if(buildForResource.currentRoster.events){
        buildForResource.currentRoster.events.map(event=>{
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
            fullName: event.fullName,
            top: null,
            left: null,
            bottom: null,
            width: null,
            height: null,
            leftInPercent: 1,
            rightInPercent: 1,
            zIndex: 1,
            opacity: 1
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

      if(buildForResource){
        let rosterFromTime = buildForResource.currentRoster.fromTimeInMoment;
        let rosterToTime = buildForResource.currentRoster.toTimeInMoment;
        //Set enable timeslots for resource from time - to time
        if( currentTime.isSameOrAfter(rosterFromTime) && currentTime.isSameOrBefore(rosterToTime) ){
              isEnable = true;
        }
        //Assign event object for timeslot
        events.map(event=>{
          if(event.toTimeInMoment.isSameOrAfter(currentTime) && event.fromTimeInMoment.isSameOrBefore(currentTime)){
              eventObject = event;
              eventsInGroup.push(eventObject);
          }
        });
      }
      //console.log('resourceId=',resourceId,'eventObject = ',eventObject,currentTime.format('HH:mm'));
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

      let makeGroup = function(isEnableForLastElement){
        groupToTimeInStr = currentTime.format('HH:mm');
        groupToTimeInMoment = moment(currentTime);
        let events = [...eventsInGroup];
        //console.log('resourceId=',resourceId,'events = ',events,currentTime.format('HH:mm'));
        if(isEnableForLastElement){
          //If the isEnable of last element = true => insert the whole timeslots array into the group
          groups.push(
                      <ScheduleGroupByDuration
                        key={groupId}
                        id={groupId}
                        isFirstForTime={isFirstForTime}
                        resourceId={resourceId}
                        timeInStr={groupTimeInStr}
                        timeInNumber={groupTimeInNumber}
                        timeInMoment={groupTimeInMoment}
                        toTimeInStr={groupToTimeInStr}
                        toTimeInMoment={groupToTimeInMoment}
                        isEnable={isEnable}
                        events={events}
                      >
                        {timeslots}
                      </ScheduleGroupByDuration>
                    );
        }else{
          //If the isEnable of last element = false => need to seperate the disable element and enable element into 2 groups
          //the enable group from 0 -> length - 2
          let lengthOfTimeSlots = timeslots.length;
          if(lengthOfTimeSlots == 1){
            //if length == 1 , it means that only disable in the array => no need to separate
            groups.push(
                        <ScheduleGroupByDuration
                          key={groupId}
                          id={groupId}
                          isFirstForTime={isFirstForTime}
                          resourceId={resourceId}
                          timeInStr={groupTimeInStr}
                          timeInNumber={groupTimeInNumber}
                          timeInMoment={groupTimeInMoment}
                          toTimeInStr={groupToTimeInStr}
                          toTimeInMoment={groupToTimeInMoment}
                          isEnable={isEnable}
                          events={events}
                        >
                          {timeslots}
                        </ScheduleGroupByDuration>
                      );
          }else{

            groups.push(
                        <ScheduleGroupByDuration
                          key={groupId}
                          id={groupId}
                          isFirstForTime={isFirstForTime}
                          resourceId={resourceId}
                          timeInStr={groupTimeInStr}
                          timeInNumber={groupTimeInNumber}
                          timeInMoment={groupTimeInMoment}
                          toTimeInStr={groupToTimeInStr}
                          toTimeInMoment={groupToTimeInMoment}
                          isEnable={true}
                          events={events}
                        >
                          {
                            timeslots.map((timeslot,index)=>{
                                if(index<=lengthOfTimeSlots-2)
                                  return timeslot;
                                else return null;
                            })
                          }
                        </ScheduleGroupByDuration>
                      );

            groupId++;
            //the disable = length - 1
            groups.push(
                        <ScheduleGroupByDuration
                          key={groupId}
                          id={groupId}
                          isFirstForTime={isFirstForTime}
                          resourceId={resourceId}
                          timeInStr={groupTimeInStr}
                          timeInNumber={groupTimeInNumber}
                          timeInMoment={groupTimeInMoment}
                          toTimeInStr={groupToTimeInStr}
                          toTimeInMoment={groupToTimeInMoment}
                          isEnable={false}
                          events={events}
                        >
                        {
                          timeslots[lengthOfTimeSlots-1]
                        }

                        </ScheduleGroupByDuration>
                      );

          }
        }

        timeslots = [];
        eventsInGroup = [];
        groupId++;
      };

      if(!isEnable){
        makeGroup(isEnable);
      }else{
        if(timeslots.length == numberTimeSlotsInGroup){
          makeGroup(isEnable)
        }

      }
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


      let resourceSlots = [];
      if(this.props.hasTimeSlots){
        //console.log(' this.resources = ',this.resources,'minTime = ',minTime,' maxTime = ',maxTime);
        this.resources.map((res,index)=>{
          //console.log('will build timeslots for resource = ',res);
          if(res.currentRoster){
            //Only generate resource that has the currentRoster = displayDate
            resourceSlots.push(
                                  <ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}>
                                    {this._buildTimeSlots(minTime,maxTime,minDuration,false,res)}
                                  </ScheduleResourceSlot>
                                );

          }
        });
      }else {
        this.context.resources.map((res,index)=>{
          resourceSlots.push(<ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent} />);
        });
      }

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
