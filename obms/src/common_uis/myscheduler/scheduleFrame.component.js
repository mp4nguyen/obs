import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import clone from 'clone';
import moment from 'moment';

import {getBoundsForNode,addEventListener,findTimeSlot,findResource} from './helper';
import ScheduleResourceHeaders from './ScheduleResourceHeaders.component';
import ScheduleResources from './ScheduleResources.component';
import ScheduleResourceEvents from './ScheduleResourceEvents.component';


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

    matrixPositions: PropTypes.object,
    events:PropTypes.array,
    selectingArea: PropTypes.object,
    mainFrameForTimeSlotsPosition: PropTypes.object,
    mainFrameForTimeSlotsPositionWhenScrolling: PropTypes.object,
    currentResource: PropTypes.object,
    currentTimeSlotPosition: PropTypes.object,
    selectingObject: PropTypes.object,
    mouseOverTimeSlotPostions: PropTypes.array,
    endTimeSlotsSelectionPosition: PropTypes.object,

    resizeEventAtTimeSlot: PropTypes.object,
    moveEventToTimeSlot: PropTypes.object,

    setMatrixPositionsOfTimeSlots: PropTypes.func,
    setColumnsOfTimeSlots: PropTypes.func,
    setEvents:PropTypes.func,
    setCurrentResource: PropTypes.func,
    setCurrentTimeSlotPostition: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setMouseUpOnTimeSlot: PropTypes.func,
    setMouseOverOnTimeSlot: PropTypes.func,
    setMouseClickOnTimeSlot: PropTypes.func,

    setCurrentEventOnClick: PropTypes.func,
    setCurrentEventOnResize: PropTypes.func,
  };


  constructor(props){
    super(props);
    this.state = {
                     mainFrameForTimeSlotsPosition: {top:0},
                     mainFrameForTimeSlotsPositionWhenScrolling: {top:0},
                     matrixPositions: {},
                     events:[],
                     columns:[],
                     selectingArea: {top: 0, left: 0, height: 0, width: 0, resourceId: null},
                     currentResource: null,
                     currentTimeSlotPosotion: null,
                     mouseDownTimeSlotPostion: null,
                     mouseUpTimeSlotPostion: null,
                     mouseOverTimeSlotPostions: [],
                     mouseClickTimeSlotPostion: null,
                     selectingObject: {isSelecting: false, isClickOnEvent: false, isClickOnTimeSlot: false, clientX:null, clientY: null},

                     currentEventOnClick:null,
                     currentEventOnResize:null,

                     resizeEventAtTimeSlot: null,
                     moveEventToTimeSlot: null
                  };
    //Adding the mouse down listener at main frame, so the frame can know the position of mousedown
    //=> make decision for timeslots or events to hightlight/move or resize
    this._mouseDown = this._mouseDown.bind(this);
    this._onMouseDownListener = addEventListener('mousedown', this._mouseDown);
    this.isMouseDown = false;
    this.isMouseUp = false;
    this.isMouseSelecting = false;
    this.isClickOnTimeSlot = false;
    this.isClickOnEvent = false;
    this.isResizeOnEvent = false;
  }

  _mouseDown(e){
    //console.log('=====> _mouseDown',e);
    this.setState({mouseUpTimeSlotPostion: null,mouseOverTimeSlotPostions: [], resizeEventAtTimeSlot: null, moveEventToTimeSlot: null});
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
    //mainFrameForTimeSlotsPosition: mainFramePosition,
    this.setState({

                    mainFrameForTimeSlotsPositionWhenScrolling: mainFramePosition
                  });

  }

  _mouseUp(){
    console.log('=====> _mouseUp selectingObject = ',this.state.selectingObject);
    console.log('this.isClickOnEvent = ',this.isClickOnEvent);

    this.isMouseUp = true;
    this.isMouseDown = false;
    this.isMouseSelecting = false;
    this.isClickOnEvent = false;
    this.isClickOnTimeSlot = false;
    this.isResizeOnEvent = false;

    this.setState({
                    selectingObject: {isSelecting: false, isClickOnEvent: false, isClickOnTimeSlot: false, clientX:null, clientY: null}
                  });
    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();
  }

  _openSelector(e){
    var scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
    let mouseY = e.pageY + scrollerForTimeSlots.scrollTop;
    let mouseX = e.pageX + scrollerForTimeSlots.scrollLeft;
    this.isMouseSelecting = true;

    //Get new position of mainContainerForTimeSlots because it can change as we use scroller to move the container
    //So the top position will be changed
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
    var mainFramePosition = getBoundsForNode(container);

    this.setState({mainFrameForTimeSlotsPositionWhenScrolling: mainFramePosition})
    this.setState({
                    selectingObject: {
                                        isSelecting: true,
                                        isClickOnEvent: this.isClickOnEvent,
                                        isClickOnTimeSlot: this.isClickOnTimeSlot,
                                        isResizeOnEvent: this.isResizeOnEvent,
                                        clientX:e.pageX,
                                        clientY: e.pageY
                                      }
                  });
    //All caculation for eventslots
    if(this.isResizeOnEvent){
      //check whether resize or not, if yes, update height of event
      //when mouse up, check whether mouse move is used for resize or not
      //If it is resize, so find the timeslot that the mouse cursor is , so
      //=> set the height of event to cover that timeslot

      let resourceId = this.state.currentEventOnClick.resourceId;
      let timeslotAtMouse = findTimeSlot(this.state.matrixPositions[resourceId].timeslots,mouseY)
      if(timeslotAtMouse && (timeslotAtMouse.bottom - this.state.currentEventOnClick.top >= 25 ) ){
        this.setState({currentEventOnClick: Object.assign({},
                                                      this.state.currentEventOnClick,
                                                      {
                                                        height: timeslotAtMouse.bottom - this.state.currentEventOnClick.top,
                                                        bottom: timeslotAtMouse.bottom,
                                                        toTimeInMoment: timeslotAtMouse.toTimeInMoment,
                                                        toTimeInHHMM: timeslotAtMouse.toTimeInStr,
                                                        duration: timeslotAtMouse.toTimeInMoment.diff(this.state.currentEventOnClick.fromTimeInMoment,'minutes')
                                                      })})
        this._updateEvent(this.state.currentEventOnClick);
      }
    }else if(this.isClickOnEvent){
      //check for move the event
      let resourceId = this.state.currentEventOnClick.resourceId;
      let left = this.state.currentEventOnClick.left;
      let width = this.state.currentEventOnClick.width;
      let resourceAtMouse = findResource(this.state.columns,mouseX);
      //console.log('resourceAtMouse = ',resourceAtMouse);
      if(resourceAtMouse){
        resourceId = resourceAtMouse.resourceId;
        left = resourceAtMouse.left;
        width = resourceAtMouse.width;
      }

      let timeslotAtMouse = findTimeSlot(this.state.matrixPositions[resourceId].timeslots,mouseY)

      if(timeslotAtMouse){
        let newToTime = moment(timeslotAtMouse.timeInMoment).add(this.state.currentEventOnClick.duration,'m');
        //console.log('mouseY = ',mouseY,'timeslotAtMouse = ',timeslotAtMouse,' EventOnClick.fromTimeInMoment = ',this.state.currentEventOnClick.fromTimeInMoment,'this.state.currentEventOnClick.toTimeInMoment = ',this.state.currentEventOnClick.toTimeInMoment);
        this.setState({currentEventOnClick: Object.assign({},
                                                          this.state.currentEventOnClick,
                                                          {
                                                            top: timeslotAtMouse.top,
                                                            bottom: timeslotAtMouse.bottom,
                                                            fromTimeInHHMM: timeslotAtMouse.timeInStr,
                                                            fromTimeInMoment: timeslotAtMouse.timeInMoment,
                                                            toTimeInMoment: newToTime,
                                                            toTimeInHHMM: newToTime.format('HH:mm'),
                                                            left,
                                                            width,
                                                            resourceId
                                                          })});
        this._updateEvent(this.state.currentEventOnClick);
      }
    }else if(this.isClickOnTimeSlot){
      //update position for selecting timeslots
      let resourceId = this.state.selectingArea.resourceId;
      let timeslotAtMouse = findTimeSlot(this.state.matrixPositions[resourceId].timeslots,mouseY)
      if(timeslotAtMouse){
        this.setState({selectingArea:Object.assign({},this.state.selectingArea,{
                                        height: timeslotAtMouse.bottom - this.state.selectingArea.top,
                                        bottom: timeslotAtMouse.bottom,
                                        toTimeInMoment: timeslotAtMouse.toTimeInMoment,
                                        toTimeInStr: timeslotAtMouse.toTimeInStr,
                                        duration: timeslotAtMouse.toTimeInMoment.diff(this.state.selectingArea.fromTimeInMoment,'minutes')

                                     })
                      });
      }
    }


  }

  /// Begin all functions that relate to the event
  _setColumnsOfTimeSlots(resource){
    //console.log(' _setColumnsOfTimeSlots = ',resource);
    let columns = this.state.columns;
    columns.push(resource);
    //console.log(pmatrixPositions);
    this.setState({columns})
    //console.log('pmatrixPositions = ',pmatrixPositions);
  }

  _setMatrixPositionsOfTimeSlots(resourceId,timeslot){
    let pmatrixPositions = this.state.matrixPositions;
    //console.log(resourceId,timeslot,pmatrixPositions);
    if(pmatrixPositions[resourceId]){
      //console.log('existing = ',pmatrixPositions);
      pmatrixPositions[resourceId].timeslots.push(timeslot);
    }else{
      pmatrixPositions[resourceId] = {timeslots:[]};
      pmatrixPositions[resourceId].timeslots.push(timeslot);
      //console.log('new = ',pmatrixPositions);
    }
    //console.log(pmatrixPositions);
    this.setState({matrixPositions:pmatrixPositions})
    //console.log('pmatrixPositions = ',pmatrixPositions);
  }

  _updateEvent(event){
    //Update event element for events array
    this.state.events.map((e,i)=>{
      if(e.eventId === event.eventId){
        this.state.events[i] = event;
      }
    });
    this.setState({events:this.state.events});
  }

  _setEvents(event){
    let findEvent = this.state.events.find(e=>{
      return e.eventId === event.eventId
    });
    if(!findEvent){
      this.state.events.push(event);
      this.setState({events:this.state.events});
    }
  }

  _setCurrentEventOnClick(event){
    if(!this.isResizeOnEvent){
      console.log('frame._setCurrentEventOnClick event = ',event);
      this.isClickOnEvent = true;
      this.setState({currentEventOnClick:event});
    }
  }

  _setCurrentEventOnResize(event){
    console.log('frame._setCurrentEventOnResize event = ',event);
    this.isResizeOnEvent = true;
    this.setState({currentEventOnClick:event});
    //this.setState({currentEventOnResize:event});
  }

  /// End all functions that relate to the event

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
    this.isClickOnTimeSlot = true;
    this.setState({selectingArea:{
                                    resourceId: timeslotPosition.resourceId,
                                    top: timeslotPosition.top,
                                    left: timeslotPosition.left,
                                    height: timeslotPosition.height,
                                    width: timeslotPosition.width,
                                    bottom: timeslotPosition.bottom,
                                    right: timeslotPosition.right,
                                    fromTimeInMoment: timeslotPosition.timeInMoment,
                                    fromTimeInStr: timeslotPosition.timeInStr,
                                    toTimeInMoment: timeslotPosition.toTimeInMoment,
                                    toTimeInStr: timeslotPosition.toTimeInStr
                                 }
                  });
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

      selectingArea: this.state.selectingArea,
      setMatrixPositionsOfTimeSlots: this._setMatrixPositionsOfTimeSlots.bind(this),
      setColumnsOfTimeSlots: this._setColumnsOfTimeSlots.bind(this),
      setEvents: this._setEvents.bind(this),
      events: this.state.events,
      setCurrentResource: this._setCurrentResource.bind(this),
      setCurrentTimeSlotPostition: this._setCurrentTimeSlotPostition.bind(this),
      setMouseDownOnTimeSlot: this._setMouseDownOnTimeSlot.bind(this),
      setMouseUpOnTimeSlot: this._setMouseUpOnTimeSlot.bind(this),
      setMouseOverOnTimeSlot: this._setMouseOverOnTimeSlot.bind(this),
      setMouseClickOnTimeSlot: this._setMouseClickOnTimeSlot.bind(this),

      setCurrentEventOnClick: this._setCurrentEventOnClick.bind(this),
      setCurrentEventOnResize: this._setCurrentEventOnResize.bind(this),

      resizeEventAtTimeSlot: this.state.resizeEventAtTimeSlot,
      moveEventToTimeSlot: this.state.moveEventToTimeSlot
    };
  }

  componentDidMount() {
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
/*    container.addEventListener("mousemove", function(e) {
        console.log('=====> _mouseMove e.pageY = ',e.pageY,' e.clientY = ',e.clientY,' screenY = ',e.screenY,' layerY = ',e.layerY);
    }, false);
*/
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
                        style={{overflowX: 'scroll', overflowY: 'scroll', height: '600px'}}
                        ref="scrollerForTimeSlots"
                        >
                      <div className="fc-time-grid fc-unselectable">
                        {/* Begin column resources */}
                          <table ref="mainContainerForTimeSlots" >
                            <ScheduleResources hasTimeSlots={true}/>
                          </table>
                          <table>
                            <ScheduleResourceEvents/>
                          </table>
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
