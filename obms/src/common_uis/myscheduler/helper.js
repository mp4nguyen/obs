/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
import events from 'dom-helpers/events';
import moment from 'moment';

 export function addEventListener(type, handler) {
   events.on(document, type, handler)
   return {
     remove(){ events.off(document, type, handler) }
   }
 };

 export function findElementInMatrixByDate(slots,apptTime){
   let l = slots.length;
   let returnValue;
   //console.log('findTimeSlot = ',timeslots,y);
   let binarySearch = function(array,value,fromP,toP){
     let m = Math.floor((fromP + toP)/2);
     let object = array[m];
     //console.log(' checking object = ',object,' at position =',m,' fromP = ',fromP,' toP = ',toP);
     if(object.timeInMoment.isSameOrBefore(apptTime) && object.toTimeInMoment.isSameOrAfter(apptTime) ){
       return object;
     }else if(object.timeInMoment.isAfter(apptTime) ){
       return binarySearch(array,value,fromP,m);
     }else {
       return binarySearch(array,value,m,toP);
     }
   }
   if(l > 0){
     let minY = slots[0].timeInMoment;
     let maxY = slots[l-1].toTimeInMoment;
     if(apptTime.isBefore(minY)  || apptTime.isAfter(maxY)){
       return returnValue;
     }

     returnValue = binarySearch(slots,apptTime,0,l);
   }
   return returnValue;
 }

 export function findRostersForCurrentDate(rosters,currentDisplayDate){
    let foundRosters = [];

    let searchAll = function(prevPosition,foundRosters,rosters,currentDisplayDate,start,end,name){

      let rosterPosition = findRosterForCurrentDate(rosters,currentDisplayDate,start,end);

      //console.log(name,'  rosterPosition = ',rosterPosition);
      if(rosterPosition != null){
        foundRosters.push(rosters[rosterPosition]);
        searchAll(rosterPosition,foundRosters,rosters,currentDisplayDate,start,rosterPosition-1,'left');
        searchAll(rosterPosition,foundRosters,rosters,currentDisplayDate,rosterPosition+1,end,'right');
      }else{
        return null;
      }
    }

    searchAll(-1,foundRosters,rosters,currentDisplayDate,0,rosters.length);
    return foundRosters;
 }

 export function findRosterForCurrentDate(rosters,currentDisplayDate,start,end){
   //console.log('findRosterForCurrentDate rosters = ',rosters);
   let endPosition = end;
   if(endPosition == null){
      endPosition = rosters.length;
   }
   let startPosition = start||0;

   let returnValue;
   //console.log('findTimeSlot = ',timeslots,y);
   let binarySearch = function(array,value,fromP,toP,prevM){
     let m = Math.floor((fromP + toP)/2);

     if(m==prevM){
       return null;
     }

     let object = array[m];
     //console.log(' checking object = ',object,' at position =',m,' fromP = ',fromP,' toP = ',toP);
     if( moment(moment(object.fromTime).format('DD/MM/YYYY'),'DD/MM/YYYY').isSame(currentDisplayDate) ){
       return m;
     }else if( moment(moment(object.fromTime).format('DD/MM/YYYY'),'DD/MM/YYYY').isAfter(currentDisplayDate) ){
       return binarySearch(array,value,fromP,m,m);
     }else {
       return binarySearch(array,value,m,toP,m);
     }
   }
   if(endPosition > 0){
     let minY = moment(moment(rosters[startPosition].fromTime).format('DD/MM/YYYY'),'DD/MM/YYYY');
     let maxY = moment(moment(rosters[endPosition-1].fromTime).format('DD/MM/YYYY'),'DD/MM/YYYY');
     if(currentDisplayDate.isBefore(minY)  || currentDisplayDate.isAfter(maxY)){
       return returnValue;
     }

     returnValue = binarySearch(rosters,currentDisplayDate,startPosition,endPosition);
   }
   return returnValue;
 }


 export function findRosterByDate(rosters,apptTime){
   let l = rosters.length;
   let returnValue;
   //console.log('findRosterByDate = ',rosters,apptTime);
   let binarySearch = function(array,value,fromP,toP){
     if(toP - fromP > 1){
       let m = Math.floor((fromP + toP)/2);
       let object = array[m];
       //console.log(' checking object = ',object,' at position =',m,' fromP = ',fromP,' toP = ',toP,' ',object.fromTime,apptTime,object.toTime);
       if(object.fromTime <= apptTime && object.toTime >= apptTime){
         return object;
       }else if(object.fromTime > apptTime){
         return binarySearch(array,value,fromP,m);
       }else {
         return binarySearch(array,value,m,toP);
       }
     }else{
       let object = array[fromP];
       //console.log(' checking object = ',object,' at position =',fromP,' fromP = ',fromP,' toP = ',toP,' ',object.fromTime,apptTime,object.toTime);
       if(object.fromTime <= apptTime && object.toTime >= apptTime){
         return object;
       }else{
         let object = array[toP];
         //console.log(' checking object = ',object,' at position =',toP,' fromP = ',fromP,' toP = ',toP,' ',object.fromTime,apptTime,object.toTime);
         if(object.fromTime <= apptTime && object.toTime >= apptTime){
           return object;
         }else{
           return null;
         }
       }
     }
   }
   if(l > 0){
     let minY = rosters[0].fromTime;
     let maxY = rosters[l-1].toTime;
     if(apptTime <= minY || apptTime >= maxY){
       return returnValue;
     }

     returnValue = binarySearch(rosters,apptTime,0,l);
   }
   return returnValue;
 }

 export function findTimeSlot(timeslots,y){
   let l = timeslots.length;
   let returnValue;
   //console.log('findTimeSlot = ',timeslots,y);
   let binarySearch = function(array,value,fromP,toP){
     let m = Math.floor((fromP + toP)/2);
     let object = array[m];
     //console.log(' checking object = ',object,' at position =',m,' fromP = ',fromP,' toP = ',toP);
     if(object.top <= value && object.bottom >= value){
       return object;
     }else if(object.top > value){
       return binarySearch(array,value,fromP,m);
     }else {
       return binarySearch(array,value,m,toP);
     }
   }
   if(l > 0){
     let minY = timeslots[0].top;
     let maxY = timeslots[l-1].bottom;
     if(y <= minY || y >= maxY){
       return returnValue;
     }

     returnValue = binarySearch(timeslots,y,0,l);
   }
   return returnValue;
 }

 export function findResource(resources,x){
   let l = resources.length;
   let returnValue;
   //console.log('findTimeSlot = ',timeslots,y);
   let binarySearch = function(array,value,fromP,toP){
     let m = Math.floor((fromP + toP)/2);
     let object = array[m];
     if(object.left <= value && object.right >= value){
       return object;
     }else if(object.left > value){
       return binarySearch(array,value,fromP,m);
     }else {
       return binarySearch(array,value,m,toP);
     }
   }
   if(l > 0){
     let minX = resources[0].left;
     let maxX = resources[l-1].right;
     if(x <= minX || x >= maxX){
       return returnValue;
     }

     returnValue = binarySearch(resources,x,0,l);
   }
   return returnValue;
 }

export function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;

  var rect = node.getBoundingClientRect()
    , left = rect.left + pageOffset('left')
    , top = rect.top + pageOffset('top');
    //console.log(' rect = ',rect);
    //console.log(rect.top,'window.pageXOffset =',window.pageXOffset ,'window.pageYOffset=',window.pageYOffset,'document.body.scrollLeft=',document.body.scrollLeft,'document.body.scrollTop=',document.body.scrollTop);
  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top,
    width: rect.width

  };
}


function pageOffset(dir) {
  if (dir === 'left')
    return (window.pageXOffset || document.body.scrollLeft || 0)
  if (dir === 'top')
    return (window.pageYOffset || document.body.scrollTop || 0)
}
