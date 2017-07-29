import {
        SET_CURRENT_COMPANY,
        UPDATE_CURRENT_COMPANY_FIELDS,
        SAVE_CURRENT_COMPANY,
        ADD_DOCTOR_TO_CURRENT_COMPANY,
        UPDATE_DOCTOR_TO_CURRENT_COMPANY,
        ADD_CLINIC_TO_CURRENT_COMPANY,
        UPDATE_CLINIC_TO_CURRENT_COMPANY,
        FETCH_CLINIC_FROM_SERVER,
        FETCH_DOCTOR_FROM_SERVER,
        SET_CURRENT_CLINIC,
        SET_CURRENT_DOCTOR,
        UPDATE_CURRENT_CLINIC_FIELDS,
        SAVE_CURRENT_CLINIC,
        NEW_CLINIC,
        ADD_BOOKING_TYPE_TO_CURRENT_CLINIC,
        ADD_DOCTOR_TO_CURRENT_CLINIC
      } from '../actions/types';


let clinic = {
  clinicId: null,
	clinicName: null,
	isEnable: 1,
	companyId: null,
	isBookable: 0,
	isTelehealth: 0,
	isCalendar: 0,
	description: '',
	address:'',
	suburbDistrict: '',
	ward:'',
	postcode:'',
	stateProvince:'',
	country:'',
	latitude:null,
	longitude:null,
	iconBase64:'',
  bookingTypes:[],
  doctors:[]
}

let initState = {
  company: {},
  clinics: [],
  doctors: [],
  accounts: [],
  currentClinic: {},
  currentDoctor: {}
};


const ACTION_HANDLERS = {
  [SET_CURRENT_COMPANY]: (state, action) => {
    return {...state,company:action.currentCompany};
  },
  [UPDATE_CURRENT_COMPANY_FIELDS]: (state, action) => {
    return {...state,company: {...state.company,...action.currentCompany}};
  },
  [SAVE_CURRENT_COMPANY]: (state, action) => {
    return this.state
  },
  [FETCH_CLINIC_FROM_SERVER]: (state, action) => {
    return {...state,clinics:action.payload};
  },
  [FETCH_DOCTOR_FROM_SERVER]: (state, action) => {
    return {...state,doctors:action.payload};
  },
  [NEW_CLINIC]: (state, action) => {
    return {...state,currentClinic:{...clinic,companyId:state.company.companyId,iconBase64:state.company.iconBase64}};
  },
  [SET_CURRENT_CLINIC]: (state, action) => {
    return {...state,currentClinic:action.payload};
  },
  [UPDATE_CURRENT_CLINIC_FIELDS]: (state, action) => {
    return {...state,currentClinic:{...state.currentClinic,...action.payload}};
  },
  [ADD_BOOKING_TYPE_TO_CURRENT_CLINIC]: (state, action) => {
    return {...state,currentClinic:{...state.currentClinic,bookingTypes:[...state.currentClinic.bookingTypes,action.payload]}};
  },
  [ADD_DOCTOR_TO_CURRENT_CLINIC]: (state, action) => {
    return {...state,currentClinic:{...state.currentClinic,doctors:[...state.currentClinic.doctors,action.payload]}};
  },
  [SAVE_CURRENT_CLINIC]: (state, action) => {
    return {...state,currentClinic:action.payload};
  },
  [SET_CURRENT_DOCTOR]: (state, action) => {
    return {...state,currentDoctor:action.payload};
  },
};

export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
