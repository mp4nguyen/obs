import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {getBoundsForNode} from './helper';


export default class ScheduleGroupByDuration extends Component {

  static contextTypes = {
    setMatrixPositionsOfTimeSlots: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setEvents: PropTypes.func
  };

  static propTypes = {
    id: PropTypes.number,
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
      this.container = ReactDOM.findDOMNode(this);
      if(this.props.resourceId!=null){
        let e = this.container.getBoundingClientRect();
        this.timeslot = Object.assign({},{top:e.top,bottom:e.bottom,height:e.height,left:e.left,right:e.right,width:e.width});
        //console.log('this.timeslot',this.container.getBoundingClientRect());
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
      }
    }


  componentWillUnmount() {

  }

  _onMouseDown(e){
    if(this.props.isEnable && this.props.resourceId!=null){
      this.context.setMouseDownOnTimeSlot(this.timeslot);
    }
  }


  render() {

    let className;
    if(!this.props.isFirstForTime){
      if(this.props.id%2 === 0){
        className = classNames("fc-group-cell-even");
      }else {
        className = classNames("fc-group-cell-odd");
      }
    }

    let returnValue = (
      <div
        className={className}
        onMouseDown={this._onMouseDown.bind(this)}
        >
        {this.props.children}
      </div>
    );

    return returnValue;
  }
}
