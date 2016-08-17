import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import * as _ from 'lodash';
import {getBoundsForNode} from './helper';
import ScheduleEvent from './ScheduleEvent.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';

export default class ScheduleEventColumn extends Component {

  static contextTypes = {
      columnWidth: PropTypes.number
  };

  static propTypes = {
    resource: PropTypes.object,
    events: PropTypes.array,
    selectingArea: PropTypes.object
  };

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //return shallowCompare(this,nextProps, nextState);
    //console.log(this.props.event.fullName,' = ',!_.isEqual(this.props.event,nextProps.event),' ',this.props.event.leftInPercent,this.props.event.leftInPercent,' - ',nextProps.event.leftInPercent,nextProps.event.rightInPercent);
    return !_.isEqual(nextProps,this.props);
  }

  _buildEventSlots(){
    //console.log(' ScheduleResourceEvents.buildForResource = ',buildForResource);
    let eventslots = [];
    let buildForResource = this.props.resource;
    //Only show the highlight when having the position of time slot and for the particular resource
    if(this.props.selectingArea){
        eventslots.push(<ScheduleHighLightTimeSlot key="highlight" selectingArea={this.props.selectingArea}/>);
    }

    //build event for resource
    this.props.events.map(event=>{
        eventslots.push(<ScheduleEvent key={event.eventId} event={event}/>);
    });

    return eventslots;
  }


  render() {
    //if having lable => return header of the table, otherwise => retunr the body of table
    console.log('Rendering event column...',this.props.resource.title);
    var classes = classNames({'fc-minor': (this.props.label?false:true) });
    var returnValue;
    let width = this.context.columnWidth||'200';
    let style = {maxWidth:'200px', minWidth: '200px'};


    let className;

    if(this.props.resource){
      className = classNames(""+this.props.resource.title.replace(/ /g,''));
    }

    returnValue = (
                  <td className={className} style={{width}}>
                    <div className="fc-content-col">
                      {this._buildEventSlots()}
                    </div>
                  </td>
                  );

    return returnValue;
  }
}
