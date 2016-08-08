import React, { Component,PropTypes } from 'react';
import moment from 'moment';


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

  render() {
      var fromTime = moment();
      var toTime = moment();
/*      fromTime.set('hours', 6);
      fromTime.set('minute', 0);
      fromTime.set('second', 0);
      fromTime.set('millisecond', 0);

      toTime.set('hours', 23);
      toTime.set('minute', 59);
      toTime.set('second', 59);
      toTime.set('millisecond', 0);
*/
      let resources=[
                      {resourceId:0,title:'Hanh Nguyen',rosters:[{fromTime:'01/08/2016 08:00:00',toTime:'01/08/2016 15:00:00',duration:15,events:[
                                                                                                                                                  {resourceId:0,eventId:0,fromTime:'01/08/2016 11:30:00',toTime:'01/08/2016 11:59:00',title:'John Smith'},
                                                                                                                                                  {resourceId:0,eventId:1,fromTime:'01/08/2016 08:30:00',toTime:'01/08/2016 08:59:00',title:'Adam Smith'}
                                                                                                                                                  ]}]},
                      {resourceId:1,title:'Steve Jobs',rosters:[{fromTime:'01/08/2016 09:00:00',toTime:'01/08/2016 16:00:00',duration:15}]},
                      {resourceId:2,title:'Tom Lee',rosters:[{fromTime:'01/08/2016 07:00:00',toTime:'01/08/2016 14:00:00',duration:15}]},
                      {resourceId:3,title:'Bronwyn Nicholson',rosters:[{fromTime:'01/08/2016 08:00:00',toTime:'01/08/2016 16:00:00',duration:15}]},
                      {resourceId:4,title:'Adrian Brooks',rosters:[{fromTime:'01/08/2016 08:00:00',toTime:'01/08/2016 16:00:00',duration:15,events:[
                                                                                                                                                  {resourceId:4,eventId:2,fromTime:'01/08/2016 11:30:00',toTime:'01/08/2016 11:59:00',title:'John Smith'},
                                                                                                                                                  {resourceId:4,eventId:3,fromTime:'01/08/2016 08:30:00',toTime:'01/08/2016 08:59:00',title:'Adam Smith'}
                                                                                                                                                  ]}]}
                    ];
      //console.log('fromTime =',fromTime);
      //console.log('toTime=',toTime);
      return (
      (
        <ScheduleFrame resources={resources}/>
      )
    );
  }
}
