import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import clone from 'clone';
import moment from 'moment';
import * as _ from 'underscore'

import {getBoundsForNode,addEventListener,findTimeSlot,findResource} from './helper';
import ScheduleResourceHeaders from './ScheduleResourceHeaders.component';
import ScheduleTimeColumn from './ScheduleTimeColumn.component';
import ScheduleResources from './ScheduleResources.component';
import ScheduleResourceEvents from './ScheduleResourceEvents.component';

/*
This class will control everything of scheduler:
  - create toolbar
  - create header with name of resource on the top
  - create the body with columns of resource with time slot inside
  - create the events and hightlight on the top of timeslots
*/
export default class ScheduleFrame extends Component {

  static propTypes = {
    resources: PropTypes.array.isRequired,
    displayDate: PropTypes.objectOf(moment),
    eventTitleField: PropTypes.string,
    columnWidth: PropTypes.number,
    selectingAreaCallback: PropTypes.func,
    clickingOnEventCallback: PropTypes.func,
    resizingEventCallback: PropTypes.func,
    movingEventCallback: PropTypes.func,
    eventWillAdd: PropTypes.object
  };

  static childContextTypes = {
    displayDate: PropTypes.objectOf(moment),
    eventTitleField: PropTypes.string,
    columnWidth: PropTypes.number,
    resources: PropTypes.array,
    matrixPositions: PropTypes.object,
    events:PropTypes.array,
    selectingArea: PropTypes.object,
    mainFrameForTimeSlotsPosition: PropTypes.object,
    currentResource: PropTypes.object,
    setMatrixPositionsOfTimeSlots: PropTypes.func,
    setColumnsOfTimeSlots: PropTypes.func,
    setEvents:PropTypes.func,
    setCurrentResource: PropTypes.func,
    setCurrentTimeSlotPostition: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setCurrentEventOnClick: PropTypes.func,
    setCurrentEventOnResize: PropTypes.func,
  };


  constructor(props){
    super(props);
    this.state = {
                     resourcesAfterProcess: [],
                     mainFrameForTimeSlotsPosition: {top:0},
                     matrixPositions: {},
                     events:[],
                     columns:[],
                     selectingArea: {top: 0, left: 0, height: 0, width: 0, resourceId: null},
                     currentResource: null,
                     currentTimeSlotPosotion: null,
                     mouseDownTimeSlotPostion: null,
                     mouseClickTimeSlotPostion: null,
                     currentEventOnClick:null,
                     currentEventOnResize:null


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
    this.isMovingEvent = false;
    this.isResizeOnEvent = false;
    this.mainFramePosition = {};
    this.mainFramePositionWhenScrolling = {};
    this.currentDisplayDate = null;
    this.scrollerForTimeSlots = null;
    this.scrollerForTimeColumn = null;
    this.scrollerForHeaders = null;
    //use for update the mainFramePosition because componentDidMount, the mainFramePosition is not correct
    //need this variable to get the new mainFramePosition when the componentDidUpdate
    this.isResourcesUpdate = false;
    //use to control the sort after the compomentDidUpdate the childen: columns and timeslots
    this.isNeedSortAfterColumnsAndTimeSlotsUpdated = false
  }

  _mouseDown(e){
    //console.log('=====> _mouseDown',e);
    // Right clicks
    if (e.which === 3 || e.button === 2)
      return;

    this.isMouseDown = true;
    this.isMouseUp = false;
    this._mouseUp = this._mouseUp.bind(this);
    this._openSelector = this._openSelector.bind(this);
    this._onMouseUpListener = addEventListener('mouseup', this._mouseUp)
    this._onMouseMoveListener = addEventListener('mousemove', this._openSelector)

  }

  _mouseUp(){
    //console.log('=====> _mouseUp selectingObject = ',this.state.selectingObject);
    //console.log('this.isClickOnEvent = ',this.isClickOnEvent);

    if(this.isResizeOnEvent){
      if(this.props.resizingEventCallback){
        this.props.resizingEventCallback(this.state.currentEventOnClick);
      }
    }else if(this.isMovingEvent){
      if(this.props.movingEventCallback){
        this.props.movingEventCallback(this.state.currentEventOnClick);
      }
      this.setState({currentEventOnClick: Object.assign({},
                                                        this.state.currentEventOnClick,
                                                        {
                                                          opacity: 1
                                                        })});
      this._updateEvent(this.state.currentEventOnClick);
    }else if(this.isClickOnEvent){
      console.log('isClickOnEvent ...........');
      this.setState({currentEventOnClick: Object.assign({},
                                                        this.state.currentEventOnClick,
                                                        {
                                                          opacity: 1
                                                        })});
      this._updateEvent(this.state.currentEventOnClick);
      if(this.props.clickingOnEventCallback){
        this.props.clickingOnEventCallback(this.state.currentEventOnClick);
      }
    }else if(this.isClickOnTimeSlot){
      //when select area finish => trigger the function to add event to the resourceId
      if(this.props.selectingAreaCallback){
        this.props.selectingAreaCallback(this.state.selectingArea);
      }
      this.setState({selectingArea:{}});
    }
    this.isMouseUp = true;
    this.isMouseDown = false;
    this.isMouseSelecting = false;
    this.isClickOnEvent = false;
    this.isClickOnTimeSlot = false;
    this.isResizeOnEvent = false;
    this.isMovingEvent = false;


    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();
  }

  _openSelector(e){

    let mouseY = e.pageY;
    let mouseX = e.pageX;

    if(this.scrollerForTimeSlots){
      mouseY = e.pageY + this.scrollerForTimeSlots.scrollTop;
      mouseX = e.pageX + this.scrollerForTimeSlots.scrollLeft;
    }

    //console.log('mouseX = ',mouseX,'mouseY = ',mouseY);

    this.isMouseSelecting = true;

    //Get new position of mainContainerForTimeSlots because it can change as we use scroller to move the container
    //So the top position will be changed
    //All caculation for eventslots
    if(this.isResizeOnEvent){
      //check whether resize or not, if yes, update height of event
      //when mouse up, check whether mouse move is used for resize or not
      //If it is resize, so find the timeslot that the mouse cursor is , so
      //=> set the height of event to cover that timeslot

      let resourceId = this.state.currentEventOnClick.resourceId;
      let timeslotAtMouse = findTimeSlot(this.state.matrixPositions[resourceId].timeslots,mouseY)
      if(
            timeslotAtMouse &&
            (timeslotAtMouse.bottom - this.state.currentEventOnClick.top >= 25 ) &&
            timeslotAtMouse.bottom != this.state.currentEventOnClick.bottom
        ){


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
      this.isMovingEvent = true;
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

      if(resourceAtMouse && timeslotAtMouse && (timeslotAtMouse.top != this.state.currentEventOnClick.top || left != this.state.currentEventOnClick.left)){
        let newToTime = moment(timeslotAtMouse.timeInMoment).add(this.state.currentEventOnClick.duration,'m');
        //console.log('mouseY = ',mouseY,'timeslotAtMouse = ',timeslotAtMouse,' EventOnClick.fromTimeInMoment = ',this.state.currentEventOnClick.fromTimeInMoment,'this.state.currentEventOnClick.toTimeInMoment = ',this.state.currentEventOnClick.toTimeInMoment);
        this.setState({currentEventOnClick: Object.assign({},
                                                          this.state.currentEventOnClick,
                                                          {
                                                            top: timeslotAtMouse.top,
                                                            bottom: timeslotAtMouse.top + this.state.currentEventOnClick.height,
                                                            fromTimeInHHMM: timeslotAtMouse.timeInStr,
                                                            fromTimeInMoment: timeslotAtMouse.timeInMoment,
                                                            toTimeInMoment: newToTime,
                                                            toTimeInHHMM: newToTime.format('HH:mm'),
                                                            left,
                                                            width,
                                                            resourceId,
                                                            opacity: 0.7
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
    this.setState({columns});
    this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
    //console.log('pmatrixPositions = ',pmatrixPositions);
  }

  _setMatrixPositionsOfTimeSlots(resourceId,timeslot){
    let pmatrixPositions = this.state.matrixPositions;
    //console.log(resourceId,timeslot);
    if(pmatrixPositions[resourceId]){
      //console.log('existing = ',pmatrixPositions);
      pmatrixPositions[resourceId].timeslots.push(timeslot);
    }else{
      pmatrixPositions[resourceId] = {timeslots:[]};
      pmatrixPositions[resourceId].timeslots.push(timeslot);
      //console.log('new = ',pmatrixPositions);
    }
    //console.log(pmatrixPositions);
    this.setState({matrixPositions:pmatrixPositions});
    this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
    //console.log('pmatrixPositions = ',pmatrixPositions);
  }

  _updateEvent(event){
    //Update event element for events array
    let events = clone(this.state.events);
    let eventIndex = -1;
    event.leftInPercent = 1;
    event.rightInPercent = 1;
    event.zIndex = 1;
    events.map((e,i)=>{
      if(e.eventId === event.eventId){
        eventIndex = i;
      }
      //console.log(e.fullName,'  ',e.top,' ',e.bottom,' ',e.leftInPercent,'  ',e.rightInPercent);
      if( (e.eventId != event.eventId) &&
          (e.resourceId === event.resourceId) &&
          (
            (e.top == event.top) ||
            (e.bottom == event.bottom) ||
            (e.top < event.top && event.top < e.bottom)||
            (e.top < event.bottom && event.bottom < e.bottom)||
            (event.top < e.top && e.top < event.bottom)||
            (event.top < e.bottom && e.bottom < event.bottom)
          )
        ){
        //event overlap in the same column => adjust the leftInPercent and rightInPercent
        e.leftInPercent = 1;
        e.rightInPercent = 30;
        e.zIndex = 1;
        event.leftInPercent = 30;
        event.rightInPercent = 1;
        event.zIndex = 2;
        console.log('moving event =',event,' event in array = ',e);
      }else{
        e.rightInPercent = 1;
        e.leftInPercent = 1;
        e.zIndex = 1;
      }
    });


    if(eventIndex >= 0){
      events[eventIndex] = event;
    }

    this.setState({events:events});
  }

  _setEvents(event){
    console.log(' _setEvents = ',event);
    let findEvent = this.state.events.find(e=>{
      return e.eventId === event.eventId
    });
    if(!findEvent){
      if(!event.fromTime){
        event.fromTime = event.fromTimeInMoment.format('DD/MM/YYYY HH:mm:ss');
        event.fromTimeInHHMM = event.fromTimeInMoment.format('HH:mm');
        event.toTime = event.toTimeInMoment.format('DD/MM/YYYY HH:mm:ss');
        event.toTimeInHHMM = event.toTimeInMoment.format('HH:mm');
        console.log(' _setEvents = ',event);
      }
      this.state.events.push(event);
      this.setState({events:this.state.events});
    }
  }

  _setCurrentEventOnClick(event){
    if(!this.isResizeOnEvent){
      console.log('frame._setCurrentEventOnClick event = ',event);
      this.isClickOnEvent = true;
      event.opacity = 0.7;
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
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
    var mainFrame = getBoundsForNode(container);
    console.log('frame._setMouseDownOnTimeSlot = ',timeslotPosition,'mainFrame=',mainFrame,'this.mainFramePosition=',this.mainFramePosition);
    this.isClickOnTimeSlot = true;
    this.setState({selectingArea:{
                                    resourceId: timeslotPosition.resourceId,
                                    topAfterOffset: timeslotPosition.top - this.mainFramePosition.top,
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


  getChildContext(){
    return {
      displayDate: this.props.displayDate,
      eventTitleField: this.props.eventTitleField,
      columnWidth: this.props.columnWidth,
      resources: this.state.resourcesAfterProcess,
      mainFrameForTimeSlotsPosition: this.state.mainFrameForTimeSlotsPosition,
      currentResource: this.state.currentResource,
      selectingArea: this.state.selectingArea,
      setMatrixPositionsOfTimeSlots: this._setMatrixPositionsOfTimeSlots.bind(this),
      setColumnsOfTimeSlots: this._setColumnsOfTimeSlots.bind(this),
      setEvents: this._setEvents.bind(this),
      events: this.state.events,
      setCurrentResource: this._setCurrentResource.bind(this),
      setCurrentTimeSlotPostition: this._setCurrentTimeSlotPostition.bind(this),
      setMouseDownOnTimeSlot: this._setMouseDownOnTimeSlot.bind(this),
      setCurrentEventOnClick: this._setCurrentEventOnClick.bind(this),
      setCurrentEventOnResize: this._setCurrentEventOnResize.bind(this)
    };
  }

  componentWillMount(){
    //run through all resources and its rosters to get the currentRoster = displayDate
    this.currentDisplayDate = this.props.displayDate
    this._setCurrentRosterForResources(this.props.resources);
  }

  componentDidMount() {
    var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
    this.scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
    this.scrollerForTimeColumn = ReactDOM.findDOMNode(this.refs.scrollerForTimeColumn);
    this.scrollerForHeaders = ReactDOM.findDOMNode(this.refs.scrollerForHeaders);
    this.mainFramePosition = getBoundsForNode(container);
    this.setState({
                    mainFrameForTimeSlotsPosition: this.mainFramePosition
                  });
    //When first create the compoment; the compoments were sorted => no need to sort
    this.isNeedSortAfterColumnsAndTimeSlotsUpdated = false;
    console.log('fram.componentDidMount completed!');

  }

  componentDidUpdate(){

    if(this.isResourcesUpdate){
      this.isResourcesUpdate = false;
      console.log('mainFrame update view........ because of resource changing');
      var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
      this.mainFramePosition = getBoundsForNode(container);
      this.setState({
                      mainFrameForTimeSlotsPosition: this.mainFramePosition
                    });

    }

    console.log('fram.componentDidUpdate completed!');
    if(this.isNeedSortAfterColumnsAndTimeSlotsUpdated){
      this.isNeedSortAfterColumnsAndTimeSlotsUpdated = false;
      let matrix = clone(this.state.matrixPositions);
      let columns = clone(this.state.columns);
      for (var property in matrix) {
        if (matrix.hasOwnProperty(property)) {
          if(property == 'timeslots'){
            matrix[property].sort((a,b)=>{
              return a.top - b.top;
            });
          }
        }
      }

      columns.sort((a,b)=>{
        return a.left - b.left;
      });

      this.setState({
        matrixPositions: matrix,
        columns
      });
    }

  }

  componentWillReceiveProps(nextProps){
    console.log('ScheduleFrame.componentWillReceiveProps = ',nextProps);
    if(nextProps.eventWillAdd){
      this._setEvents(nextProps.eventWillAdd);
    }
    if(!_.isEqual(nextProps.resources,this.props.resources)){
      console.log('received new resources.........');
      this.isResourcesUpdate = true;
      this._setCurrentRosterForResources(nextProps.resources);
    }

  }

/*  shouldComponentUpdate(nextProps,nextState){
    if(!_.isEqual(nextProps.resources,this.props.resources) ){
      return true
    }
    return false;
  }
*/
  componentWillUnmount() {

  }
  componentWillUnmount(){
    console.log('Unmounting the scheduler');
    this._onMouseDownListener && this._onMouseDownListener.remove();
  }

  _prevDay(){
    this.currentDisplayDate.add(-1,'d');
    this.setState({matrixPositions: {}, events:[], columns:[]});
    this._setCurrentRosterForResources(this.props.resources);
  }

  _nextDay(){
    this.currentDisplayDate.add(1,'d');
    this.setState({matrixPositions: {}, events:[], columns:[]});
    this._setCurrentRosterForResources(this.props.resources);
  }

  _setCurrentRosterForResources(resources){
    //Process the resource to find the currentRoster
    //and then assign to resourcesAfterProcess state => the component can view data at displayDate
    let displayDate = this.currentDisplayDate;
    let resTemp = [];
    resources.map(res=>{
      let currentRoster = res.rosters.find(function(roster){
        let fromTimeInMoment = moment(roster.fromTime,'DD/MM/YYYY');
        //console.log('fromTimeInMoment=',fromTimeInMoment);
        return displayDate.isSame(fromTimeInMoment);
      });
      let newRes = Object.assign({},res,{currentRoster});
      resTemp = [...resTemp,newRes];

    });
    this.setState({resourcesAfterProcess:resTemp});
    console.log('resourcesAfterProcess = ',this.state.resourcesAfterProcess);
    var scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
    if(scrollerForTimeSlots){
      scrollerForTimeSlots.scrollTop = 0;
    }
  }

  _onScrollOfTimeSlots(){
    if(this.scrollerForTimeColumn && this.scrollerForTimeSlots){
      this.scrollerForTimeColumn.scrollTop = this.scrollerForTimeSlots.scrollTop;
    }
    if(this.scrollerForHeaders && this.scrollerForTimeSlots){
      this.scrollerForHeaders.scrollLeft = this.scrollerForTimeSlots.scrollLeft;
    }
  }

  _onScrollOfTimeColumn(){
    if(this.scrollerForTimeColumn && this.scrollerForTimeSlots){
      this.scrollerForTimeSlots.scrollTop = this.scrollerForTimeColumn.scrollTop;
    }
  }

  _onScrollOfHeader(){
    if(this.scrollerForHeaders && this.scrollerForTimeSlots){
      this.scrollerForTimeSlots.scrollLeft = this.scrollerForHeaders.scrollLeft;
    }
  }

  render() {
    return (
      (
      <div className="fc fc-unthemed fc-ltr">
        {/* Begin calendar toolbar*/}
        <div className="fc-toolbar">
          <div className="fc-left">
            <div className="fc-button-group">
              <button type="button" className="fc-prev-button fc-button fc-state-default fc-corner-left" onClick={this._prevDay.bind(this)}>
                <span className="fc-icon fc-icon-left-single-arrow"></span>
              </button>
              <button type="button" className="fc-next-button fc-button fc-state-default fc-corner-right" onClick={this._nextDay.bind(this)}>
                <span className="fc-icon fc-icon-right-single-arrow"></span>
              </button>
            </div>
            <button type="button" className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right">today</button>
          </div>
          <div className="fc-right">
            <div className="fc-button-group">
              <button type="button" className="fc-month-button fc-button fc-state-default fc-corner-left">month</button>
              <button type="button" className="fc-agendaWeek-button fc-button fc-state-default fc-state-active">week</button>
              <button type="button" className="fc-agendaDay-button fc-button fc-state-default fc-corner-right">day</button>
            </div>
          </div>
          <div className="fc-center">
            <h2>{this.currentDisplayDate.format('DD/MM/YYYY')}</h2>
          </div>
          <div className="fc-clear"></div>
        </div>
        {/* End calendar toolbar*/}
        <div className="fc-view-container" >
          <div className="fc-view fc-agendaDay-view fc-agenda-view" >
            <table>
              {/* Begin calendar header*/}
              <thead className="fc-head">
                <tr>
                  <td className="fc-resource-area fc-widget-header"  style={{width:'48.78125px',height:'22px'}} >

                  </td>
                  <td className="fc-time-area fc-widget-header">
                    <div className="fc-scroller-clip"  style={{height:'24px'}}>
                      <div className="fc-scroller fc-no-scrollbars" style={{overflowX: 'scroll', overflowY: 'hidden', margin: '0px',height:'24px'}} ref="scrollerForHeaders" onScroll={this._onScrollOfHeader.bind(this)}>

                          <table style={{height:'24px'}} >
                            <ScheduleResourceHeaders/>
                          </table>

                      </div>
                    </div>
                  </td>
                </tr>
              </thead>
              {/* End calendar header*/}
              {/* Begin calendar body*/}
              <tbody className="fc-body">
                <tr>
                  <td className="fc-resource-area fc-widget-content" style={{width:'48.78125px'}}>
                    <div className="fc-scroller-clip">
                      <div className="fc-scroller  fc-no-scrollbars" style={{overflowX: 'auto', overflowY: 'scroll', height: '600px', margin: '0px'}} ref="scrollerForTimeColumn" onScroll={this._onScrollOfTimeColumn.bind(this)}>
                          <div className="fc-time-grid">
                            <table>
                              <ScheduleTimeColumn></ScheduleTimeColumn>
                            </table>
                          </div>
                      </div>
                    </div>
                  </td>
                  <td className="fc-time-area fc-widget-content fc-unselectable">
                    <div className="fc-scroller-clip">
                      {/* Begin time session */}
                      <div
                          className="fc-time-grid-container"
                          style={{overflowX: 'scroll', overflowY: 'scroll', height: '600px'}}
                          ref="scrollerForTimeSlots"
                          onScroll={this._onScrollOfTimeSlots.bind(this)}
                          >
                        <div className="fc-time-grid" >
                          {/* Begin column resources */}
                            <table>
                              <ScheduleResourceEvents/>
                            </table>
                            <table ref="mainContainerForTimeSlots" >
                              <ScheduleResources hasTimeSlots={true}/>
                            </table>
                        </div>
                      </div>
                      {/* End time session */}
                    </div>
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
