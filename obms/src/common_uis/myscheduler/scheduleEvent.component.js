import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'underscore'
import classNames from 'classnames';


export default class ScheduleEvent extends Component {

  static contextTypes = {
    setCurrentEventOnClick: PropTypes.func,
    setCurrentEventOnResize: PropTypes.func,
    mainFrameForTimeSlotsPosition: PropTypes.object,
    mainFrameForTimeSlotsPositionWhenScrolling: PropTypes.object,
    selectingObject: PropTypes.object,
    matrixPositions: PropTypes.object,
    resizeEventAtTimeSlot: PropTypes.object,
    moveEventToTimeSlot: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object
  }

  constructor(props){
    super(props);
    this.eventPosition = {top:0,left:0,width:0,height:0};
  }
  //left: this.context.selectingObject.clientX
  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //console.log(' shouldComponentUpdate ',this.context.moveEventToTimeSlot);
/*    if(this.context.resizeEventAtTimeSlot){
      //check to find out finish resize so can update the corrext position for event
      //and update the current timeslots for the event
      this.eventPosition.height = this.context.resizeEventAtTimeSlot.bottom - this.state.top - this.context.mainFrameForTimeSlotsPositionWhenScrolling.top;
      return true;
    }else if(this.context.moveEventToTimeSlot){
      let newTop = this.context.moveEventToTimeSlot.top - this.context.mainFrameForTimeSlotsPositionWhenScrolling.top;
      //console.log('shouldComponentUpdate update top position for event , current top = ',this.state.top,' new top = ',this.context.moveEventToTimeSlot.top, ' newTop = ',newTop,this.context.mainFrameForTimeSlotsPositionWhenScrolling);
      //check to find out finish moving so can update the corrext position for event
      //and update the current timeslots for the event
      this.eventPosition.top = newTop;
      return true;
    }else if(this.context.selectingObject.isResizeOnEvent){
      //check whether resize or not, if yes, update height of event
      this.eventPosition.height = this.context.selectingObject.clientY - this.state.top - this.context.mainFrameForTimeSlotsPositionWhenScrolling.top;
      return true;
    }else if(this.context.selectingObject.isClickOnEvent){
      //check whether move or not, will update the top postion in case move in the same resources
      //will implement move accross the resources
      this.eventPosition.top = this.context.selectingObject.clientY - this.context.mainFrameForTimeSlotsPositionWhenScrolling.top;
      return true;
    }else{
      return false;
    }*/
    return true;
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  _onClickResizer(){
    console.log('click on resizer');
    //this.props.onRowClick(row);
    this.context.setCurrentEventOnResize(this.props.event)
  }

  _onClick(e){
    console.log('click on event',e);
    this.context.setCurrentEventOnClick(this.props.event)
  }

  _onMouseDown(){
    console.log('mouse down on event');
    this.context.setCurrentEventOnClick(this.props.event)
  }

  _onMouseUp(){
    console.log('mouse up on event');
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

    }

    style = {
            top:this.props.event.top - this.context.mainFrameForTimeSlotsPosition.top,
            left:this.props.event.left,
            width:this.props.event.width,
            height:this.props.event.height,
            zIndex: 1
          };
    //console.log('rendering event style = ', style);
    returnValue = (
        <a
          className="fc-time-grid-event fc-v-event fc-event fc-start fc-end fc-draggable fc-resizable"
          style= {style}
          onClick={this._onClick.bind(this)}
          onMouseDown={this._onMouseDown.bind(this)}
          onMouseUp={this._onMouseUp.bind(this)}
          >
          <div className="fc-content">
            <div className="fc-time" data-start="9:00" data-full="9:00 AM - 2:00 PM">
              <span>{this.props.event.fromTimeInHHMM} - {this.props.event.toTimeInHHMM}</span>
            </div>
            <div className="fc-title">{this.props.event.title}</div>
          </div>
          <div className="fc-bg">

          </div>
          <div className="fc-resizer fc-end-resizer"
            onMouseDown={this._onClickResizer.bind(this)}
          >
          </div>
        </a>
    );

    return returnValue;
  }
}
