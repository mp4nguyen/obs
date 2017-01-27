import React, { Component,PropTypes } from 'react';
import moment from 'moment';

import Table from './table.component';
import ScheduleFrame from './ScheduleFrame.component';

export default class MyScheduler extends Component {

  static propTypes = {
    data: PropTypes.array,
    onRowClick: PropTypes.func
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _rowClick(row){
    console.log('click on row',row);
    this.props.onRowClick(row);
  }

  mySqlDateToMoment(dateSTR) {
    var dateInStr = dateSTR + '';
    if(dateSTR){
        var t = dateInStr.split(/[- : T .]/);
        var dateinStrFormat = t[0]+'/'+t[1]+'/'+t[2]+' '+t[3]+':'+t[4]+':'+t[5];

        // Apply each element to the Date function
        //var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
        //var myDate = new Date(dateSTR);
        //console.log(">>>apt date from send email = ",dateSTR,"   ",t,"   ",d);
        //console.log(myDate.getMonth()," ",myDate.getDay()," ",myDate.getYear());
        return moment(dateinStrFormat,'YYYY/MM/DD HH:mm:ss'); // No TZ subtraction on this sample
    }
    return null;
  }

  _buildTimeFrame(columns){
    console.log('_buildTimeFrame columns=',columns);
    if(!columns || columns.length == 0){
      return {};
    }else{
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
      //create empty cell for each doctor for each time slot
      columns.forEach((doctor)=>{
        rowObject[doctor.id]={};
      });
      /*
      will run thought the current day each a duration time (for example:15 minutes)
      and create the timeFrame object,
      each property of timeFrame is an object that contain data of bookings of the doctor
      */
      while(currentTime.isSameOrBefore(lastTime)){
        timeFrame[currentTime.format('HH:mm')]= Object.assign({},{time:currentTime.format('DD/MM/YYYY HH:mm')},rowObject);
        currentTime.add(15,'m');
      }
      //Will update doctor booking into the empty slot
      columns.forEach((doctor)=>{
        doctor.Bookings.forEach((booking)=>{
          //console.log(booking.start);
          //console.log();
          let startBooking = this.mySqlDateToMoment(booking.start);
          let endBooking = this.mySqlDateToMoment(booking.end);
          timeFrame[startBooking.format('HH:mm')][booking.doctorId] = booking;
        });
      });
      console.log('timeframe = ',timeFrame);

      return timeFrame;
    }

  }
  //<Table columns={columns} data={data}/>
  render() {
      let fromTime = moment();
      let toTime = moment();
      fromTime.set('hour', 0);
      fromTime.set('minute', 0);
      fromTime.set('second', 0);
      fromTime.set('millisecond', 0);

      toTime.set('hour', 18);
      toTime.set('minute', 59);
      toTime.set('second', 59);
      toTime.set('millisecond', 0);
      let resources=[
                      {title:'Hanh Nguyen'},
                      {title:'Steve Jobs'},
                      {title:'Tom Lee'},
                      {title:'Bronwyn Nicholson'},
                      {title:'Adrian Brooks'},
                      {title:'Hanh Nguyen'},
                      {title:'Steve Jobs'},
                      {title:'Tom Lee'},
                      {title:'Bronwyn Nicholson'},
                      {title:'Adrian Brooks'},
                      {title:'Hanh Nguyen'},
                      {title:'Steve Jobs'},
                      {title:'Tom Lee'},
                      {title:'Bronwyn Nicholson'},
                      {title:'Adrian Brooks'},
                      {title:'Hanh Nguyen'},
                      {title:'Steve Jobs'},
                      {title:'Tom Lee'},
                      {title:'Bronwyn Nicholson'},
                      {title:'Adrian Brooks'}                                            
                    ];
      return (
      (
        <ScheduleFrame fromTime={fromTime} toTime={toTime} duration={15} resources={resources}/>
      )
    );
  }
}
