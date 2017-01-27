import React, { Component,PropTypes } from 'react';
import moment from 'moment';

import MyScheduler from '../MyScheduler';

let resources=[
                {resourceId:0,title:'Hanh Nguyen',rosters:[
                                                          {fromTime:'31/07/2016 08:00:00',toTime:'31/07/2016 15:00:00',duration:15,events:[
                                                                                                                                            {resourceId:0,eventId:0,fromTime:'31/07/2016 11:30:00',toTime:'31/07/2016 11:59:00',title:'John Smith'},
                                                                                                                                            {resourceId:0,eventId:1,fromTime:'31/07/2016 08:30:00',toTime:'31/07/2016 08:59:00',title:'Adam Smith'}
                                                                                                                                          ]},
                                                          {fromTime:'01/08/2016 08:00:00',toTime:'01/08/2016 15:00:00',duration:15,events:[
                                                                                                                                            {resourceId:0,eventId:0,fromTime:'01/08/2016 11:30:00',toTime:'01/08/2016 11:59:00',title:'John Smith'},
                                                                                                                                            {resourceId:0,eventId:1,fromTime:'01/08/2016 08:30:00',toTime:'01/08/2016 08:59:00',title:'Adam Smith'}
                                                                                                                                          ]},
                                                          {fromTime:'02/08/2016 10:00:00',toTime:'02/08/2016 18:00:00',duration:15,events:[
                                                                                                                                            {resourceId:0,eventId:0,fromTime:'02/08/2016 11:30:00',toTime:'02/08/2016 11:59:00',title:'John Smith'},
                                                                                                                                            {resourceId:0,eventId:1,fromTime:'02/08/2016 13:30:00',toTime:'02/08/2016 13:59:00',title:'Adam Smith'}
                                                                                                                                          ]}
                                                          ]},
                {resourceId:1,title:'Steve Jobs',rosters:[{fromTime:'02/08/2016 09:00:00',toTime:'02/08/2016 16:00:00',duration:60,events:[]}]},
                {resourceId:2,title:'Tom Lee',rosters:[{fromTime:'01/08/2016 07:00:00',toTime:'01/08/2016 14:00:00',duration:90,events:[]}]},
                {resourceId:3,title:'Bronwyn Nicholson',rosters:[{fromTime:'01/08/2016 08:00:00',toTime:'01/08/2016 16:00:00',duration:50,events:[]}]},
                {resourceId:4,title:'Adrian Brooks',rosters:[{fromTime:'01/08/2016 08:00:00',toTime:'01/08/2016 16:00:00',duration:15,events:[
                                                                                                                                            {resourceId:4,eventId:2,fromTime:'01/08/2016 11:30:00',toTime:'01/08/2016 11:59:00',title:'John Smith'},
                                                                                                                                            {resourceId:4,eventId:3,fromTime:'01/08/2016 08:30:00',toTime:'01/08/2016 08:59:00',title:'Adam Smith'}
                                                                                                                                            ]}]}
              ];

export default class MySchedulerExample extends Component {

  static propTypes = {
  };

  constructor(props){
    super(props);
    this.state={resources,eventWillAdd:null};
    this.currentEventId = 4;
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _selectingAreaCallback(selectingArea){
    console.log('_selectingAreaCallback = ',selectingArea);
    this.state.resources.map(res=>{
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
    this.setState({resources:this.state.resources});
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
      let displayDate = moment('01/08/2016','DD/MM/YYYY');
      return (
      (
        <MyScheduler
          resources={this.state.resources}
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
