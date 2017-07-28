import * as userActions from './userAction';
import * as companyActions from './companyAction';

import * as rosterActions from './rosterAction';
import * as bookingActions from './bookingAction';
import * as bookingTypesActions from './bookingTypesAction';
import * as patientSearchActions from './patientSearchAction';
import * as patientDetailActions from './patientDetailAction';

module.exports = {
  fetchBookingTypesFromServer: bookingTypesActions.fetchBookingTypesFromServer,

  login: userActions.login,
  updateLoginFields: userActions.updateLoginFields,

  loadCompaniesFromServer: companyActions.loadCompaniesFromServer,

  openClickDayModal: rosterActions.openClickDayModal,
  closeClickDayModal: rosterActions.closeClickDayModal,
  openEventDayModal: rosterActions.openEventDayModal,
  closeEventDayModal: rosterActions.closeEventDayModal,
  updateModalField: rosterActions.updateModalField,
  rosterGeneration: rosterActions.rosterGeneration,
  fetchRoster: rosterActions.fetchRoster,

  fetchBookingsForBookingModule: bookingActions.fetchBookingsForBookingModule,
  fetchDoctorsForBookingModule: bookingActions.fetchDoctorsForBookingModule,
  updateFieldForCurrentBooking: bookingActions.updateFieldForCurrentBooking,
  addPatientForNewApptForBookingModule: bookingActions.addPatientForNewApptForBookingModule,
  addTimeForNewApptForBookingModule: bookingActions.addTimeForNewApptForBookingModule,
  addApptForBookingModule: bookingActions.addApptForBookingModule,

  updateFieldForPatientSearch: patientSearchActions.updateFieldForPatientSearch,
  fetchPatientForPatientSearch: patientSearchActions.fetchPatientForPatientSearch,
  setPatientForPatientSearch: patientSearchActions.setPatientForPatientSearch,

  updateFieldForPatientDetail: patientDetailActions.updateFieldForPatientDetail,
  createPatient: patientDetailActions.createPatient
}
