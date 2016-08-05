import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';

import events from 'dom-helpers/events';

function addEventListener(type, handler) {
  events.on(document, type, handler)
  return {
    remove(){ events.off(document, type, handler) }
  }
}


import ScheduleResourceHeaders from './ScheduleResourceHeaders.component';
import ScheduleResources from './ScheduleResources.component';
import ScheduleResourceEvents from './ScheduleResourceEvents.component';
import {getBoundsForNode} from './helper';

export default class ScheduleFrame extends Component {

  static propTypes = {
    fromTime: PropTypes.object,
    toTime: PropTypes.object,
    duration: PropTypes.number,
    resources: PropTypes.array.isRequired,
    data: PropTypes.object,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
  };

  static childContextTypes = {
    resources: PropTypes.array,
    fromTime: PropTypes.object,
    toTime: PropTypes.object,
    duration: PropTypes.number,

    mainFrameForTimeSlotsPosition: PropTypes.object,
    mainFrameForTimeSlotsPositionWhenScrolling: PropTypes.object,
    currentResource: PropTypes.object,
    currentTimeSlotPosition: PropTypes.object,
    selectingObject: PropTypes.object,
    mouseOverTimeSlotPostions: PropTypes.array,
    endTimeSlotsSelectionPosition: PropTypes.object,

    setCurrentResource: PropTypes.func,
    setCurrentTimeSlotPostition: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setMouseUpOnTimeSlot: PropTypes.func,
    setMouseOverOnTimeSlot: PropTypes.func,
    setMouseClickOnTimeSlot: PropTypes.func
  };


  constructor(props){
    super(props);
    this.state = {
                     mainFrameForTimeSlotsPosition: {top:0},
                     mainFrameForTimeSlotsPositionWhenScrolling: {top:0},
                     currentResource: null,
                     currentTimeSlotPosotion: null,
                     mouseDownTimeSlotPostion: null,
                     mouseUpTimeSlotPostion: null,
                     mouseOverTimeSlotPostions: [],
                     mouseClickTimeSlotPostion: null,
                     selectingObject: {isSelecting: false,clientX:null, clientY: null}
                  };
    this._mouseDown = this._mouseDown.bind(this);
    this._onMouseDownListener = addEventListener('mousedown', this._mouseDown);
    this.isMouseDown = false;
    this.isMouseUp = false;
    this.isMouseSelecting = false;
  }

  _mouseDown(e){
    //console.log('=====> _mouseDown',e);
    this.setState({mouseUpTimeSlotPostion: null,mouseOverTimeSlotPostions: []});
    this.isMouseDown = true;
    this.isMouseUp = false;
    this._mouseUp = this._mouseUp.bind(this);
    this._openSelector = this._openSelector.bind(this);
    this._onMouseUpListener = addEventListener('mouseup', this._mouseUp)
    this._onMouseMoveListener = addEventListener('mousemove', this._openSelector)

    //Get new position of mainContainerForTimeSlots because it can change as we use scroller to move the container
    //So the top position will be changed
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
    var mainFramePosition = getBoundsForNode(container);
    this.setState({
                    mainFrameForTimeSlotsPosition: mainFramePosition,
                    mainFrameForTimeSlotsPositionWhenScrolling: mainFramePosition
                  });

  }

  _mouseUp(){
    console.log('=====> _mouseUp');
    this.isMouseUp = true;
    this.isMouseDown = false;
    this.isMouseSelecting = false;
    this.setState({
                    selectingObject: {isSelecting: false,clientX:null, clientY: null}

                  });
    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();
  }

  _openSelector(e){
    //console.log('=====> _mouseMove',e);
    this.isMouseSelecting = true;

    //Get new position of mainContainerForTimeSlots because it can change as we use scroller to move the container
    //So the top position will be changed
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
    var mainFramePosition = getBoundsForNode(container);
    this.setState({mainFrameForTimeSlotsPositionWhenScrolling: mainFramePosition})


    this.setState({selectingObject: {isSelecting: true,clientX:e.pageX, clientY: e.pageY}});
  }

  _setCurrentResource(res){
      console.log('frame._setCurrentResource = ',res);
      this.setState({currentResource:res});
  }

  _setCurrentTimeSlotPostition(timeslotPosition){
      console.log('frame._setCurrentTimeSlotPostition = ',timeslotPosition);
      this.setState({currentTimeSlotPosotion:timeslotPosition});
  }

  _setMouseDownOnTimeSlot(timeslotPosition){
    console.log('frame._setMouseDownOnTimeSlot = ',timeslotPosition);
    this.setState({mouseDownTimeSlotPostion:timeslotPosition});
  }

  _setMouseUpOnTimeSlot(timeslotPosition){
    console.log('frame._setMouseUpOnTimeSlot = ',timeslotPosition);
    this.setState({mouseUpTimeSlotPostion:timeslotPosition});
  }

  _setMouseOverOnTimeSlot(timeslotPosition){
    //console.log('frame._setMouseOverOnTimeSlot = ',timeslotPosition);
    //Only add time slot into the mouseover array when mouse is click down and selecting
    //If mouse is up, do not add into the array
    //This array is used for the events time from - to
    if(this.isMouseDown){
      this.state.mouseOverTimeSlotPostions.push(timeslotPosition);
      this.setState({mouseOverTimeSlotPostions: this.state.mouseOverTimeSlotPostions });
    }
  }

  _setMouseClickOnTimeSlot(timeslotPosition){
    console.log('frame._setMouseClickOnTimeSlot = ',timeslotPosition);
    this.setState({mouseClickTimeSlotPostion:timeslotPosition});
  }

  getChildContext(){
    return {
      resources: this.props.resources,
      fromTime: this.props.fromTime,
      toTime: this.props.toTime,
      duration: this.props.duration,
      mainFrameForTimeSlotsPosition: this.state.mainFrameForTimeSlotsPosition,
      mainFrameForTimeSlotsPositionWhenScrolling: this.state.mainFrameForTimeSlotsPositionWhenScrolling,
      currentResource: this.state.currentResource,
      currentTimeSlotPosition: this.state.currentTimeSlotPosotion,
      selectingObject: this.state.selectingObject,
      mouseOverTimeSlotPostions: this.state.mouseOverTimeSlotPostions,
      endTimeSlotsSelectionPosition: this.state.mouseUpTimeSlotPostion,

      setCurrentResource: this._setCurrentResource.bind(this),
      setCurrentTimeSlotPostition: this._setCurrentTimeSlotPostition.bind(this),
      setMouseDownOnTimeSlot: this._setMouseDownOnTimeSlot.bind(this),
      setMouseUpOnTimeSlot: this._setMouseUpOnTimeSlot.bind(this),
      setMouseOverOnTimeSlot: this._setMouseOverOnTimeSlot.bind(this),
      setMouseClickOnTimeSlot: this._setMouseClickOnTimeSlot.bind(this)
    };
  }

  componentDidMount() {
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
    var mainFramePosition = getBoundsForNode(container);
    this.setState({
                    mainFrameForTimeSlotsPosition: mainFramePosition,
                    mainFrameForTimeSlotsPositionWhenScrolling: mainFramePosition
                  });
  }

  componentWillUnmount() {

  }

  _rowClick(row){
    console.log('click on row',row);
    //this.props.onRowClick(row);
  }

  _celClick(cell){
    console.log('click on cell',cell);
  }



  render() {
    return (
      (
      <div className="fc fc-unthemed fc-ltr">
        <div className="fc-view-container" >
          <div className="fc-view fc-agendaDay-view fc-agenda-view" >
            <table>
              {/* Begin calendar header*/}
              <thead className="fc-head">
                <tr>
                  <td className="fc-head-container fc-widget-header">
                    <div className="fc-row fc-widget-header">
                      <table>

                        <ScheduleResourceHeaders resources={this.props.resources}/>

                      </table>
                    </div>
                  </td>
                </tr>
              </thead>
              {/* End calendar header*/}
              {/* Begin calendar body*/}
              <tbody className="fc-body">
                <tr>
                  <td className="fc-widget-content">
                    {/* Begin all day session */}
                    <div className="fc-day-grid fc-unselectable">
                      <div className="fc-row fc-week fc-widget-content">
                        <div className="fc-bg">
                          <table>
                            <ScheduleResources/>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* End all day session */}
                    <hr className="fc-divider fc-widget-header"/>
                    {/* Begin time session */}
                    <div

                        className="fc-scroller fc-time-grid-container"
                        style={{overflowX: 'scroll', overflowY: 'scroll', height: '601px'}}
                        >
                      <div className="fc-time-grid fc-unselectable">
                        {/* Begin column resources */}
                          <table ref="mainContainerForTimeSlots">
                            <ScheduleResources hasTimeSlots={true}/>
                          </table>
                          <table>
                            <ScheduleResourceEvents/>
                          </table>
                        {/* End column resources

                          */}

                      </div>
                    </div>
                    {/* End time session */}
                  </td>
                </tr>
              </tbody>
              {/* End calendar body*/}
            </table>
          </div>
        </div>
      </div>
      )
    );
  }
}
