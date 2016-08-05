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

  _buildTimeSlots(isFirstForTime,buildForResource){
    //console.log('build slot......this.context.duration=',this.context.duration,this.context.fromTime,this.context.toTime);
    let timeslots = [];
    let timeFrame={};
    let rowObject = {};
    let currentTime = moment();
    let lastTime = moment();
    let duration = this.context.duration||15;

    //console.log('1.    currentTime = ',currentTime.format('DD/MM/YYYY HH:mm:ss'),' lastTime = ',lastTime.format('DD/MM/YYYY HH:mm:ss'));
    if(this.context.fromTime){
      currentTime = this.context.fromTime;
    }else{
      currentTime.set('hour', 7);
      currentTime.set('minute', 0);
      currentTime.set('second', 0);
      currentTime.set('millisecond', 0);
      //console.log('2.    currentTime = ',currentTime.format('DD/MM/YYYY HH:mm:ss'));
    }

    if(this.context.toTime){
      lastTime = this.context.toTime;
    }else{
      lastTime.set('hour', 18);
      lastTime.set('minute', 59);
      lastTime.set('second', 59);
      lastTime.set('millisecond', 0);
      //console.log('3.  lastTime = ',lastTime.format('DD/MM/YYYY HH:mm:ss'));
    }


    /*
    will run thought the current day each a duration time (for example:15 minutes)
    and create the timeFrame object,
    each property of timeFrame is an object that contain data of bookings of the doctor
    */
    while(currentTime.isSameOrBefore(lastTime)){
      let timeInStr = currentTime.format('HH:mm:ss');
      let timeInStrWithoutMark = currentTime.format('HHmmss');
      let label = null;
      let timeInNumber = Number(currentTime.minute());
      if(timeInNumber == 0){
        label = currentTime.format('HH:mm');
      }
      //timeslots.push({timeInStr,label});
      timeslots.push(<ScheduleTimeSlot key={timeInStr} timeInStr={timeInStr} timeInNumber={timeInStrWithoutMark} label={label} isFirstForTime={isFirstForTime} />);

      currentTime.add(duration,'m');
      //console.log('4.   adding 5 minutes into currentTime = ',currentTime.format('DD/MM/YYYY HH:mm:ss'),' lastTime = ',lastTime.format('DD/MM/YYYY HH:mm:ss'),' timeInStr = ',timeInStr);
    }

/*    //Only show the highlight when having the position of time slot and for the particular resource
    if(this.state.positionObject && buildForResource && this.props.mainFramePosition){
      if(buildForResource.title == this.state.currentResource.title){
        timeslots.push(<ScheduleHighLightTimeSlot key="highlight" positionObject={this.state.positionObject} mainFramePosition={this.props.mainFramePosition}/>);
      }
    }*/

    return timeslots;

  }



  _buildResourceFrame(){

      let resourceSlots = [];
      if(this.props.hasTimeSlots){
        resourceSlots.push(
                            <ScheduleResourceSlot key={-1} isFirstForTime={true} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}>
                              {this._buildTimeSlots(true)}
                            </ScheduleResourceSlot>
                          );
        this.context.resources.map((res,index)=>{
          resourceSlots.push(
                              <ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}>
                                {this._buildTimeSlots(false,res)}
                              </ScheduleResourceSlot>
                            );
        });
      }else {
        resourceSlots.push(<ScheduleResourceSlot key={-1} isFirstForTime={true} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}/>);
        this.context.resources.map((res,index)=>{
          resourceSlots.push(<ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent} hasTimeSlots={this.props.hasTimeSlots}/>);
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
