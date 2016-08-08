import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import events from 'dom-helpers/events';

import {getBoundsForNode} from './helper';

function addEventListener(type, handler) {
  events.on(document, type, handler)
  return {
    remove(){ events.off(document, type, handler) }
  }
}

export default class ScheduleTimeSlot extends Component {

  static contextTypes = {
    setMatrixPositionsOfTimeSlots: PropTypes.func,
    setCurrentTimeSlotPostition: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setMouseUpOnTimeSlot: PropTypes.func,
    setMouseOverOnTimeSlot: PropTypes.func,
    setMouseClickOnTimeSlot: PropTypes.func,
    setEvents: PropTypes.func
  };

  static propTypes = {
    resourceId: PropTypes.number,
    timeInStr: PropTypes.string.isRequired,
    timeInNumber: PropTypes.string.isRequired,
    timeInMoment: PropTypes.object,
    toTimeInStr: PropTypes.string,
    toTimeInMoment: PropTypes.object,
    label: PropTypes.string,
    isFirstForTime: PropTypes.bool,
    isEnable: PropTypes.bool,
    event: PropTypes.object
  };

  constructor(props){
    super(props);
  }



  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this);
    if(this.props.resourceId!=null){
      let timeslot = this.container.getBoundingClientRect();
      timeslot.timeInStr = this.props.timeInStr;
      timeslot.timeInNumber = this.props.timeInNumber;
      timeslot.timeInMoment = this.props.timeInMoment;
      timeslot.toTimeInStr = this.props.toTimeInStr;
      timeslot.toTimeInMoment = this.props.toTimeInMoment;

      //If the timeslot has event, then assign the position to it
      if(this.props.event){
        console.log('event for timeslot = ',this.props.event);
        if(!this.props.event.top){
          this.props.event.top = timeslot.top;
          this.props.event.left = timeslot.left;
          this.props.event.width = timeslot.width;
        }
        this.props.event.bottom = timeslot.bottom;
        this.props.event.height = timeslot.bottom - this.props.event.top;
        timeslot.event = this.props.event;
        this.context.setEvents(this.props.event);
      }
      this.context.setMatrixPositionsOfTimeSlots(this.props.resourceId,timeslot);
    }
  }

  componentWillUnmount() {

  }

  _celClick(cell){
    if(this.props.isEnable){
      //console.log('click on cell...............',this.props.timeInStr);
      var node = this.container;
      var offsetData = getBoundsForNode(node);
      this.context.setMouseClickOnTimeSlot(offsetData);
    }
  }

  _onMouseDown(e){
    if(this.props.isEnable){
      //console.log('mouse down',this.props.timeInStr);
      var node = this.container;
      var offsetData = getBoundsForNode(node);
      this.context.setCurrentTimeSlotPostition(offsetData);
      this.context.setMouseDownOnTimeSlot(offsetData);
    }
  }

  _onMouseUp(){
    if(this.props.isEnable){
      console.log('mouse up',this.props.timeInStr);
      var node = this.container;
      var offsetData = getBoundsForNode(node);
      this.context.setMouseUpOnTimeSlot(offsetData);
    }
  }

  _onMouseOver(){
    if(this.props.isEnable){
      //console.log('mouse over',this.props.timeInStr);
      var node = this.container;
      var offsetData = getBoundsForNode(node);
      this.context.setMouseOverOnTimeSlot(offsetData);
    }
  }

  _onMouseEnter(){
    //console.log('mouse enter',this.props.timeInStr);
  }

  _onMouseLeave(){
    //console.log('mouse leave',this.props.timeInStr);
  }

  _onMouseMove(){
    //console.log('mouse move',this.props.timeInStr);
  }

  _onMouseOut(){
    //console.log('mouse out',this.props.timeInStr);
  }


  render() {
    /*
    render time slot for scheduler
    If isFirstForTime = true => render for tim column => show time lable, otherwise not show time
    If label = true => it is the first line of hours => show solid seperate line, otherwise=> show doted line
    */
    let classWithLabel,classWithWithoutLabel;
    if(this.props.isEnable){
      classWithLabel = classNames(
                            "fc-cell-with-label",
                            "fc-enable-cell",
                            'T'+this.props.timeInNumber
                          );
      classWithWithoutLabel = classNames(
                            "fc-cell-without-label",
                            "fc-enable-cell",
                            'T'+this.props.timeInNumber
                          );
    }else{
      classWithLabel = classNames(
                            "fc-cell-with-label",
                            "fc-disable-cell",
                            'T'+this.props.timeInNumber
                          );
      classWithWithoutLabel = classNames(
                            "fc-cell-without-label",
                            "fc-disable-cell",
                            'T'+this.props.timeInNumber
                          );
    }
    //classWithLabel['T'+this.props.timeInNumber] = true;
    //classWithWithoutLabel['T'+this.props.timeInNumber] = true;

    var returnValue;
    if(this.props.isFirstForTime){
      //for time column
      if(this.props.label){
        returnValue = (
          <div className="fc-cell-with-label">
            <div className="fc-axis fc-time fc-widget-content">
              <span>{this.props.label}</span>
            </div>
          </div>
        );
      }else{
        returnValue = (
          <div className="fc-cell-without-label">
            <div className="fc-axis fc-time fc-widget-content">
            </div>
          </div>
        );
      }
    }else{
      //for resource => not show lable

      /*
      onClick={this._celClick.bind(this)}
      onMouseDown={this._onMouseDown.bind(this)}
      onMouseUp={this._onMouseUp.bind(this)}
      onMouseOver={this._onMouseOver.bind(this)}
      onMouseEnter={this._onMouseEnter.bind(this)}
      onMouseLeave={this._onMouseLeave.bind(this)}
      onMouseMove={this._onMouseMove.bind(this)}
      onMouseOut={this._onMouseOut.bind(this)}

      */
      if(this.props.label){
        returnValue = (
          <div className={classWithLabel}
            onClick={this._celClick.bind(this)}
            onMouseDown={this._onMouseDown.bind(this)}
            onMouseUp={this._onMouseUp.bind(this)}
            onMouseOver={this._onMouseOver.bind(this)}
            >
            <div className="fc-axis fc-time fc-widget-content">
            </div>
          </div>
        );
      }else{
        returnValue = (
          <div className={classWithWithoutLabel}
            onClick={this._celClick.bind(this)}
            onMouseDown={this._onMouseDown.bind(this)}
            onMouseUp={this._onMouseUp.bind(this)}
            onMouseOver={this._onMouseOver.bind(this)}
          >
            <div className="fc-axis fc-time fc-widget-content">
            </div>
          </div>
        );
      }
    }


    return returnValue;
  }
}
