import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'lodash'
import classNames from 'classnames';


export default class ScheduleEvent extends Component {

  static contextTypes = {
    eventTitleField: PropTypes.string,
    setCurrentEventOnClick: PropTypes.func,
    setCurrentEventOnResize: PropTypes.func,
    mainFrameForTimeSlotsPosition: PropTypes.object
  }

  static propTypes = {
    event: PropTypes.object
  }

  constructor(props){
    super(props);
  }

/*  componentWillReceiveProps(nextProps){
    console.log('will rendering event ........',
                this.props.event.fullName,' ',
                this.props.event.leftInPercent,'  ',
                this.props.event.rightInPercent,' -> ',
                nextProps.event.leftInPercent,'  ',
                nextProps.event.rightInPercent,'  ',
              );
  }*/
  //left: this.context.selectingObject.clientX
  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //return shallowCompare(this,nextProps, nextState);
    //console.log(this.props.event.fullName,' = ',!_.isEqual(this.props.event,nextProps.event),' ',this.props.event.leftInPercent,this.props.event.leftInPercent,' - ',nextProps.event.leftInPercent,nextProps.event.rightInPercent);
    let isRender = false;

    if(
      this.props.event &&
      nextProps.event &&
      this.context.mainFrameForTimeSlotsPosition &&
      nextContext.mainFrameForTimeSlotsPosition &&
      (
          this.props.event.top != nextProps.event.top ||
          this.props.event.bottom != nextProps.event.bottom ||
          this.props.event.height != nextProps.event.height ||
          this.props.event.leftInPercent != nextProps.event.leftInPercent ||
          this.props.event.rightInPercent != nextProps.event.rightInPercent ||
          this.props.event.opacity != nextProps.event.opacity ||
          this.props.event.zIndex != nextProps.event.zIndex ||
          this.context.mainFrameForTimeSlotsPosition.top != nextContext.mainFrameForTimeSlotsPosition.top
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
    console.log('rendering event .........',this.props.event.fullName);
    var returnValue;
    var style = {};
    let title = this.props.event[this.context.eventTitleField]||'';
    style = {
            top: this.props.event.top -  this.context.mainFrameForTimeSlotsPosition.top,
            left: this.props.event.leftInPercent + '%',
            right: this.props.event.rightInPercent + '%',
            height:this.props.event.height-2,
            zIndex: this.props.event.zIndex,
            opacity: this.props.event.opacity,
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
            <div className="fc-title">{title}</div>
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
