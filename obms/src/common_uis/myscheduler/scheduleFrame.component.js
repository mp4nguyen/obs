import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import clone from 'clone';
import moment from 'moment';
import * as _ from 'underscore'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {setResource,setDisplayDate} from './redux/actions'
import {getBoundsForNode,addEventListener,findTimeSlot,findResource,findRosterByDate,findElementInMatrixByDate,findRosterForCurrentDate,findRostersForCurrentDate} from './helper';
import ScheduleResourceHeaders from './ScheduleResourceHeaders.component';
import ScheduleTimeColumn from './ScheduleTimeColumn.component';
import ScheduleResources from './ScheduleResources.component';
import ScheduleResourceEvents from './ScheduleResourceEvents.component';
import HashMap from 'HashMap';
/*
This class will control everything of scheduler:
  - create toolbar
  - create header with name of resource on the top
  - create the body with columns of resource with time slot inside
  - create the events and hightlight on the top of timeslots

  Structure of myScheduler:
                                                          ScheduleFrame
                                                                |
                --------------------------------------------------------------------------------------------------
                |                               |                             |                                   |
      ScheduleResourceHeaders          ScheduleTimeColumn           ScheduleResourceEvents                ScheduleResources
                |                               |                             |                                   |
      ScheduleResourceSlot             ScheduleResourceSlot         ScheduleEventColumn                  ScheduleResourceSlot
                                                |                             |                                   |
                                        ScheduleTimeSlot            ----------------------              ScheduleGroupByDuration
                                                                    |                    |
                                                      ScheduleHighLightTimeSlot   ScheduleEvent


resources = [
  {
    resourceId: 1,
    firstName: '',
    LastName: '',
    title: '',
    fullName: '',
    rosters:[
      resourceId: 1,
      fromTime: moment(),
      toTime: moment{},
      duration: 15,
      breakTime: moment(),
      breakDuration: 30,
    ]
  }
]
*/


class ScheduleFrame extends Component {

  static propTypes = {
    resources: PropTypes.array.isRequired,
    displayDate: PropTypes.objectOf(moment),
    eventTitleField: PropTypes.string,
    headerTitleField: PropTypes.string,
    headerNameField: PropTypes.string,
    columnWidth: PropTypes.number,
    selectingAreaCallback: PropTypes.func,
    clickingOnEventCallback: PropTypes.func,
    resizingEventCallback: PropTypes.func,
    movingEventCallback: PropTypes.func,
    eventWillAdd: PropTypes.object,
    appendEventCallback: PropTypes.func
  };

  static childContextTypes = {
    minTime: PropTypes.objectOf(moment),
    maxTime: PropTypes.objectOf(moment),
    minDuration: PropTypes.number,
    displayDate: PropTypes.objectOf(moment),
    eventTitleField: PropTypes.string,
    headerTitleField: PropTypes.string,
    headerNameField: PropTypes.string,
    columnWidth: PropTypes.number,
    resources: PropTypes.array,
    matrixPositions: PropTypes.object,
    events:PropTypes.object,
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
                     events:new HashMap(),
                     columns:[],
                     selectingArea: {top: 0, left: 0, height: 0, width: 0, resourceId: null},
                     currentResource: null,
                     currentTimeSlotPosotion: null,
                     mouseDownTimeSlotPostion: null,
                     mouseClickTimeSlotPostion: null,
                     currentEventOnClick:null,
                     currentEventOnResize:null
                  };
    //events:[]

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

    //used to display time slots for each resource
    //the beginning of time display on the scheduler is the min(fromTime of resource)
    //the ending of time display on the scheduler is the max(toTime of resource)
    //slot size = minDuration
    this.minTime = null;
    this.maxTime = null;
    this.minDuration = 0;


  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //to prevent the update GUI when make an appointment in the scheduler or search the patient
    //console.log('===========================>ScheduleFrame.shouldComponentUpdate nextProps.resources = ',nextProps.resources);
    //console.log('===========================>ScheduleFrame.shouldComponentUpdate this.props.resources = ',this.props.resources);
    //console.log('===========================>ScheduleFrame.shouldComponentUpdate nextProps.resources = ',nextState);
    //console.log('===========================>ScheduleFrame.shouldComponentUpdate this.props.resources = ',this.state);
    console.log('===========================>ScheduleFrame.shouldComponentUpdate !_.isEqual(nextProps.resources,this.props.resources) = ',(!_.isEqual(nextProps.resources,this.props.resources)));
    console.log('===========================>ScheduleFrame.shouldComponentUpdate !_.isEqual(nextState,this.state = ',(!_.isEqual(nextState,this.state)));
    return !_.isEqual(nextProps.resources,this.props.resources) || !_.isEqual(nextState,this.state);
  }

  appendEvent(events){
    console.log('===========================>ScheduleFrame.appendEvent will run......... with event = ',events);
    //find correct resource to append the new event
    this.props.resources.map(res=>{
        events.forEach(e=>{
          if(e.resourceId == res.resourceId){
            console.log(res);
            //
            let roster = findRosterByDate(res.rosters,e.fromTime);
            //console.log('===========================>ScheduleFrame.appendEvent found roster = ',roster);

            let fromTimeInMoment = moment(e.fromTime);
            let toTimeInMoment = moment(e.toTime);

            e.fromTimeInMoment = fromTimeInMoment;
            e.toTimeInMoment = toTimeInMoment;
            e.fromTimeInHHMM = fromTimeInMoment.format('HH:mm');
            e.toTimeInHHMM = toTimeInMoment.format('HH:mm');
            e.duration = toTimeInMoment.diff(fromTimeInMoment,'minutes');

            roster.events.push(e);
            //console.log('===========================>ScheduleFrame.appendEvent found roster ',roster,e);
            //console.log('===========================>ScheduleFrame.appendEvent found roster.events.length = ',roster.events.length);
            let slot = findElementInMatrixByDate(this.state.matrixPositions[res.resourceId].timeslots,e.fromTimeInMoment);
            //console.log('===========================>ScheduleFrame.appendEvent found slot = ',slot);

            e.bottom = slot.bottom;
            e.left = slot.left;
            e.right = slot.right;
            e.top = slot.top;
            e.width = slot.width;
            e.height = slot.bottom - slot.top;
            e.leftInPercent = 1;
            e.rightInPercent = 1;
            e.zIndex = 1;
            e.opacity = 1;

            console.log('===========================>ScheduleFrame.appendEvent event = ',e);
            this._setEvents(e);
            this.forceUpdate();
          }
        });
    });

  }

  _mouseDown(e){
    console.log('=====> _mouseDown',e);
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
    console.log('=====> _mouseUp selectingObject = ',this.state.selectingObject);
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
    //console.log(" >>>>> _setMatrixPositionsOfTimeSlots : ",resourceId,timeslot);
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
    //console.log('ScheduleFrame._updateEvent .....................................');
    let events = new HashMap(this.state.events);
    event.leftInPercent = 1;
    event.rightInPercent = 1;
    event.zIndex = 1;

    let findResource = events.get(event.resourceId);

    findResource.forEach((e,i)=>{
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

    var pEvent = findResource.get(event.eventId);
    pEvent = event;

    this.setState({events:events});

  }

  _setEvents(event){
    //console.log(' _setEvents = ',event);
    let events = (this.state.events);
    let findResource = events.get(event.resourceId);
    if(findResource){
      let findEvent = findResource.get(event.eventId);
      if(!findEvent){
        if(!event.fromTime){
          event.fromTime = event.fromTimeInMoment.format('DD/MM/YYYY HH:mm:ss');
          event.fromTimeInHHMM = event.fromTimeInMoment.format('HH:mm');
          event.toTime = event.toTimeInMoment.format('DD/MM/YYYY HH:mm:ss');
          event.toTimeInHHMM = event.toTimeInMoment.format('HH:mm');
        }
        findResource.set(event.eventId,event);
      }
    }else{
      let resouceHashMap = new HashMap(event.eventId,event);
      events.set(event.resourceId,resouceHashMap);
    }

    this.setState({events});
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
    //console.log('==================================>ScheduleFrame.getChildContext  this.state.events ',this.state.events);
    return {
      minTime: this.minTime,
      maxTime: this.maxTime,
      minDuration: this.minDuration,
      displayDate: this.currentDisplayDate,
      eventTitleField: this.props.eventTitleField,
      headerTitleField: this.props.headerTitleField,
      headerNameField: this.props.headerNameField,
      columnWidth: this.props.columnWidth,
      resources: this.state.resourcesAfterProcess,
      mainFrameForTimeSlotsPosition: this.state.mainFrameForTimeSlotsPosition,
      currentResource: this.state.currentResource,
      selectingArea: this.state.selectingArea,
      setMatrixPositionsOfTimeSlots: this._setMatrixPositionsOfTimeSlots.bind(this),
      setColumnsOfTimeSlots: this._setColumnsOfTimeSlots.bind(this),
      setEvents: this._setEvents.bind(this),
      events: clone(this.state.events),
      setCurrentResource: this._setCurrentResource.bind(this),
      setCurrentTimeSlotPostition: this._setCurrentTimeSlotPostition.bind(this),
      setMouseDownOnTimeSlot: this._setMouseDownOnTimeSlot.bind(this),
      setCurrentEventOnClick: this._setCurrentEventOnClick.bind(this),
      setCurrentEventOnResize: this._setCurrentEventOnResize.bind(this)
    };
  }

  componentWillMount(){
    //run through all resources and its rosters to get the currentRoster = displayDate
    console.log('===========================>ScheduleFrame.componentWillMount this.props.resources ',this.props.resources);
    this.currentDisplayDate = moment(this.props.displayDate.format('DD/MM/YYYY'),'DD/MM/YYYY');
    this.props.setDisplayDate(this.props.displayDate);
    this._setCurrentRosterForResources(this.props.resources);
  }

  componentDidMount() {
    if(this.state.resourcesAfterProcess.length > 0){
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
      console.log('===========================>ScheduleFrame.componentDidMount completed! with matrix = ',this.state.matrixPositions);
    }

  }

  componentDidUpdate(){

    if(!this.scrollerForTimeSlots){
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
      console.log('===========================>ScheduleFrame.componentDidMount completed! with matrix = ',this.state.matrixPositions);
    }

    if(this.isResourcesUpdate){
      this.isResourcesUpdate = false;
      console.log('===========================>ScheduleFrame.componentDidUpdate mainFrame update view........ because of resource changing');
      var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
      this.mainFramePosition = getBoundsForNode(container);
      this.setState({
                      mainFrameForTimeSlotsPosition: this.mainFramePosition
                    });

    }

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
    console.log('===========================>ScheduleFrame.componentDidUpdate fram.componentDidUpdate matrixPositions = ',this.state.matrixPositions);

  }

  componentWillReceiveProps(nextProps){
    console.log('===========================>ScheduleFrame.componentWillReceiveProps nextProps.resources = ',nextProps.resources);
    console.log('===========================>ScheduleFrame.componentWillReceiveProps this.props.resources = ',this.props.resources);

    // if(!_.isEqual(nextProps.displayDate,this.props.displayDate)){
    //   this.props.setDisplayDate(nextProps.displayDate).then(()=>{
    //     if(!_.isEqual(nextProps.resources,this.props.resources)){
    //       this.props.setResource(nextProps.resources);
    //       console.log('===========================>ScheduleFrame.componentWillReceiveProps received new resources.........');
    //       this.isResourcesUpdate = true;
    //       this._setCurrentRosterForResources(nextProps.resources);
    //     }
    //   });
    //
    // }else if(!_.isEqual(nextProps.resources,this.props.resources)){
    //   this.props.setResource(nextProps.resources);
    //   console.log('===========================>ScheduleFrame.componentWillReceiveProps received new resources.........');
    //   this.isResourcesUpdate = true;
    //   this._setCurrentRosterForResources(nextProps.resources);
    // }

    if(!_.isEqual(nextProps.resources,this.props.resources)){
      this.props.setResource(nextProps.resources);
      console.log('===========================>ScheduleFrame.componentWillReceiveProps received new resources.........');
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
    this.currentDisplayDate = clone(this.currentDisplayDate);
    this.currentDisplayDate.add(-1,'d');
    this.setState({matrixPositions: {}, events:[], columns:[]});
    this._setCurrentRosterForResources(this.props.resources);
  }

  _nextDay(){
    this.currentDisplayDate = clone(this.currentDisplayDate);
    this.currentDisplayDate.add(1,'d');
    this.setState({matrixPositions: {}, events:[], columns:[]});
    this._setCurrentRosterForResources(this.props.resources);
  }

  _today(){
    this.currentDisplayDate = clone(this.currentDisplayDate);
    this.currentDisplayDate = moment(moment().format('DD/MM/YYYY'),'DD/MM/YYYY');
    this.setState({matrixPositions: {}, events:[], columns:[]});
    this._setCurrentRosterForResources(this.props.resources);
  }

  _setCurrentRosterForResources(resources){
    console.log('===========================>ScheduleFrame._setCurrentRosterForResources is running resources = ',resources);
    //Process the resource to find the currentRoster
    //and then assign to resourcesAfterProcess state => the component can view data at displayDate

    let displayDate = this.currentDisplayDate;
    let resTemp = [];

    //used to display time slots for each resource
    //the beginning of time display on the scheduler is the min(fromTime of resource)
    //the ending of time display on the scheduler is the max(toTime of resource)
    //slot size = minDuration
    let minTime,maxTime,minDuration;
    let UCLN = function(x,y){
      while (x!=y) {
        if(x>y) x=x-y;
        else y=y-x;
      }
      return x;
    }

    resources.map(res=>{
      console.log(" -----> res = ",res);
      let currentRoster = {segments:[],duration:0,events:[]};

      //let roster = findRosterForCurrentDate(res.rosters,displayDate);
      //console.log('===========================>ScheduleFrame._setCurrentRosterForResources found roster = ',roster);

      /*
      Only process when rosters not null;
      Some doctors dont have rosters yets
      */
      if(Array.isArray(res.rosters)){

        let rosters = findRostersForCurrentDate(res.rosters,displayDate);
        console.log('===========================>ScheduleFrame._setCurrentRosterForResources found testrosters = ',rosters);
        rosters.forEach(roster=>{
          roster.fromTimeInMoment = moment(roster.fromTime);
          roster.toTimeInMoment = moment(roster.toTime);
          currentRoster.segments.push(roster);

          if(roster.events && Array.isArray(roster.events)){
            roster.events.forEach(e=>{
                currentRoster.events.push(e)
            });
          }

          if(currentRoster.duration == 0 || currentRoster.duration > roster.duration){
            //console.log('   ============> duration  = ',roster.duration);
            currentRoster.duration = roster.duration;
          }else{
            //console.log('   ============> duration with UCLN = ',roster.duration);
            currentRoster.duration = UCLN(currentRoster.duration,roster.duration);
          }

        });


        /////Begin Calculate min,max time and duration/////
        if(currentRoster.segments.length > 0){
          //Only generate resource that has the currentRoster = displayDate
          //need to implement the code to find the day of roster that is the display day
          //now, just take the first one
          currentRoster.fromTimeInMoment = moment(currentRoster.segments[0].fromTime);
          currentRoster.toTimeInMoment = moment(currentRoster.segments[currentRoster.segments.length-1].toTime);
          if(!minTime){
            minTime = currentRoster.fromTimeInMoment;
          }else if(minTime.isAfter(currentRoster.fromTimeInMoment)){
            minTime = currentRoster.fromTimeInMoment;
          }

          if(!maxTime){
            maxTime = currentRoster.toTimeInMoment;
          }else if(maxTime.isBefore(currentRoster.toTimeInMoment)){
            maxTime = currentRoster.toTimeInMoment;
          }

          if(!minDuration){
            minDuration = currentRoster.duration;
          }else{
            minDuration = UCLN(minDuration,currentRoster.duration);
          }
        }
        /////End Calculate min,max time and duration/////


        let newRes = Object.assign({},res,{currentRoster});
        resTemp = [...resTemp,newRes];
        //console.log('  ========> resTemp = ',resTemp);
      }else{
        console.log('===========================>ScheduleFrame._setCurrentRosterForResources found not an array ');
        let newRes = Object.assign({},res,{currentRoster});
        resTemp = [...resTemp,newRes];
      }
    });

    this.minDuration = minDuration;
    this.minTime = minTime;
    this.maxTime = maxTime;

    this.setState({resourcesAfterProcess:resTemp,events:new HashMap()});

    var scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
    if(scrollerForTimeSlots){
      scrollerForTimeSlots.scrollTop = 0;
    }

    //console.log('===========================>ScheduleFrame._setCurrentRosterForResources start at:',this.state);

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

  _renderScheduler(){
    if(this.state.resourcesAfterProcess.length > 0){
        //////////////Begin render scheduler when having a data//////////////
        return(
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
        );
        //////////////End render scheduler when having a data//////////////
    }else{
      return(<div>Loading data from the server</div>)
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
            <button type="button" className="fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right" onClick={this._today.bind(this)} >Today</button>
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
            {this._renderScheduler()}
          </div>
        </div>
      </div>
      )
    );
  }
}




function bindAction(dispatch) {
  return {
    setResource: (data) => dispatch(setResource(data)),
    setDisplayDate: (data) => dispatch(setDisplayDate(data)),

  };
}

function mapStateToProps(state){
	return {newResource:state.scheduler.resource};
}

export default connect(mapStateToProps,bindAction)(ScheduleFrame);
