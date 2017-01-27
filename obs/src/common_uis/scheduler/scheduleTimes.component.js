import React, { Component,PropTypes } from 'react';
import moment from 'moment';
import addons from 'react-addons-create-fragment';

import ScheduleTimeSlot from './ScheduleTimeSlot.component';

export default class ScheduleTimes extends Component {

  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
  };

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

  _buildTimeFrame(){
      let timeslots = [];
      let timeFrame={};
      let rowObject = {};
      let currentTime = moment();
      let lastTime = moment();
      currentTime.set('hour', 7);
      currentTime.set('minute', 0);
      currentTime.set('second', 0);
      currentTime.set('millisecond', 0);

      lastTime.set('hour', 18);
      lastTime.set('minute', 59);
      lastTime.set('second', 59);
      lastTime.set('millisecond', 0);
      var date = new Date();


      console.log('currentTime = ',currentTime,' lastTime= ',lastTime," date.toISOString() =",date.toISOString());
      /*
      will run thought the current day each a duration time (for example:15 minutes)
      and create the timeFrame object,
      each property of timeFrame is an object that contain data of bookings of the doctor
      */
      while(currentTime.isSameOrBefore(lastTime)){
        let timeInStr = currentTime.format('HH:mm:ss');
        let label = null;
        let timeInNumber = Number(currentTime.format('HHmm'));
        if(timeInNumber%60 == 0){
          label = currentTime.format('HH:mm');
        }
        timeslots.push({timeInStr,label});
        //timeslots.push(<ScheduleTimeSlot key={timeInStr} timeInStr={timeInStr} label={label}/>);
        currentTime.add(15,'m');
      }
      console.log('timeslots = ',timeslots);

      return timeFrame;
  }

  render() {
    console.log('chay ko');
    let rows = this._buildTimeFrame();
    return (
      (
        <tbody>
          Nothing
        </tbody>
      )
    );
  }
}
