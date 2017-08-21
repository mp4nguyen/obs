import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'lodash'
import classNames from 'classnames';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setCurrentEventOnClick} from '../redux/actions'

class ScheduleEvent extends Component {

  static contextTypes = {
    eventTitleField: PropTypes.string,
  }

  static propTypes = {
    event: PropTypes.object
  }

  constructor(props){
    super(props);
    this.isResizeOnEvent = false;
  }

  //left: this.context.selectingObject.clientX
  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //return shallowCompare(this,nextProps, nextState);
    //console.log(this.props.event.fullName,' = ',!_.isEqual(this.props.event,nextProps.event),' ',this.props.event.leftInPercent,this.props.event.leftInPercent,' - ',nextProps.event.leftInPercent,nextProps.event.rightInPercent);
    //console.log('  4.4.1. ***************** ScheduleEvent.shouldComponentUpdate  ');
    let isRender = false;

    if(
      this.props.event &&
      nextProps.event &&
      this.props.mainFrameForTimeSlotsPosition &&
      nextProps.mainFrameForTimeSlotsPosition &&
      (
          this.props.event.top != nextProps.event.top ||
          this.props.event.bottom != nextProps.event.bottom ||
          this.props.event.height != nextProps.event.height ||
          this.props.event.leftInPercent != nextProps.event.leftInPercent ||
          this.props.event.rightInPercent != nextProps.event.rightInPercent ||
          this.props.event.opacity != nextProps.event.opacity ||
          this.props.event.zIndex != nextProps.event.zIndex ||
          this.props.mainFrameForTimeSlotsPosition.top != nextProps.mainFrameForTimeSlotsPosition.top
      )
    ){
      isRender = true;
    }

    return isRender;
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  _onClickResizer(){
    console.log('click on resizer');
    this.isResizeOnEvent = true;
    this.props.setCurrentEventOnClick({event:{...this.props.event,opacity: 0.7},isClickOnEvent: false,isResizeOnEvent: true})
  }

  _onClick(e){
    //console.log('click on event',e);
    //this.context.setCurrentEventOnClick(this.props.event)
  }

  _onMouseDown(){
    if(!this.isResizeOnEvent){
      console.log('mouse down on event');
      this.props.setCurrentEventOnClick({event:{...this.props.event,opacity: 0.7},isClickOnEvent: true,isResizeOnEvent: false})
    }
  }

  _onMouseUp(){
    this.isResizeOnEvent = false;
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
    let title = this.props.event[this.context.eventTitleField]||'';
    style = {
            top: this.props.event.top -  this.props.mainFrameForTimeSlotsPosition.top,
            left: this.props.event.leftInPercent + '%',
            right: this.props.event.rightInPercent + '%',
            height:this.props.event.height-2,
            zIndex: this.props.event.zIndex,
            opacity: this.props.event.opacity,
            borderRadius: '3px'
          };
    //console.log('+++++++++++++++ScheduleEvent.render : rendering event .........',this.props.event.fullName,style);
    returnValue = (
        <a
          className="fc-time-grid-event  fc-event "
          style= {style}
          onClick={this._onClick.bind(this)}
          onMouseDown={this._onMouseDown.bind(this)}
          onMouseUp={this._onMouseUp.bind(this)}
          >
          <div className="fc-content">
            <div className="fc-time">
              <span>{this.props.event.fromTimeInHHMM} - {this.props.event.toTimeInHHMM}</span>
            </div>
            <div className="fc-title">{title}</div>
          </div>
          <div className="fc-bg">
          </div>
          <div className="fc-resizer fc-end-resizer" onMouseDown={this._onClickResizer.bind(this)}>
          </div>
        </a>
    );

    return returnValue;
  }
}


function bindAction(dispatch) {
  return {
    setCurrentEventOnClick: (data) => dispatch(setCurrentEventOnClick(data)),
  };
}

function mapStateToProps(state){
	return {
    mainFrameForTimeSlotsPosition: state.scheduler.mainFramePosition,
  };
}

export default connect(mapStateToProps,bindAction)(ScheduleEvent);
