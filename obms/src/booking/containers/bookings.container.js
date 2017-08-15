import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

//import Calendar from   "../../common_uis/components/calendar.component";
import MyScheduler from '../../common_uis/MyScheduler';
//import MyScheduler from '../../common_uis/MyScheduler';
import PatientSearch from '../../patient/containers/PatientSearch.container';
import {appendEvent,appendEvents} from '../../common_uis/MyScheduler/redux/actions';
import {fetchDoctorsForBookingModule,fetchAppointments,addTimeForNewApptForBookingModule,addPatientForNewApptForBookingModule,addApptForBookingModule,} from '../../redux/actions/bookingAction';

const log = (type) => console.log.bind(console, type);

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class Bookings extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    };

    constructor(props){
      super(props);
      this.state={eventWillAdd: null,isOpenDialog: false};
      this.currentEventId = 4;
    }

    componentWillMount(){
        console.log('bookings.container.componentWillMount is running');
        this.props.fetchDoctorsForBookingModule();
    }

    componentWillReceiveProps(nextProps){
      console.log('bookings.container.componentWillReceiveProps = ',nextProps);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _onPatientSelectedCallBack(patient){
      console.log('You have selected the patient = ',patient);
      this.props.addPatientForNewApptForBookingModule(patient);
    }

    _onPatientCreatedCallBack(patient){
      console.log('You have created the patient = ',patient);
      this.props.addPatientForNewApptForBookingModule(patient,this._submitAppointment.bind(this));
    }

    _submitAppointment(){
      this.props.addApptForBookingModule().then((appointment)=>{
        console.log('===> after submit appointment = ',appointment);
        this.props.appendEvent(appointment);
      });
      this.setState({isOpenDialog: false});
    }

    _selectingAreaCallback(selectingArea){
      console.log('===========> booking.selectingAreaCallback = ',selectingArea);
      this.props.addTimeForNewApptForBookingModule(selectingArea);
      this.setState({isOpenDialog: true});
    }

    _clickingOnEventCallback(event){
      console.log('===========> booking._clickingOnEventCallback = ',event);
    }

    _resizingEventCallback(event){
      console.log('===========> booking._resizingEventCallback = ',event);
    }

    _movingEventCallback(event){
      console.log('===========> booking._movingEventCallback = ',event);
    }

    _handleCloseDialog(){
      this.setState({isOpenDialog: false});
    }

    _loadedSchedulerCallback(data){
      this.props.fetchAppointments(data).then(appts=>{
        this.props.appendEvents(appts)
      });
    }

    render() {
        let displayDate = moment();
        const actions = [
              <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._submitAppointment.bind(this)}
              />,
              <FlatButton
                label="Close"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._handleCloseDialog.bind(this)}
              />,
            ];

        return (
        (
          <div>
            <MyScheduler
              ref='myScheduler'
              resources={this.props.doctors}
              displayDate={displayDate}
              headerTitleField="title"
              headerNameField='fullName'
              eventTitleField="fullName"
              columnWidth = {150}
              selectingAreaCallback={this._selectingAreaCallback.bind(this)}
              clickingOnEventCallback={this._clickingOnEventCallback.bind(this)}
              resizingEventCallback={this._resizingEventCallback.bind(this)}
              movingEventCallback={this._movingEventCallback.bind(this)}
              eventWillAdd = {this.state.eventWillAdd}
              loadedSchedulerCallback = {this._loadedSchedulerCallback.bind(this)}
              />
            {/*Begin dialog for add new or edit bookingTypes*/}
            <Dialog
              title="Search Patients ..."
              modal={false}
              actions={actions}
              open={this.state.isOpenDialog}
              onRequestClose={this._handleCloseDialog.bind(this)}
              contentStyle={customContentStyle}
            >
              <PatientSearch onPatientSelected={this._onPatientSelectedCallBack.bind(this)} onPatientCreated={this._onPatientCreatedCallBack.bind(this)}/>
            </Dialog>
            {/*End dialog for add new or edit bookingTypes*/}
          </div>
        )
      );
    }
}

function bindAction(dispatch) {
  return {
    fetchDoctorsForBookingModule: () => dispatch(fetchDoctorsForBookingModule()),
    fetchAppointments: (data) => dispatch(fetchAppointments(data)),
    addTimeForNewApptForBookingModule: (data) => dispatch(addTimeForNewApptForBookingModule(data)),
    addPatientForNewApptForBookingModule: (data) => dispatch(addPatientForNewApptForBookingModule(data)),
    addApptForBookingModule: () => dispatch(addApptForBookingModule()),
    appendEvent: (data) => dispatch(appendEvent(data)),
    appendEvents: (data) => dispatch(appendEvents(data)),
  };
}

function mapStateToProps(state){
	return {
          doctors: state.booking.doctors
         }
}

export default connect(mapStateToProps,bindAction)(Bookings);
