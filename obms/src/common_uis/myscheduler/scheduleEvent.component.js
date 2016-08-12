import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'underscore'
import classNames from 'classnames';


export default class ScheduleEvent extends Component {

  static contextTypes = {
    setCurrentEventOnClick: PropTypes.func,
    setCurrentEventOnResize: PropTypes.func,
    mainFrameForTimeSlotsPosition: PropTypes.object
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
    //return shallowCompare(this,nextProps, nextState);
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
    //console.log('click on event',e);
    //this.context.setCurrentEventOnClick(this.props.event)
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

    var returnValue;
    var style = {};

    style = {

            top: this.props.event.top -  this.context.mainFrameForTimeSlotsPosition.top,
            left: '0%',//this.props.event.left,
            right: '0%',
            height:this.props.event.height-2,
            zIndex: 1,
            borderRadius: '3px'
          };

    returnValue = (
        <a
          className="fc-time-grid-event  fc-event "
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
