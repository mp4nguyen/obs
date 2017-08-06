export const SET_RESOURCE = 'SET_RESOURCE';

export function setResource(resource){

  return({type:SET_RESOURCE,payload:resource});
  
  // goGetRequest('/admin/getBookingTypes').then(response => {
  //     console.log('______________userAction.login.listBookingTypes =',response);
  //     dispatch({type: types.FETCH_BOOKING_TYPES_FROM_SERVER,payload:response.data});
  //   })
  //   .catch(err => {
  //
  //   });
}
