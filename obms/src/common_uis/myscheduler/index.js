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
*/      let resources=[
                      {title:'Hanh Nguyen'},
                      {title:'Steve Jobs'},
                      {title:'Tom Lee'},
                      {title:'Bronwyn Nicholson'},
                      {title:'Adrian Brooks'}
                    ];
      console.log('fromTime =',fromTime);
      console.log('toTime=',toTime);
      return (
      (
        <ScheduleFrame resources={resources}/>
      )
    );
  }
}
