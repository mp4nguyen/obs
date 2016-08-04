import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'underscore'
import classNames from 'classnames';


export default class ScheduleHighLightTimeSlot extends Component {

  static contextTypes = {
    mainFrameForTimeSlotsPosition: PropTypes.object,
    currentResource: PropTypes.object,
    currentTimeSlotPosition: PropTypes.object,
    selectingObject: PropTypes.object,
    endTimeSlotsSelectionPosition: PropTypes.object
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    return !_.isEqual(nextContext,this.context);  
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _rowClick(){
    //console.log('click on row',this.props.timeInStr);
    //this.props.onRowClick(row);
  }

  _celClick(cell){
    //console.log('click on cell',this.props.timeInStr);
  }

  _onMouseDown(){
    //console.log('mouse down',this.props.timeInStr);

  }

  _onMouseUp(){
    //console.log('mouse up',this.props.timeInStr);
  }

  _onMouseOver(){
    //console.log('mouse over',this.props.timeInStr);
  }

  render() {
    /*
    render highlight when mouse click on the time slot or mouse drag over time slots
    */
    console.log('Rendering highlight .........');
    var returnValue;
    var style = {};
    if(this.context.currentTimeSlotPosition){
        let heightInNumber = 26;
        let top = this.context.currentTimeSlotPosition.top - this.context.mainFrameForTimeSlotsPosition.top;
        let left = this.context.currentTimeSlotPosition.left;
        let width = this.context.currentTimeSlotPosition.width;

        if(this.context.selectingObject.isSelecting){
            let mouseY = this.context.selectingObject.clientY - this.context.mainFrameForTimeSlotsPosition.top
            console.log('mouseY = ',mouseY);
            heightInNumber = mouseY - top > 26 ? (mouseY - top):26;
        }
        style = {
                top,
                left,
                height: heightInNumber+'px',
                width
              };

    }

    returnValue = (
      <div
        className="fc-highlight"
        style={style}
      >
      </div>
    );

    return returnValue;
  }
}
