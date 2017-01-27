import React, { Component,PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'underscore'
import clone from 'clone';

import ScheduleEventColumn from './ScheduleEventColumn.component';
import ScheduleEvent from './ScheduleEvent.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';

export default class ScheduleResourceEvents extends Component {


  static contextTypes = {
    resources: PropTypes.array,
    events: PropTypes.object,
    selectingArea: PropTypes.object
  };

  constructor(props) {
     super(props);
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //only render when have events in the HashMap
    console.log('*************** ScheduleResourceEvents.shouldComponentUpdate  this.context.events.count= ',this.context.events.count());
    console.log('*************** ScheduleResourceEvents.shouldComponentUpdate  this.context.events = ',this.context.events);
    console.log('*************** ScheduleResourceEvents.shouldComponentUpdate  nextContext.events = ',nextContext.events);
    //return this.context.events.count() > 0;
    return !_.isEqual(nextContext,this.context);
  }

  componentDidMount() {
    //console.log('ScheduleResources.mainFramePosition = ',this.props.mainFramePosition);
  }

  componentWillUnmount() {

  }

  _buildResourceFrame(){
      let resourceSlots = [];
      this.context.resources.map((res,index)=>{
        if(res.currentRoster){
          //let events = [];
          let selectingArea = {};
          let events = clone(this.context.events.get(res.resourceId));
          if(res.resourceId == this.context.selectingArea.resourceId){
            selectingArea = this.context.selectingArea;
          }
          resourceSlots.push(
                              <ScheduleEventColumn key={index} resource={res} events={events} selectingArea={selectingArea}/>
                            );
        }
      });

      return resourceSlots;
  }

  render() {
      if(this.context.events.count() > 0){
        console.log('***************ScheduleResourceEvents.render():  rendering resource events.......');
        return (
          (
            <tbody>
              <tr>
                {this._buildResourceFrame()}
              </tr>
            </tbody>
          )
        );
      }else{
        console.log('***************ScheduleResourceEvents.render():  no thing to render');
        return (
          <tbody>
          </tbody>
        );
      }
  }
}
