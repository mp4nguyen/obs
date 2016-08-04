import io from 'socket.io-client';
import  * as types from '../actions/types';

export default function socketIOMiddleware({dispatch}){
  let apiUrl = 'https://localhost:3001';//'https://192.168.36.56:3001'
  let socket = io(apiUrl);

  socket.on('connect', function () { console.log("socket connected"); });

  socket.on('welcome', function (data) {
  	console.log("socket connected welcome = ",data);
  });

  socket.on('APPOINTMENT_RESERVE',function(data){
  	console.log('APPOINTMENT_RESERVE = ',data);
    const otherUsersReserveApptAction = {type:types.OTHER_USERS_RESERVE_APPT,calendar:data};
    dispatch(otherUsersReserveApptAction);
  });

  socket.emit('msg', { user: 'me', msg: 'whazzzup?' });

  console.log('socketIOMiddleware started....');

  return next => action => {
    console.log("action = ",action);
    switch (action.type) {
    	case types.CURRENT_BOOKING_SET_CALENDAR:
        console.log('day roi !!!',action);
        socket.emit('APPOINTMENT_RESERVE', {msg: 'setCalendarForCurrentBooking', calendar: action.calendar});
    }
    next(action);
  };
}
