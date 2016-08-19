import axios from 'axios';
import moment from 'moment';
import {toastr} from 'react-redux-toastr';

import * as types from './types';
import {getRequest,postRequest} from './lib/request';
import {mySqlDateToString} from './lib/mySqlDate';

export function	updateFieldForPatientDetail(field){
  return {
    type: types.UPDATE_FIELDS_FOR_PATIENT_DETAIL,
    field
  };
};


export function	createPatient(patientDetail,cb){
  //let doctorObject = clone(currentDoctor);
  console.log('will createPatient = ',patientDetail);

  return function(dispatch){
    postRequest('/CCompanies/createPatient',patientDetail)
      .then(res => {
        console.log('response=',res);
        if(res.data.patient){
          if(cb) cb(res.data.patient);
          toastr.success('', 'Created patient successfully !');
          dispatch({type:types.CREATE_PATIENT_FOR_PATIENT_DETAIL,payload:res.data.patient});
        }
      })
      .catch((err) => {
        console.log('err=',err);
        toastr.error('Fail to save patient (' + err + ')')
      });
  }

};
