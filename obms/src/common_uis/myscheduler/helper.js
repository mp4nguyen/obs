/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
 import events from 'dom-helpers/events';

 export function addEventListener(type, handler) {
   events.on(document, type, handler)
   return {
     remove(){ events.off(document, type, handler) }
   }
 };

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
