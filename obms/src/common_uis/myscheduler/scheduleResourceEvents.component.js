import React, { Component,PropTypes } from 'react';
import moment from 'moment';

import ScheduleResourceSlot from './ScheduleResourceSlot.component';
import ScheduleEventTimeSlot from './ScheduleEventTimeSlot.component';
import ScheduleHighLightTimeSlot from './ScheduleHighLightTimeSlot.component';

export default class ScheduleResourceEvents extends Component {


  static contextTypes = {
    resources: PropTypes.array,
    mainFrameForTimeSlotsPosition: PropTypes.object,
    currentTimeSlotPosition: PropTypes.object,
    currentResource: PropTypes.object
  };

  constructor(props) {
     super(props);
     this.state = {
       positionObject: null,
       currentResource: {}
     };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidMount() {
    console.log('ScheduleResources.mainFramePosition = ',this.props.mainFramePosition);
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

  _setPositionObject(positionOfTimeSlot){
    //listen the current position of object that mouse click or drag in the time slots
    //console.log('schedule resource -> position object =',positionOfTimeSlot);
    this.setState({positionObject:positionOfTimeSlot});

  }

  _setCurrentResource(resource){
    //console.log('currentResource = ',resource);
    this.setState({currentResource:resource});
  }

  _buildEventSlots(isFirstForTime,buildForResource){

    let eventslots = [];

    //Only show the highlight when having the position of time slot and for the particular resource
    if(this.context.currentTimeSlotPosition && this.context.currentResource && buildForResource && this.context.mainFrameForTimeSlotsPosition){
      if(buildForResource.title == this.context.currentResource.title){
        eventslots.push(<ScheduleHighLightTimeSlot key="highlight"/>);
      }
    }

    return eventslots;

  }



  _buildResourceFrame(){

      let resourceSlots = [];

      resourceSlots.push(
                          <ScheduleResourceSlot key={-1} isFirstForTime={true} hasTimeSlots={true}>
                            {this._buildEventSlots(true)}
                          </ScheduleResourceSlot>
                        );
      this.context.resources.map((res,index)=>{
        resourceSlots.push(
                            <ScheduleResourceSlot key={index} resource={res} hasTimeSlots={true}>
                              {this._buildEventSlots(false,res)}
                              <ScheduleEventTimeSlot/>
                            </ScheduleResourceSlot>
                          );
      });


      return resourceSlots;
  }

  render() {
      //console.log('rendering events.......');
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
