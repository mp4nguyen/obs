import moment from 'moment';
import {getBoundsForNode,addEventListener,findTimeSlot,findResource,findRosterByDate,findElementInMatrixByDate,findRosterForCurrentDate,findRostersForCurrentDate} from '../../helper';
import {SET_RESOURCE,PROCESSING_RESOURCE,SET_MIN_MAX_DURATION} from './index'


export default function transformResourceData(dispatch,displayDate,resources){

    ///////////////Begin Transform/////////////////
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
      //console.log(" -----> setResource.js res = ",res);
      let currentRoster = {segments:[],duration:0,events:[]};

      //let roster = findRosterForCurrentDate(res.rosters,displayDate);
      //console.log('===========================>ScheduleFrame._setCurrentRosterForResources found roster = ',roster);

      /*
      Only process when rosters not null;
      Some doctors dont have rosters yets
      */
      if(Array.isArray(res.rosters)){


        let rosters = findRostersForCurrentDate(res.rosters,displayDate);
        //console.log('======> setResource.js  rosters  = ',rosters , displayDate);
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
        //console.log('====> setResource.js  found not an array ');
        let newRes = Object.assign({},res,{currentRoster});
        resTemp = [...resTemp,newRes];
      }
    });

    // this.minDuration = minDuration;
    // this.minTime = minTime;
    // this.maxTime = maxTime;

    //this.setState({resourcesAfterProcess:resTemp,events:new HashMap()});
    dispatch({type:SET_MIN_MAX_DURATION,payload:{minDuration,minTime,maxTime}})
    dispatch({type:PROCESSING_RESOURCE,payload:resTemp})

    //temporary stop
    // var scrollerForTimeSlots = ReactDOM.findDOMNode(this.refs.scrollerForTimeSlots);
    // if(scrollerForTimeSlots){
    //   scrollerForTimeSlots.scrollTop = 0;
    // }

    ///////////////End Transform/////////////////

}
