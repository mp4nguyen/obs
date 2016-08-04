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
    setCurrentTimeSlotPostition: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setMouseUpOnTimeSlot: PropTypes.func,
    setMouseOverOnTimeSlot: PropTypes.func,
    setMouseClickOnTimeSlot: PropTypes.func
  };

  static propTypes = {
    timeInStr: PropTypes.string.isRequired,
    label: PropTypes.string,
    isFirstForTime: PropTypes.bool
  };

  constructor(props){
    super(props);
  }



  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this);
  }

  componentWillUnmount() {

  }

  _celClick(cell){
    console.log('click on cell...............',this.props.timeInStr);
    var node = this.container;
    var offsetData = getBoundsForNode(node);
    this.context.setMouseClickOnTimeSlot(offsetData);
  }

  _onMouseDown(e){
    console.log('mouse down',this.props.timeInStr);
    var node = this.container;
    var offsetData = getBoundsForNode(node);
    this.context.setCurrentTimeSlotPostition(offsetData);
    this.context.setMouseDownOnTimeSlot(offsetData);
  }

  _onMouseUp(){
    console.log('mouse up',this.props.timeInStr);
    var node = this.container;
    var offsetData = getBoundsForNode(node);
    this.context.setMouseUpOnTimeSlot(offsetData);
  }

  _onMouseOver(){
    //console.log('mouse over',this.props.timeInStr);
    var node = this.container;
    var offsetData = getBoundsForNode(node);
    this.context.setMouseOverOnTimeSlot(offsetData);
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
          <div className="fc-cell-with-label"
            onClick={this._celClick.bind(this)}
            onMouseDown={this._onMouseDown.bind(this)}
            onMouseUp={this._onMouseUp.bind(this)}
            onMouseOver={this._onMouseOver.bind(this)}
            onMouseEnter={this._onMouseEnter.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            onMouseMove={this._onMouseMove.bind(this)}
            onMouseOut={this._onMouseOut.bind(this)}
            >
            <div className="fc-axis fc-time fc-widget-content">
            </div>
          </div>
        );
      }else{
        returnValue = (
          <div className="fc-cell-without-label"
            onClick={this._celClick.bind(this)}
            onMouseDown={this._onMouseDown.bind(this)}
            onMouseUp={this._onMouseUp.bind(this)}
            onMouseOver={this._onMouseOver.bind(this)}
            onMouseEnter={this._onMouseEnter.bind(this)}
            onMouseLeave={this._onMouseLeave.bind(this)}
            onMouseMove={this._onMouseMove.bind(this)}
            onMouseOut={this._onMouseOut.bind(this)}
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
