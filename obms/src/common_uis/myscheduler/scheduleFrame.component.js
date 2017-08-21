import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import clone from 'clone';
import moment from 'moment';
import * as _ from 'underscore'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HashMap from 'HashMap';

import {setScroller,setResource,setDisplayDate,setMatrixPositions,setEvents,setMainFramePosition,setRef,setMouseSelecting,setMouseUp,nextDay,prevDay,toDay,setCurrentEventOnClick,updateEvent,setMouseDownOnTimeSlot,setEvent} from './redux/actions'
import {getBoundsForNode,addEventListener,findTimeSlot,findResource,findRosterByDate,findElementInMatrixByDate,findRosterForCurrentDate,findRostersForCurrentDate} from './helper';

import ScheduleResourceHeaders from './headers/ScheduleResourceHeaders.component';
import ScheduleTimeColumn from './timeColumn/ScheduleTimeColumn.component';
import ScheduleResources from './resourceSlots/ScheduleResources.component';
import ScheduleResourceEvents from './eventsAndHighlight/ScheduleResourceEvents.component';


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
          (./headers/)                    (./timeColumn/)           (./eventsAndHighlight/)               (./resourceSlots/)
      ScheduleResourceHeaders          ScheduleTimeColumn           ScheduleResourceEvents                ScheduleResources
                |                               |                             |                                   |
      ScheduleResourceSlot             ScheduleResourceSlot         ScheduleEventColumn                  ScheduleResourceSlot
                                                |                             |                                   |
                                        ScheduleTimeSlot            ----------------------              ScheduleResourceColumn
                                                                    |                    |                        |
                                                      ScheduleHighLightTimeSlot   ScheduleEvent         ScheduleGroupByDuration
                                                                                                                  |
                                                                                                           ScheduleTimeSlot

* When startup or change resource of the scheduler
  -1. ScheduleFrame.componentWillMount: -> trigger action: setDisplayDate
  0. ScheduleFrame.componentDidMount: if have resourcesAfterProcess
      0.1. this.props.setMainFramePosition(this.mainFramePosition);
      0.2. this.props.setRef({mainContainerForTimeSlots: this.refs.mainContainerForTimeSlots});
      0.3. this.props.setScroller({scrollerForTimeSlots: this.scrollerForTimeSlots, scrollerForTimeColumn: this.scrollerForTimeColumn, scrollerForHeaders: this.scrollerForHeaders});
  1. ScheduleFrame.componentWillReceiveProps: if current resource != next resource -> trigger action: setResource; setResource will find the current roster that = displayDate and make the currentRoster object and make resourcesAfterProcess
  2. ScheduleFrame.shouldComponentUpdate: trigger update the component if resourcesAfterProcess change
  3. Refresh the whole childen of the component
      3.1. render ScheduleGroupByDuration -> trigger the context.setMatrixPositionsOfTimeSlots of ScheduleFrame
      3.2 ScheduleFrame._setMatrixPositionsOfTimeSlots: update poition of all resource into this.matrixPositions; after that , trigger action -> setMatrixPositions after 10milliseconds
  4. ScheduleFrame.componentDidUpdate: trigger action ->   if have resourcesAfterProcess
      4.1. this.props.setMainFramePosition(this.mainFramePosition);
      4.2. this.props.setRef({mainContainerForTimeSlots: this.refs.mainContainerForTimeSlots});
      4.3. this.props.setScroller({scrollerForTimeSlots: this.scrollerForTimeSlots, scrollerForTimeColumn: this.scrollerForTimeColumn, scrollerForHeaders: this.scrollerForHeaders});


* when mouse clicks on resource timeslots or click and drag:
  1. ScheduleGroupByDuration -> trigger action: setMouseDownOnTimeSlot and set selectingArea = that slot
  2. ScheduleFrame._mouseDown will be triggered : add listener for mouse to listion mouse move and mouse up
  3. ScheduleFrame._openSelector will be triggered when mouse moving -> trigger action: setMouseSelecting to update "selectingArea"
  4. ScheduleFrame._mouseUp will be triggered when mouse up to finish -> will callback function "selectingAreaCallback" and trigger action: setMouseUp to clean up "selectingArea" and "mouseAction"

* when mouse click on event: there are 2 cases
  I. click on the event
    1. ScheduleEvent._onMouseDown: check isResizeOnEvent = false (make sure the mouse do not click on resize button)-> trigger action: setCurrentEventOnClick to update the currentEventOnClick on redux
    2. ScheduleFrame._onMouseDown  will be triggered : add listener for mouse to listion mouse move and mouse up
    3. ScheduleFrame._openSelector will be triggered when mouse moving -> trigger action: setMouseSelecting to update "currentEventOnClick"
      3.1. if detech the mouse moveving -> isMovingEvent = true
      3.2.
    4. ScheduleFrame._mouseUp will be triggered when mouse up to finish -> will callback function "selectingAreaCallback" and trigger action: setMouseUp to clean up "selectingArea" and "mouseAction"
      4.1. if isMovingEvent = true -> trigger callback "movingEventCallback"
      4.2. if isMovingEvent = false -> trigger callback "clickingOnEventCallback"
  II. click on the resize button of event



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
      events:[
        {
          resourceId:1,
          eventId:1,
          fromTime:,
          toTime:,
        }
      ]
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
    appendEventCallback: PropTypes.func,
    loadedSchedulerCallback: PropTypes.func,
  };

  static childContextTypes = {
    eventTitleField: PropTypes.string,
    headerTitleField: PropTypes.string,
    headerNameField: PropTypes.string,
    columnWidth: PropTypes.number,
    setMatrixPositionsOfTimeSlots: PropTypes.func,
    setMouseDownOnTimeSlot: PropTypes.func,
    setEvent: PropTypes.func,
  };

  getChildContext(){
    //console.log('==================================>ScheduleFrame.getChildContext  this.state.events ',this.state.events);
    return {
      eventTitleField: this.props.eventTitleField,
      headerTitleField: this.props.headerTitleField,
      headerNameField: this.props.headerNameField,
      columnWidth: this.props.columnWidth,
      setMatrixPositionsOfTimeSlots: this._setMatrixPositionsOfTimeSlots.bind(this),
      setMouseDownOnTimeSlot: this.props.setMouseDownOnTimeSlot,
      setEvent: this.props.setEvent,
    };
  }

  constructor(props){
    super(props);
    this.state = {
                     matrixPositions: {},
                     columns:[],
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




    this.mainFramePosition = {};
    this.mainFramePositionWhenScrolling = {};
    this.currentDisplayDate = null;
    this.scrollerForTimeSlots = null;
    this.scrollerForTimeSlotsControl = {prevTop:0,direction:''};

    this.scrollerForTimeColumn = null;
    this.scrollerForTimeColumnControl = {prevTop:0,direction:''};

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
    this.events = new HashMap();
    this.matrixPositions = {};
    this.timeOutId = null;
    this.setEventsTimeOutId = null;
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEqual(nextProps.resources,this.props.resources)){
      //console.log('===========================>ScheduleFrame.componentWillReceiveProps received new resources.........');
      this.props.setResource(nextProps.resources).then(rosterIds=>{
        this._loadedSchedulerCallback(rosterIds)
      });
      this.isResourcesUpdate = true;
    }
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    //to prevent the update GUI when make an appointment in the scheduler or search the patient
    //console.log('  1.4.1. ***************** ScheduleFrame.shouldComponentUpdate  ');
    return !_.isEqual(nextProps.resourcesAfterProcess,this.props.resourcesAfterProcess) || !_.isEqual(nextProps.events,this.props.events) || !_.isEqual(nextState,this.state) ;
  }

  componentWillMount(){
    //run through all resources and its rosters to get the currentRoster = displayDate
    //console.log('===========================>ScheduleFrame.componentWillMount this.props.resources ',this.props.resources);
    this.currentDisplayDate = moment(this.props.displayDate.format('DD/MM/YYYY'),'DD/MM/YYYY');
    this.props.setDisplayDate(this.currentDisplayDate);
    //this._setCurrentRosterForResources(this.props.resources);
  }

  componentDidMount() {
    if(this.props.resourcesAfterProcess.length > 0){
      var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
      this.scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
      this.scrollerForTimeColumn = ReactDOM.findDOMNode(this.refs.scrollerForTimeColumn);
      this.scrollerForHeaders = ReactDOM.findDOMNode(this.refs.scrollerForHeaders);
      this.mainFramePosition = getBoundsForNode(container);

      this.props.setMainFramePosition(this.mainFramePosition);
      this.props.setRef({mainContainerForTimeSlots: this.refs.mainContainerForTimeSlots});
      this.props.setScroller({scrollerForTimeSlots: this.scrollerForTimeSlots, scrollerForTimeColumn: this.scrollerForTimeColumn, scrollerForHeaders: this.scrollerForHeaders});
      //When first create the compoment; the compoments were sorted => no need to sort
      this.isNeedSortAfterColumnsAndTimeSlotsUpdated = false;
      //console.log('===========================>ScheduleFrame.componentDidMount completed! with matrix = ',this.props.matrixPositions);
    }

  }

  componentDidUpdate(){

    if(!this.scrollerForTimeSlots){
      var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
      if(container){
        this.scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
        this.scrollerForTimeColumn = ReactDOM.findDOMNode(this.refs.scrollerForTimeColumn);
        this.scrollerForHeaders = ReactDOM.findDOMNode(this.refs.scrollerForHeaders);
        this.mainFramePosition = getBoundsForNode(container);

        this.props.setMainFramePosition(this.mainFramePosition);
        this.props.setRef({mainContainerForTimeSlots: this.refs.mainContainerForTimeSlots});
        this.props.setScroller({scrollerForTimeSlots: this.scrollerForTimeSlots, scrollerForTimeColumn: this.scrollerForTimeColumn, scrollerForHeaders: this.scrollerForHeaders});

        //When first create the compoment; the compoments were sorted => no need to sort
        this.isNeedSortAfterColumnsAndTimeSlotsUpdated = false;
        //console.log('===========================>ScheduleFrame.componentDidMount completed! with matrix = ',this.props.matrixPositions);
      }
    }

    if(this.isResourcesUpdate){
      this.isResourcesUpdate = false;
      //console.log('===========================>ScheduleFrame.componentDidUpdate mainFrame update view........ because of resource changing');
      var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
      if(container){
        this.mainFramePosition = getBoundsForNode(container);

        this.props.setMainFramePosition(this.mainFramePosition);
        this.props.setRef({mainContainerForTimeSlots: this.refs.mainContainerForTimeSlots});

      }
    }

    if(this.isNeedSortAfterColumnsAndTimeSlotsUpdated){
      this.isNeedSortAfterColumnsAndTimeSlotsUpdated = false;
      let matrix = clone(this.props.matrixPositions);
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
    //console.log('===========================>ScheduleFrame.componentDidUpdate fram.componentDidUpdate matrixPositions = ',this.props.matrixPositions);

  }

  componentWillUnmount(){
    this._onMouseDownListener && this._onMouseDownListener.remove();
  }

  // appendEvent(events){
  //   console.log('===========================>ScheduleFrame.appendEvent will run......... with event = ',events);
  //   //find correct resource to append the new event
  //   this.props.resources.map(res=>{
  //       events.forEach(e=>{
  //         if(e.resourceId == res.resourceId){
  //           console.log(res);
  //           //
  //           let roster = findRosterByDate(res.rosters,e.fromTime);
  //           //console.log('===========================>ScheduleFrame.appendEvent found roster = ',roster);
  //
  //           let fromTimeInMoment = moment(e.fromTime);
  //           let toTimeInMoment = moment(e.toTime);
  //
  //           e.fromTimeInMoment = fromTimeInMoment;
  //           e.toTimeInMoment = toTimeInMoment;
  //           e.fromTimeInHHMM = fromTimeInMoment.format('HH:mm');
  //           e.toTimeInHHMM = toTimeInMoment.format('HH:mm');
  //           e.duration = toTimeInMoment.diff(fromTimeInMoment,'minutes');
  //
  //           roster.events.push(e);
  //           //console.log('===========================>ScheduleFrame.appendEvent found roster ',roster,e);
  //           //console.log('===========================>ScheduleFrame.appendEvent found roster.events.length = ',roster.events.length);
  //           let slot = findElementInMatrixByDate(this.props.matrixPositions[res.resourceId].timeslots,e.fromTimeInMoment);
  //           //console.log('===========================>ScheduleFrame.appendEvent found slot = ',slot);
  //
  //           e.bottom = slot.bottom;
  //           e.left = slot.left;
  //           e.right = slot.right;
  //           e.top = slot.top;
  //           e.width = slot.width;
  //           e.height = slot.bottom - slot.top;
  //           e.leftInPercent = 1;
  //           e.rightInPercent = 1;
  //           e.zIndex = 1;
  //           e.opacity = 1;
  //
  //           console.log('===========================>ScheduleFrame.appendEvent event = ',e);
  //           //this._setEvents(e);
  //           this.forceUpdate();
  //         }
  //       });
  //   });
  //
  // }

  _mouseDown(e){
    console.log('=====> _mouseDown',e);
    // Right clicks
    if (e.which === 3 || e.button === 2) return;

    this._mouseUp = this._mouseUp.bind(this);
    this._openSelector = this._openSelector.bind(this);
    this._onMouseUpListener = addEventListener('mouseup', this._mouseUp)
    this._onMouseMoveListener = addEventListener('mousemove', this._openSelector)

  }

  _mouseUp(){
    console.log('=====> _mouseUp selectingObject = ',this.state.selectingObject);


    if(this.props.currentEventOnClick.isResizeOnEvent){
      if(this.props.resizingEventCallback){
        this.props.resizingEventCallback(this.props.currentEventOnClick);
      }
    }else if(this.props.currentEventOnClick.isMovingEvent){
      if(this.props.movingEventCallback){
        this.props.movingEventCallback(this.props.currentEventOnClick);
      }
    }else if(this.props.currentEventOnClick.isClickOnEvent){
      if(this.props.clickingOnEventCallback){
        this.props.clickingOnEventCallback(this.props.currentEventOnClick);
      }
    }else if(this.props.mouseAction.isClickOnTimeSlot){
      if(this.props.selectingAreaCallback){
        this.props.selectingAreaCallback(this.props.selectingArea);
      }
    }

    this.props.setMouseUp();

    this._onMouseUpListener && this._onMouseUpListener.remove();
    this._onMouseMoveListener && this._onMouseMoveListener.remove();
  }

  _openSelector(e){
    this.props.setMouseSelecting(e);
  }


  _setMatrixPositionsOfTimeSlots(resourceId,timeslot){
    //console.log(" >>>>> _setMatrixPositionsOfTimeSlots : ",resourceId,timeslot);
    if(this.matrixPositions[resourceId]){
      //console.log('existing = ',pmatrixPositions);
      this.matrixPositions[resourceId].timeslots.push(timeslot);
    }else{
      this.matrixPositions[resourceId] = {timeslots:[]};
      this.matrixPositions[resourceId].timeslots.push(timeslot);
      //console.log('new = ',pmatrixPositions);
    }

    //this prevent to call redux too much; just call int the last one
    clearTimeout(this.timeOutId);
    this.timeOutId = setTimeout(()=>{
      this.props.setMatrixPositions(this.matrixPositions)
    },10)
  }

  _moveTimeSlotsScrollerToTheTop(){
    var scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
    if(scrollerForTimeSlots){
      scrollerForTimeSlots.scrollTop = 0;
    }
  }

  _prevDay(){
    this._moveTimeSlotsScrollerToTheTop();
    this.props.prevDay().then(rosterIds=>{
      this._loadedSchedulerCallback(rosterIds)
    });
  }

  _nextDay(){
    this._moveTimeSlotsScrollerToTheTop();
    this.props.nextDay().then(rosterIds=>{
      this._loadedSchedulerCallback(rosterIds)
    });
  }

  _today(){
    this.props.toDay().then(rosterIds=>{
      this._loadedSchedulerCallback(rosterIds)
    });
  }

  _loadedSchedulerCallback(data){
    console.log("current rosters id = ",data);
      if(this.props.loadedSchedulerCallback){
        this.props.loadedSchedulerCallback(data);
      }
  }

  _onScrollOfTimeSlots(){

    if(this.scrollerForTimeSlots.scrollTop > this.scrollerForTimeSlotsControl.prevTop){
      this.scrollerForTimeSlotsControl.prevTop = this.scrollerForTimeSlots.scrollTop;
      this.scrollerForTimeSlotsControl.direction = 'DOWN';
    }else if(this.scrollerForTimeSlots.scrollTop < this.scrollerForTimeSlotsControl.prevTop){
      this.scrollerForTimeSlotsControl.prevTop = this.scrollerForTimeSlots.scrollTop;
      this.scrollerForTimeSlotsControl.direction = 'UP';
    }


    if(this.scrollerForTimeColumn && this.scrollerForTimeSlots){
      this.scrollerForTimeColumn.scrollTop = this.scrollerForTimeSlots.scrollTop;
    }

    if(this.scrollerForTimeSlots.scrollTop < 100 && this.scrollerForTimeSlotsControl.direction == 'UP'){
      this.scrollerForTimeColumn.scrollTop = 0;
      this.scrollerForTimeSlots.scrollTop = 0;
    }



    if(this.scrollerForHeaders && this.scrollerForTimeSlots){
      this.scrollerForHeaders.scrollLeft = this.scrollerForTimeSlots.scrollLeft;
    }
  }

  _onScrollOfTimeColumn(){
    if(this.scrollerForTimeColumn && this.scrollerForTimeSlots){
      this.scrollerForTimeSlots.scrollTop = this.scrollerForTimeColumn.scrollTop;
    }

    // console.log(" this.scrollerForTimeSlots.scrollTop = ",this.scrollerForTimeSlots.scrollTop);
    // console.log(" this.scrollerForTimeColumn.scrollTop = ",this.scrollerForTimeColumn.scrollTop);
  }

  _onScrollOfHeader(){
    if(this.scrollerForHeaders && this.scrollerForTimeSlots){
      this.scrollerForTimeSlots.scrollLeft = this.scrollerForHeaders.scrollLeft;
    }
  }

  _renderScheduler(){
    if(this.props.resourcesAfterProcess.length > 0){
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
    let displayDate="";
    if(this.props.currentDisplayDate){
      displayDate = this.props.currentDisplayDate.format('DD/MM/YYYY')
    }

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
            <h2>{displayDate}</h2>
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
    setScroller: (data) => dispatch(setScroller(data)),
    setResource: (data) => dispatch(setResource(data)),
    setDisplayDate: (data) => dispatch(setDisplayDate(data)),
    setMatrixPositions: (data) => dispatch(setMatrixPositions(data)),
    setEvents: (data) => dispatch(setEvents(data)),
    setMainFramePosition: (data) => dispatch(setMainFramePosition(data)),
    setRef: (data) => dispatch(setRef(data)),
    setMouseSelecting: (data) => dispatch(setMouseSelecting(data)),
    setMouseUp: (data) => dispatch(setMouseUp(data)),
    nextDay: () => dispatch(nextDay()),
    prevDay: () => dispatch(prevDay()),
    toDay: () => dispatch(toDay()),
    setCurrentEventOnClick: (data) => dispatch(setCurrentEventOnClick(data)),
    updateEvent: (event,currentEventOnClick) => dispatch(updateEvent(event,currentEventOnClick)),
    setMouseDownOnTimeSlot: (data) => dispatch(setMouseDownOnTimeSlot(data)),
    setEvent: (data) => dispatch(setEvent(data)),
  };
}

function mapStateToProps(state){
	return {
          currentDisplayDate: state.scheduler.displayDate,
          newResource: state.scheduler.resource,
          resourcesAfterProcess: state.scheduler.resourcesAfterProcess,
          matrixPositions: state.scheduler.matrixPositions,
          mouseAction: state.scheduler.mouseAction,
          events: state.scheduler.events,
          selectingArea: state.scheduler.selectingArea,
          currentEventOnClick: state.scheduler.currentEventOnClick,
         };
}

export default connect(mapStateToProps,bindAction)(ScheduleFrame);

//
// _updateEvent(event){
//   //Update event element for events array
//   //console.log('ScheduleFrame._updateEvent .....................................');
//   let events = new HashMap(this.state.events);
//   event.leftInPercent = 1;
//   event.rightInPercent = 1;
//   event.zIndex = 1;
//
//   let findResource = events.get(event.resourceId);
//
//   findResource.forEach((e,i)=>{
//     //console.log(e.fullName,'  ',e.top,' ',e.bottom,' ',e.leftInPercent,'  ',e.rightInPercent);
//     if( (e.eventId != event.eventId) &&
//         (e.resourceId === event.resourceId) &&
//         (
//           (e.top == event.top) ||
//           (e.bottom == event.bottom) ||
//           (e.top < event.top && event.top < e.bottom)||
//           (e.top < event.bottom && event.bottom < e.bottom)||
//           (event.top < e.top && e.top < event.bottom)||
//           (event.top < e.bottom && e.bottom < event.bottom)
//         )
//       ){
//       //event overlap in the same column => adjust the leftInPercent and rightInPercent
//       e.leftInPercent = 1;
//       e.rightInPercent = 30;
//       e.zIndex = 1;
//       event.leftInPercent = 30;
//       event.rightInPercent = 1;
//       event.zIndex = 2;
//       console.log('moving event =',event,' event in array = ',e);
//     }else{
//       e.rightInPercent = 1;
//       e.leftInPercent = 1;
//       e.zIndex = 1;
//     }
//   });
//
//   var pEvent = findResource.get(event.eventId);
//   pEvent = event;
//
//   this.setState({events:events});
//
// }
//

  //
  // _setCurrentEventOnClick(event){
  //   if(!this.isResizeOnEvent){
  //     console.log('frame._setCurrentEventOnClick event = ',event);
  //     this.isClickOnEvent = true;
  //     event.opacity = 0.7;
  //     this.setState({currentEventOnClick:event});
  //   }
  // }
  //
  // _setCurrentEventOnResize(event){
  //   console.log('frame._setCurrentEventOnResize event = ',event);
  //   this.isResizeOnEvent = true;
  //   this.setState({currentEventOnClick:event});
  //   //this.setState({currentEventOnResize:event});
  // }

  // /// Begin all functions that relate to the event
  // _setColumnsOfTimeSlots(resource){
  //   //console.log(' _setColumnsOfTimeSlots = ',resource);
  //   let columns = this.state.columns;
  //   columns.push(resource);
  //   //console.log(pmatrixPositions);
  //   this.setState({columns});
  //   this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  //   //console.log('pmatrixPositions = ',pmatrixPositions);
  // }
  //
  //
  // _setMatrixPositionsOfTimeSlots(resourceId,timeslot){
  //   let pmatrixPositions = this.state.matrixPositions;
  //   //console.log(" >>>>> _setMatrixPositionsOfTimeSlots : ",resourceId,timeslot);
  //   if(pmatrixPositions[resourceId]){
  //     //console.log('existing = ',pmatrixPositions);
  //     pmatrixPositions[resourceId].timeslots.push(timeslot);
  //   }else{
  //     pmatrixPositions[resourceId] = {timeslots:[]};
  //     pmatrixPositions[resourceId].timeslots.push(timeslot);
  //     //console.log('new = ',pmatrixPositions);
  //   }
  //   //console.log(pmatrixPositions);
  //   this.setState({matrixPositions:pmatrixPositions});
  //   this.isNeedSortAfterColumnsAndTimeSlotsUpdated = true;
  //   //console.log('pmatrixPositions = ',pmatrixPositions);
  // }


  // _setMouseDownOnTimeSlot(timeslotPosition){
  //   //move to redux
  //
  //   // var container = ReactDOM.findDOMNode(this.refs.mainContainerForTimeSlots);
  //   // var mainFrame = getBoundsForNode(container);
  //   console.log('frame._setMouseDownOnTimeSlot = ',timeslotPosition,'mainFrame=',mainFrame,'this.mainFramePosition=',this.mainFramePosition);
  //   this.isClickOnTimeSlot = true;
  //   this.setState({selectingArea:{
  //                                   resourceId: timeslotPosition.resourceId,
  //                                   topAfterOffset: timeslotPosition.top - this.mainFramePosition.top,
  //                                   top: timeslotPosition.top,
  //                                   left: timeslotPosition.left,
  //                                   height: timeslotPosition.height,
  //                                   width: timeslotPosition.width,
  //                                   bottom: timeslotPosition.bottom,
  //                                   right: timeslotPosition.right,
  //                                   fromTimeInMoment: timeslotPosition.timeInMoment,
  //                                   fromTimeInStr: timeslotPosition.timeInStr,
  //                                   toTimeInMoment: timeslotPosition.toTimeInMoment,
  //                                   toTimeInStr: timeslotPosition.toTimeInStr
  //                                }
  //                 });
  // }


  //
  // _setCurrentRosterForResources(resources){
  //   //move to redux
  //   console.log('===========================>ScheduleFrame._setCurrentRosterForResources is running resources = ',resources);
  //   //Process the resource to find the currentRoster
  //   //and then assign to resourcesAfterProcess state => the component can view data at displayDate
  //
  //   let displayDate = this.currentDisplayDate;
  //   let resTemp = [];
  //
  //   //used to display time slots for each resource
  //   //the beginning of time display on the scheduler is the min(fromTime of resource)
  //   //the ending of time display on the scheduler is the max(toTime of resource)
  //   //slot size = minDuration
  //   let minTime,maxTime,minDuration;
  //   let UCLN = function(x,y){
  //     while (x!=y) {
  //       if(x>y) x=x-y;
  //       else y=y-x;
  //     }
  //     return x;
  //   }
  //
  //   resources.map(res=>{
  //     console.log(" -----> res = ",res);
  //     let currentRoster = {segments:[],duration:0,events:[]};
  //
  //     //let roster = findRosterForCurrentDate(res.rosters,displayDate);
  //     //console.log('===========================>ScheduleFrame._setCurrentRosterForResources found roster = ',roster);
  //
  //     /*
  //     Only process when rosters not null;
  //     Some doctors dont have rosters yets
  //     */
  //     if(Array.isArray(res.rosters)){
  //
  //       let rosters = findRostersForCurrentDate(res.rosters,displayDate);
  //       console.log('===========================>ScheduleFrame._setCurrentRosterForResources found testrosters = ',rosters);
  //       rosters.forEach(roster=>{
  //         roster.fromTimeInMoment = moment(roster.fromTime);
  //         roster.toTimeInMoment = moment(roster.toTime);
  //         currentRoster.segments.push(roster);
  //
  //         if(roster.events && Array.isArray(roster.events)){
  //           roster.events.forEach(e=>{
  //               currentRoster.events.push(e)
  //           });
  //         }
  //
  //         if(currentRoster.duration == 0 || currentRoster.duration > roster.duration){
  //           //console.log('   ============> duration  = ',roster.duration);
  //           currentRoster.duration = roster.duration;
  //         }else{
  //           //console.log('   ============> duration with UCLN = ',roster.duration);
  //           currentRoster.duration = UCLN(currentRoster.duration,roster.duration);
  //         }
  //
  //       });
  //
  //
  //       /////Begin Calculate min,max time and duration/////
  //       if(currentRoster.segments.length > 0){
  //         //Only generate resource that has the currentRoster = displayDate
  //         //need to implement the code to find the day of roster that is the display day
  //         //now, just take the first one
  //         currentRoster.fromTimeInMoment = moment(currentRoster.segments[0].fromTime);
  //         currentRoster.toTimeInMoment = moment(currentRoster.segments[currentRoster.segments.length-1].toTime);
  //         if(!minTime){
  //           minTime = currentRoster.fromTimeInMoment;
  //         }else if(minTime.isAfter(currentRoster.fromTimeInMoment)){
  //           minTime = currentRoster.fromTimeInMoment;
  //         }
  //
  //         if(!maxTime){
  //           maxTime = currentRoster.toTimeInMoment;
  //         }else if(maxTime.isBefore(currentRoster.toTimeInMoment)){
  //           maxTime = currentRoster.toTimeInMoment;
  //         }
  //
  //         if(!minDuration){
  //           minDuration = currentRoster.duration;
  //         }else{
  //           minDuration = UCLN(minDuration,currentRoster.duration);
  //         }
  //       }
  //       /////End Calculate min,max time and duration/////
  //
  //
  //       let newRes = Object.assign({},res,{currentRoster});
  //       resTemp = [...resTemp,newRes];
  //       //console.log('  ========> resTemp = ',resTemp);
  //     }else{
  //       console.log('===========================>ScheduleFrame._setCurrentRosterForResources found not an array ');
  //       let newRes = Object.assign({},res,{currentRoster});
  //       resTemp = [...resTemp,newRes];
  //     }
  //   });
  //
  //   this.minDuration = minDuration;
  //   this.minTime = minTime;
  //   this.maxTime = maxTime;
  //
  //   this.setState({resourcesAfterProcess:resTemp,events:new HashMap()});
  //
  //   var scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
  //   if(scrollerForTimeSlots){
  //     scrollerForTimeSlots.scrollTop = 0;
  //   }
  //
  //   //console.log('===========================>ScheduleFrame._setCurrentRosterForResources start at:',this.state);
  //
  // }
  //
