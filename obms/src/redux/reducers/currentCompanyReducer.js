import {
        SET_CURRENT_COMPANY,
        UPDATE_CURRENT_COMPANY_FIELDS,
        SAVE_CURRENT_COMPANY,
        ADD_DOCTOR_TO_CURRENT_COMPANY,
        UPDATE_DOCTOR_TO_CURRENT_COMPANY,
        ADD_CLINIC_TO_CURRENT_COMPANY,
        UPDATE_CLINIC_TO_CURRENT_COMPANY
      } from '../actions/types';

let currentCompanyReducer = function(currentCompany={},action){
  //console.log('currentCompanyReducer = ',action);
  switch(action.type){
    case SET_CURRENT_COMPANY:
        return action.currentCompany;
    case UPDATE_CURRENT_COMPANY_FIELDS:
        return Object.assign({},currentCompany,action.currentCompany);
    case SAVE_CURRENT_COMPANY:
        return currentCompany;
    case ADD_DOCTOR_TO_CURRENT_COMPANY:
        return {...currentCompany,Doctors:[...currentCompany.Doctors,action.doctor]};
    case UPDATE_DOCTOR_TO_CURRENT_COMPANY:
        var doctors = [...currentCompany.Doctors];
        var doctorIndex;
        // console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctors = ',doctors);
        // console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctor = ',action.doctor);
        var foundDoctor = doctors.forEach((doctor,index)=>{
          if(doctor.doctorId == action.doctor.doctorId){
            doctors[index] = action.doctor;
          }
        });
        // console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctors = ',doctors);
        return {...currentCompany,Doctors:doctors};
    case ADD_CLINIC_TO_CURRENT_COMPANY:
        return {...currentCompany,Clinics:[...currentCompany.Clinics,action.clinic]};
    case UPDATE_CLINIC_TO_CURRENT_COMPANY:
        var clinics = [...currentCompany.Clinics];
        //console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctors = ',doctors);
        //console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctor = ',action.doctor);
        var foundClinic = clinics.forEach((clinic,index)=>{
          if(clinic.clinicId == action.clinic.clinicId){
            clinics[index] = action.clinic;
          }
        });
        console.log('UPDATE_DOCTOR_TO_CURRENT_COMPANY.doctors = ',doctors);
        return {...currentCompany,Clinics:clinics};
    default:
        return currentCompany;
  }
}

export default currentCompanyReducer;
