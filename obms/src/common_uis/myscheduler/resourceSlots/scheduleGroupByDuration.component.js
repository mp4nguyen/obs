import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {getBoundsForNode} from '../helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setMatrixPosition,setMouseDownOnTimeSlot,setEvent} from '../redux/actions'

class ScheduleGroupByDuration extends Component {

  static contextTypes = {
    setMatrixPositionsOfTimeSlots: PropTypes.func
  };

  static propTypes = {
    id: PropTypes.number,
    resourceId: PropTypes.number,
    rosterId: PropTypes.number,
    timeInStr: PropTypes.string.isRequired,
    timeInNumber: PropTypes.string.isRequired,
    timeInMoment: PropTypes.object,
    toTimeInStr: PropTypes.string,
    toTimeInMoment: PropTypes.object,
    label: PropTypes.string,
    isFirstForTime: PropTypes.bool,
    isEnable: PropTypes.bool,
    events: PropTypes.array
  };

  constructor(props){
    super(props);
    this.timeslot = {};
  }


  componentDidMount() {
    //console.log('groupByDuration.componentDidMount events = ',this.props.events,'timeInStr=',this.props.timeInStr,'id=',this.props.id,'resourceId=',this.props.resourceId);
    this.container = ReactDOM.findDOMNode(this);
    this._updateMatrixAndEventsPostion();
  }

  componentDidUpdate() {
    //console.log('groupByDuration.componentDidUpdate events = ',this.props.events,'timeInStr=',this.props.timeInStr,'id=',this.props.id,'resourceId=',this.props.resourceId);
    //this.container = ReactDOM.findDOMNode(this);
    this._updateMatrixAndEventsPostion();
  }

  _updateMatrixAndEventsPostion(){

    if(this.props.resourceId!=null){
      let e = getBoundsForNode(this.container);
      this.timeslot = Object.assign({},{top:e.top,bottom:e.bottom,height:e.bottom - e.top,left:e.left,right:e.right,width:e.width});
      //console.log('this.timeslot',this.container.getBoundingClientRect());
      //console.log(e.top,'window.pageXOffset =',window.pageXOffset ,'window.pageYOffset=',window.pageYOffset,'document.body.scrollLeft=',document.body.scrollLeft,'document.body.scrollTop=',document.body.scrollTop);
      this.timeslot.resourceId = this.props.resourceId;
      this.timeslot.rosterId = this.props.rosterId;
      this.timeslot.timeInStr = this.props.timeInStr;
      this.timeslot.timeInNumber = this.props.timeInNumber;
      this.timeslot.timeInMoment = this.props.timeInMoment;
      this.timeslot.toTimeInStr = this.props.toTimeInStr;
      this.timeslot.toTimeInMoment = this.props.toTimeInMoment;

      //If the timeslot has event, then assign the position to it
      this.props.events.map(event=>{
        if(!event.top){
          event.top = this.timeslot.top;
          event.left = this.timeslot.left;
          event.width = this.timeslot.width;
        }
        event.bottom = this.timeslot.bottom;
        event.height = this.timeslot.bottom - event.top;
        this.timeslot.event = event;
        this.props.setEvent(event);
      });

      //this.props.setMatrixPosition(this.props.resourceId,this.timeslot);
      this.context.setMatrixPositionsOfTimeSlots(this.props.resourceId,this.timeslot);
    }
  }

  componentWillUnmount() {

  }

  _onMouseDown(e){
    if(this.props.isEnable && this.props.resourceId!=null){
      this.props.setMouseDownOnTimeSlot(this.timeslot);
    }
  }


  render() {

    let className;
    if(!this.props.isFirstForTime){
      if(this.props.id%2 === 0){
        className = classNames("fc-group-cell-even",'T'+this.props.timeInStr);
      }else {
        className = classNames("fc-group-cell-odd",'T'+this.props.timeInStr);
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




function bindAction(dispatch) {
  return {
            setMatrixPosition: (resourceId,data) => dispatch(setMatrixPosition(resourceId,data)),
            setMouseDownOnTimeSlot: (data) => dispatch(setMouseDownOnTimeSlot(data)),
            setEvent: (data) => dispatch(setEvent(data)),

         };
}

function mapStateToProps(state){
	return {};
}

export default connect(mapStateToProps,bindAction)(ScheduleGroupByDuration);
