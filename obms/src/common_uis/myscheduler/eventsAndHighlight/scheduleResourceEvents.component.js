import React, { Component,PropTypes } from 'react';
import moment from 'moment';
import * as _ from 'underscore'
import clone from 'clone';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ScheduleEventColumn from './ScheduleEventColumn.component';
import ScheduleEvent from './ScheduleEvent.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';

// Only render when have events or selectingArea

class ScheduleResourceEvents extends Component {


  // static contextTypes = {
  //   resources: PropTypes.array,
  //   events: PropTypes.object,
  //   selectingArea: PropTypes.object
  // };

  constructor(props) {
     super(props);
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //only render when have events in the HashMap
    // console.log('*************** ScheduleResourceEvents.shouldComponentUpdate  this.context.events.count= ',this.props.events.count());
    // console.log('*************** ScheduleResourceEvents.shouldComponentUpdate  this.context.events = ',this.props.events);
    // console.log('*************** ScheduleResourceEvents.shouldComponentUpdate  nextContext.events = ',nextProps.events);
    //return this.context.events.count() > 0;
    console.log('  4.2. *************** ScheduleResourceEvents.shouldComponentUpdate  !_.isEqual(nextProps,this.props) = ',!_.isEqual(nextProps,this.props));
    return !_.isEqual(nextProps,this.props);
  }

  componentDidMount() {
    //console.log('ScheduleResources.mainFramePosition = ',this.props.mainFramePosition);
  }

  componentWillUnmount() {

  }

  _buildResourceFrame(){
      let resourceSlots = [];
      //console.log(" ==>ScheduleResourceEvents.js -> _buildResourceFrame: this.props.resources = ",this.props.resources);
      this.props.resources.forEach((res,index)=>{
        if(res.currentRoster){
          //let events = [];
          let selectingArea = {};
          let events = [];

          if(this.props.events && Object.keys(this.props.events).length > 0){
            events = this.props.events[res.resourceId];
          }

          if(res.resourceId == this.props.selectingArea.resourceId){
            selectingArea = this.props.selectingArea;
          }

          resourceSlots.push(<ScheduleEventColumn key={index} resource={res} events={events} selectingArea={selectingArea}/>);
        }
      });

      return resourceSlots;
  }

  render() {
      if( (this.props.selectingArea && this.props.selectingArea.fromTimeInStr)||(this.props.events && Object.keys(this.props.events).length  > 0) ){
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


function bindAction(dispatch) {
  return {
  };
}

function mapStateToProps(state){
	return {
          resources: state.scheduler.resourcesAfterProcess,
          selectingArea: state.scheduler.selectingArea,
          events: state.scheduler.events,
         };
}

export default connect(mapStateToProps,bindAction)(ScheduleResourceEvents);
