import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

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
  }

  componentWillUnmount() {
  }

  _onMouseDown(e){
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
