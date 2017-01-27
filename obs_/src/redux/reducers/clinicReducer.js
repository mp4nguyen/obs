
import {LOAD_CLINICS_FROM_SERVER,MOUSE_ENTER_CLINIC,MOUSE_LEAVE_CLINIC,SELECT_TIME,INITIAL_TIME,CLOSE_DATEPICKER_DIALOG,TEST_ACTION1,OTHER_USERS_RESERVE_APPT} from '../actions/types';
import moment from 'moment';

var clone = require('clone');

/*var strToDate = function(dateSTR){
    if(dateSTR){
        var t = dateSTR.split(/[- : T .]/);
        var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
        return d; // No TZ subtraction on this sample
    }
    return "";
};*/

let clinicReducer = function(clinics = [], action) {
  switch (action.type) {
  	case LOAD_CLINICS_FROM_SERVER:
      //when search button pressing; the app will connect to the server to get the data and set the date = today
      console.log('clinicReducer = ',action);
      let newObject5 = clone(action.payload.data.clinics);
      let ptoday0 = moment().format('DD/MM/YYYY');

      for(var i in newObject5){
        var clinicObject = newObject5[i];
        clinicObject.currentCalendars = [];
        console.log(' clinicObject = ',clinicObject,' ptoday0 = ',ptoday0);
        //run through all rosters and find the roster day is today
        for(var j in clinicObject.Rosters){
          console.log('clinicObject.Rosters[j].calendarDateInStr = ',clinicObject.Rosters[j].calendarDateInStr);
          //if action.date = null , it means that user no select date => so get the current day
          //if action.dat != null , means the user select date, need to get that date
          if(clinicObject.Rosters[j].calendarDateInStr == ptoday0 && !action.date){
            console.log('pushing......');
            //newObject3[i].currentCalendars = newObject3[i].Rosters[j].Calendars;
            clinicObject.currentCalendars.push(...clinicObject.Rosters[j].Calendars);
          }else if(clinicObject.Rosters[j].calendarDateInStr == action.date){
            console.log('pushing......');
            //newObject3[i].currentCalendars = newObject3[i].Rosters[j].Calendars;
            clinicObject.currentCalendars.push(...clinicObject.Rosters[j].Calendars);
          }
        }
      }
      return newObject5;
  		//return action.payload.clinics;
    case MOUSE_ENTER_CLINIC:
      let newObject = clone(clinics);
      newObject[action.clinicIndex-1].isMouseEnter = true;
    	return newObject;
    case MOUSE_LEAVE_CLINIC:
		  let newObject2 = clone(clinics);
      newObject2[action.clinicIndex-1].isMouseEnter = false;
    	return newObject2;
    case INITIAL_TIME:
      //when search button pressing; the app will connect to the server to get the data and set the date = today
      console.log('clinicReducer = ',action);
      let newObject3 = clone(action.payload.data.clinics);
      let ptoday = moment().format('DD/MM/YYYY');

      console.log('ptoday = ',ptoday);

      for(var i in newObject3){
        var clinicObject = newObject3[i];
        clinicObject.currentCalendars = [];
        //run through all rosters and find the roster day is today
        for(var j in clinicObject.Rosters){
          if(clinicObject.Rosters[j].calendarDateInStr == ptoday){
            //newObject3[i].currentCalendars = newObject3[i].Rosters[j].Calendars;
            clinicObject.currentCalendars.push(...clinicObject.Rosters[j].Calendars);
          }
        }
      }
      return newObject3;
    case SELECT_TIME:
      console.log('clinicReducer.SELECT_TIME = ',action);
      let newObject4 = clone(clinics);
      let ptoday2 = moment().format('DD/MM/YYYY');
      let ptomorrow2 = moment().add(1,'d').format('DD/MM/YYYY');
      console.log('ptoday = ',ptoday2,ptomorrow2);

      for(var i in newObject4){
        var clinicObject = newObject4[i];
        //run through all rosters and find the roster day is today
        for(var j in clinicObject.Rosters){
          if(action.time.name == 'Today' && clinicObject.Rosters[j].calendarDateInStr == ptoday2){
            //newObject3[i].currentCalendars = newObject3[i].Rosters[j].Calendars;
            clinicObject.currentCalendars = clinicObject.Rosters[j].Calendars;
          }else if(action.time.name == 'Tomorrow' && clinicObject.Rosters[j].calendarDateInStr == ptomorrow2){
            clinicObject.currentCalendars = clinicObject.Rosters[j].Calendars;
          }
        }
      }
      return newObject4;
    case OTHER_USERS_RESERVE_APPT:
        console.log("clinicReducer.OTHER_USERS_RESERVE_APPT = ",action);
        let newClinicsObject = clone(clinics);
        for(var a in newClinicsObject){
          if(newClinicsObject[a].clinicId == action.calendar.clinicId){
            for(var b in newClinicsObject[a].Rosters){
              if(newClinicsObject[a].Rosters[b].rosterId == action.calendar.rosterId){
                for(var c in newClinicsObject[a].Rosters[b].Calendars){
                  if(newClinicsObject[a].Rosters[b].Calendars[c].calendarId == action.calendar.calendarId){
                    //console.log('will remove this element = ',c,newClinicsObject[a],newClinicsObject[a].Rosters[b].Calendars[c]);
                    newClinicsObject[a].Rosters[b].Calendars.splice(c,1);
                    //console.log('will remove this element = ',newClinicsObject[a]);
                    break;
                  }
                }
                break;
              }
            }
            break;
          }
        }
        return newClinicsObject;
    default:
      return clinics;
  }
};

export default clinicReducer;
