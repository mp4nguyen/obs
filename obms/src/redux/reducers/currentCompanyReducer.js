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
        ADD_DOCTOR_TO_CURRENT_CLINIC,
        NEW_DOCTOR,
        UPDATE_CURRENT_DOCTOR_FIELDS,
        ADD_BOOKING_TYPE_OF_DOCTOR,
        REMOVE_BOOKING_TYPE_OF_DOCTOR,
        ADD_CLINIC_OF_DOCTOR,
        REMOVE_CLINIC_OF_DOCTOR,
        SAVE_CURRENT_DOCTOR,
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
};

let doctor={
  doctorId : null,
	companyId : null,
	isEnable : null,
	personId : null,
	timeInterval : null,
	userId : null,
	title : null,
	firstName : null,
	lastName : null,
	fullName : null,
	dob : null,
	gender : null,
	phone : null,
	mobile : null,
	occupation : null,
	address : null,
	ward : null,
	suburbDistrict : null,
	postcode : null,
	stateProvince : null,
	country : null,
	email : null,
	signatureId : null,
	iconBase64 : null,
	username : null,
	userType : null,
	accountIsEnable : null,
	signatureUrl : null,
	avatarId : null,
	avatarUrl : null,
  bookingTypes: [],
  clinics: [],
};

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
  [NEW_CLINIC]: (state, action) => {
    return {...state,currentClinic:{...clinic,companyId:state.company.companyId}};
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
  [FETCH_DOCTOR_FROM_SERVER]: (state, action) => {
    return {...state,doctors:action.payload};
  },
  [NEW_DOCTOR]: (state, action) => {
    return {...state,currentDoctor:{...doctor,companyId:state.company.companyId}};
  },
  [SET_CURRENT_DOCTOR]: (state, action) => {
    return {...state,currentDoctor:action.payload};
  },
  [UPDATE_CURRENT_DOCTOR_FIELDS]: (state, action) => {
    return {...state,currentDoctor:{...state.currentDoctor,...action.payload}};
  },
  [ADD_BOOKING_TYPE_OF_DOCTOR]: (state, action) => {
    return {...state,currentDoctor:{...state.currentDoctor,bookingTypes:[...state.currentDoctor.bookingTypes,action.payload]}};
  },
  [REMOVE_BOOKING_TYPE_OF_DOCTOR]: (state, action) => {
    let bts = [];
    state.currentDoctor.bookingTypes.forEach(bt=>{
      if(bt.bookingTypeId != action.payload.bookingTypeId){
        bts.push(bt);
      }
    });
    return {...state,currentDoctor:{...state.currentDoctor,bookingTypes:bts}};
  },
  [ADD_CLINIC_OF_DOCTOR]: (state, action) => {
    return {...state,currentDoctor:{...state.currentDoctor,clinics:[...state.currentDoctor.clinics,action.payload]}};
  },
  [REMOVE_CLINIC_OF_DOCTOR]: (state, action) => {
    let clinics = [];
    state.currentDoctor.clinics.forEach(clinic=>{
      if(clinic.clinicId != action.payload.clinicId){
        clinics.push(clinic);
      }
    });
    return {...state,currentDoctor:{...state.currentDoctor,clinics}};
  },

  [SAVE_CURRENT_DOCTOR]: (state, action) => {
    return {...state,currentDoctor:action.payload};
  },
};




export default function reducer(state = initState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
