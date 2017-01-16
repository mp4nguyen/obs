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
    return this.context.events.count() > 0;
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
      //console.log('***************rendering resource events.......');
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
