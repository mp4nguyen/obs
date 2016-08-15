import * as userActions from './userAction';
import * as companyActions from './companyAction';
import * as currentCompanyActions from './currentCompanyAction';
import * as currentClinicActions from './currentClinicAction';
import * as currentDoctorActions from './currentDoctorAction';
import * as rosterActions from './rosterAction';
import * as bookingActions from './bookingAction';
import * as bookingTypesActions from './bookingTypesAction';

module.exports = {
  fetchBookingTypesFromServer: bookingTypesActions.fetchBookingTypesFromServer,

  login: userActions.login,
  updateLoginFields: userActions.updateLoginFields,

  loadCompaniesFromServer: companyActions.loadCompaniesFromServer,

  setCurrentCompany: currentCompanyActions.setCurrentCompany,
  updateCurrentCompanyFields: currentCompanyActions.updateCurrentCompanyFields,
  saveCurrentCompany: currentCompanyActions.saveCurrentCompany,

  setCurrentClinic: currentClinicActions.setCurrentClinic,
  updateCurrentClinicFields: currentClinicActions.updateCurrentClinicFields,

  setCurrentDoctor: currentDoctorActions.setCurrentDoctor,
  updateCurrentDoctorFields: currentDoctorActions.updateCurrentDoctorFields,
  saveCurrentDoctor: currentDoctorActions.saveCurrentDoctor,
  addNewDoctorBookingType: currentDoctorActions.addNewDoctorBookingType,
  removeDoctorBookingType: currentDoctorActions.removeDoctorBookingType,
  addDoctorClinic: currentDoctorActions.addDoctorClinic,
  removeDoctorClinic: currentDoctorActions.removeDoctorClinic,
  uploadPhotoDoctor: currentDoctorActions.uploadPhotoDoctor,

  openClickDayModal: rosterActions.openClickDayModal,
  closeClickDayModal: rosterActions.closeClickDayModal,
  openEventDayModal: rosterActions.openEventDayModal,
  closeEventDayModal: rosterActions.closeEventDayModal,
  updateModalField: rosterActions.updateModalField,
  rosterGeneration: rosterActions.rosterGeneration,
  fetchRoster: rosterActions.fetchRoster,

  fetchBookingsForBookingModule: bookingActions.fetchBookingsForBookingModule,
  fetchDoctorsForBookingModule: bookingActions.fetchDoctorsForBookingModule
}
