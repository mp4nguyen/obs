import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'underscore'
import classNames from 'classnames';


export default class ScheduleEventTimeSlot extends Component {

  static contextTypes = {
    mainFrameForTimeSlotsPosition: PropTypes.object,
    mainFrameForTimeSlotsPositionWhenScrolling: PropTypes.object,
    currentResource: PropTypes.object,
    currentTimeSlotPosition: PropTypes.object,
    selectingObject: PropTypes.object,
    endTimeSlotsSelectionPosition: PropTypes.object,
    mouseOverTimeSlotPostions: PropTypes.array
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
    //console.log('Rendering highlight .........');
    var returnValue;
    var style = {};
    if(this.context.currentTimeSlotPosition){
        let heightInNumber = 26;
        let top = this.context.currentTimeSlotPosition.top - this.context.mainFrameForTimeSlotsPosition.top;
        let left = this.context.currentTimeSlotPosition.left;
        let width = this.context.currentTimeSlotPosition.width;

        if(this.context.selectingObject.isSelecting){
            let mouseY = this.context.selectingObject.clientY - this.context.mainFrameForTimeSlotsPositionWhenScrolling.top
            heightInNumber = mouseY - top > 26 ? (mouseY - top):26;
/*            console.log('mouse y = ',this.context.selectingObject.clientY,
                        ' top = ',this.context.mainFrameForTimeSlotsPosition.top,
                        'mouseY after offset = ',mouseY,' heightInNumber= ',heightInNumber);*/
        }

        if(this.context.endTimeSlotsSelectionPosition){
          let mouseY = this.context.endTimeSlotsSelectionPosition.top - this.context.mainFrameForTimeSlotsPositionWhenScrolling.top
          heightInNumber = mouseY - top > 25 ? (mouseY - top + 26):26;
        }

        style = {
                top,
                left,
                height: heightInNumber+'px',
                width
              };

    }

    returnValue = (
      <div className="">
        <a
          className="fc-time-grid-event fc-v-event fc-event fc-start fc-end fc-draggable fc-resizable"
          style= {{top: '100px', left: '50px', zIndex: 1, width: '200px', height: '200px'}}
          >
          <div className="fc-content">
            <div className="fc-time" data-start="9:00" data-full="9:00 AM - 2:00 PM">
              <span>9:00 - 2:00</span>
            </div>
            <div className="fc-title">event 2</div>
          </div>
          <div className="fc-bg"></div>
          <div className="fc-resizer fc-end-resizer"></div>
        </a>
      </div>
    );

    return returnValue;
  }
}
