import React, { Component,PropTypes } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import * as _ from 'underscore'
import classNames from 'classnames';


export default class ScheduleHighLightTimeSlot extends Component {

  static propTypes = {
    selectingArea: PropTypes.object
  }


  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //console.log('  4.4.2. ***************** ScheduleHighLightTimeSlot.shouldComponentUpdate  !_.isEqual(nextProps,this.props) = ',!_.isEqual(nextProps,this.props));
    return  !_.isEqual(nextProps,this.props);
  }

  render() {
    /*
    render highlight when mouse click on the time slot or mouse drag over time slots
    */
    var returnValue;
    var style = {};

    style = {
            top: this.props.selectingArea.topAfterOffset,
            left: '0%',
            right: '0%',
            height: this.props.selectingArea.height
          };

    returnValue = (
      <div
        className="fc-highlight"
        style={style}
      >
      </div>
    );

    return returnValue;
  }
}


//<div class="fc-event-container"><a class="fc-time-grid-event fc-v-event fc-event fc-start fc-end fc-draggable fc-resizable" style="top: 395px; bottom: -615px; z-index: 1; left: 0%; right: 0%;"><div class="fc-content"><div class="fc-time" data-start="9:00" data-full="9:00 AM - 2:00 PM"><span>9:00 - 2:00</span></div><div class="fc-title">event 2</div></div><div class="fc-bg"></div><div class="fc-resizer fc-end-resizer"></div></a></div>
