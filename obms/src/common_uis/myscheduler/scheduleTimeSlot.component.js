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
    setMouseDownOnTimeSlot: PropTypes.func,
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
    this.timeslot = {};
  }



  componentDidMount() {
/*    this.container = ReactDOM.findDOMNode(this);
    if(this.props.resourceId!=null){
      this.timeslot = this.container.getBoundingClientRect();
      this.timeslot.resourceId = this.props.resourceId;
      this.timeslot.timeInStr = this.props.timeInStr;
      this.timeslot.timeInNumber = this.props.timeInNumber;
      this.timeslot.timeInMoment = this.props.timeInMoment;
      this.timeslot.toTimeInStr = this.props.toTimeInStr;
      this.timeslot.toTimeInMoment = this.props.toTimeInMoment;

      //If the timeslot has event, then assign the position to it
      if(this.props.event){
        //console.log('event for timeslot = ',this.props.event);
        if(!this.props.event.top){
          this.props.event.top = this.timeslot.top;
          this.props.event.left = this.timeslot.left;
          this.props.event.width = this.timeslot.width;
        }
        this.props.event.bottom = this.timeslot.bottom;
        this.props.event.height = this.timeslot.bottom - this.props.event.top;
        this.timeslot.event = this.props.event;
        this.context.setEvents(this.props.event);
      }
      this.context.setMatrixPositionsOfTimeSlots(this.props.resourceId,this.timeslot);
    }*/
  }

  componentWillUnmount() {

  }



  _onMouseDown(e){
/*    if(this.props.isEnable && this.props.resourceId!=null){
      this.context.setMouseDownOnTimeSlot(this.timeslot);
    }*/
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

      if(this.props.label){
        returnValue = (
          <div className={classWithLabel}
            onMouseDown={this._onMouseDown.bind(this)}
            >
            <div className="fc-axis fc-time fc-widget-content">
            </div>
          </div>
        );
      }else{
        returnValue = (
          <div className={classWithWithoutLabel}
            onMouseDown={this._onMouseDown.bind(this)}
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
