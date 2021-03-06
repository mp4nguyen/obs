import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { Modal } from 'react-bootstrap';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as _ from 'underscore';

import {openClickDayModal,closeClickDayModal,openEventDayModal,closeEventDayModal,updateModalField,fetchRoster,rosterGeneration,rosterDelete} from '../../redux/actions/rosterAction';

import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Select from  "../../common_uis/components/select.component";
import Date from "../../common_uis/components/date.component";
import Time from "../../common_uis/components/time.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";
import Calendar from   "../../common_uis/components/calendar.component";

import Person from  "../../common_uis/components/person.component";
import BookingTypes from "../../common_uis/components/bookingTypes.component";
import Clinics from "../../common_uis/components/clinics.component";
import moment from 'moment';


const log = (type) => console.log.bind(console, type);
const repeatTypes = [
          {name:'DAILY'},
          {name:'MONTHLY'},
          {name:'WEEKLY'},
          {name:'2WEEKLY'},
          {name:'3WEEKLY'},
          {name:'4WEEKLY'},
          {name:'5WEEKLY'},
          {name:'6WEEKLY'},
          {name:'7WEEKLY'},
          {name:'8WEEKLY'}
        ];
class DoctorRoster extends Component {

  isOpenModal = false;

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props){
      super(props);
      this.state={isOpenDialog:false};
  }

  shouldComponentUpdate(nextProps, nextState,nextContext){
      return !_.isEqual(nextProps.roster,this.props.roster)|| !_.isEqual(nextProps.currentDoctor.rosters,this.props.currentDoctor.rosters) || !_.isEqual(nextState,this.state);
  }


  componentWillMount(){
      this.props.fetchRoster(this.props.currentDoctor.doctorId);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _dayClick(date){
    console.log('dayclick is triggered date=',date);
    this.props.openClickDayModal({
                                    rosterId: null,
                                    doctorId:this.props.currentDoctor.doctorId,
                                    start: date.format('YYYY-MM-DD HH:mm:ss'),
                                    end: date.format('YYYY-MM-DD HH:mm:ss')
                                  });
  }

  _eventClick(calEvent){
    console.log("doctorRoster.container.js._eventClick: calEvent = ",calEvent);
    var newObject = Object.assign({},calEvent);
    //newObject.start = newObject.start.format('YYYY-MM-DD HH:mm:ss');
    //newObject.end = newObject.end.format('YYYY-MM-DD HH:mm:ss');
    // if(!newObject.end){
    //   newObject.end = moment(newObject.toDate)
    // }
    console.log('eventclick is triggered calEvent=',newObject);
    this.props.openEventDayModal(newObject);
  }

  _select(start, end){
    console.log('select is triggered date=',start,' - ',end);
    this.props.openClickDayModal({
                                    rosterId: null,
                                    doctorId:this.props.currentDoctor.doctorId,
                                    start: start.format('YYYY-MM-DD HH:mm:ss'),
                                    end: end.format('YYYY-MM-DD HH:mm:ss')
                                  });
  }

  _eventDrop(calEvent){
    var newObject = Object.assign({},calEvent);
    newObject.start = newObject.start.format('YYYY-MM-DD HH:mm:ss');
    newObject.end = newObject.end.format('YYYY-MM-DD HH:mm:ss');
    this.props.openEventDayModal(newObject);
    console.log('_eventDrop is triggered calEvent=',newObject);
  }

  _eventResize(calEvent){
    var newObject = Object.assign({},calEvent);
    newObject.start = newObject.start.format('YYYY-MM-DD HH:mm:ss');
    newObject.end = newObject.end.format('YYYY-MM-DD HH:mm:ss');
    this.props.openEventDayModal(newObject);
    console.log('_eventResize is triggered calEvent=',newObject);
  }

  _handleCloseModel(){
    this.props.closeClickDayModal();
    this.props.closeEventDayModal();
    console.log('closed modal...');
  }

  _submit(){
    this.props.rosterGeneration();
  }

  _delete(){
    this.props.rosterDelete();
  }


  handleOpen = () => {
    this.setState({isOpenDialog: true});
  };

  handleClose = () => {
    this.setState({isOpenDialog: false});
  };

  render() {

    const actions = [
          <SubmitButton />,
          <FlatButton
            label="Delete"
            onTouchTap={this._delete.bind(this)}
          />,
          <FlatButton
            label="Close"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._handleCloseModel.bind(this)}
          />,
        ];

    return (
      (
        <div >
          <MyForm
            update={this.props.updateModalField}
            onSubmit={this._submit.bind(this)}
            value={this.props.roster.currentRoster}
          >
            <Dialog
              title="Define Rosters1"
              modal={false}
              actions={actions}
              open={this.props.roster.isEventDayModalOpen||this.props.roster.isClickDayModalOpen}
              onRequestClose={this._handleCloseModel.bind(this)}
            >
                <div className="row">
                  <div className="col-md-6">
                    <Select dataSource={this.props.currentDoctor.bookingTypes} valueField="bookingTypeId" primaryField="bookingTypeName" name="bookingTypeId" placeholder= "Booking Type" label= "Booking Type" />
                  </div>
                  <div className="col-md-6">
                    <Select dataSource={this.props.currentDoctor.clinics} valueField="clinicId" primaryField="clinicName" name="workingSiteId" placeholder= "Working Site" label= "Working Site" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Select dataSource={repeatTypes} valueField="name" primaryField="name" name="repeatType" placeholder= "Repeat Type" label= "Repeat Type" validate={["required"]}/>
                  </div>
                  <div className="col-md-6">
                    <Text name="timeInterval" placeholder= "Time Interval" label= "Time Interval" validate={["required","number"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Date dateType="FUTURE" name="start" label="Start Date*" validate={["required"]}/>
                  </div>
                  <div className="col-md-6">
                    <Time name="start" label="Start Time Date*" validate={["required"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Date dateType="FUTURE" name="end" label="End Date*" validate={["required"]}/>
                  </div>
                  <div className="col-md-6">
                    <Time name="end" label="Start Time Date*" validate={["required"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Time name="breakTime" label="Break Time"/>
                  </div>
                  <div className="col-md-6">
                    <Text name="breakDuration" placeholder= "Break Duration" label= "Break Duration" validate={["number"]}/>
                  </div>
                </div>
            </Dialog>
          </MyForm>


          <Calendar
            defaultView = "month"
            selectable={true}
            events={this.props.currentDoctor.rosters}
            dayClick={this._dayClick.bind(this)}
            eventClick={this._eventClick.bind(this)}
            select={this._select.bind(this)}
            eventDrop={this._eventDrop.bind(this)}
            eventResize={this._eventResize.bind(this)}
            />

            <Modal onHide={this._handleCloseModel.bind(this)}>
                <MyForm
                  update={this.props.updateModalField}
                  onSubmit={this._submit.bind(this)}
                  value={this.props.roster.currentRoster}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Define Roster2</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="row">
                      <div className="col-md-6">
                        <Select dataSource={this.props.currentDoctor.BookingTypes} valueField="bookingTypeId" primaryField="bookingTypeName" name="bookingTypeId" placeholder= "Booking Type" label= "Booking Type" />
                      </div>
                      <div className="col-md-6">
                        <Select dataSource={this.props.currentDoctor.Clinics} valueField="clinicId" primaryField="clinicName" name="workingSiteId" placeholder= "Working Site" label= "Working Site" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Select dataSource={repeatTypes} valueField="name" primaryField="name" name="repeatType" placeholder= "Repeat Type" label= "Repeat Type" validate={["required"]}/>
                      </div>
                      <div className="col-md-6">
                        <Text name="timeInterval" placeholder= "Time Interval" label= "Time Interval" validate={["required","number"]}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Date dateType="FUTURE" name="start" label="Start Date*" validate={["required"]}/>
                      </div>
                      <div className="col-md-6">
                        <Time name="start" label="Start Time Date*" validate={["required"]}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Date dateType="FUTURE" name="end" label="End Date*" validate={["required"]}/>
                      </div>
                      <div className="col-md-6">
                        <Time name="end" label="Start Time Date*" validate={["required"]}/>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <SubmitButton className="pull-right"/>
                    <RaisedButton label="Delete"/>
                  </Modal.Footer>
                </MyForm>
            </Modal>
        </div>
      )
    );
  }
}


function bindAction(dispatch) {
  return {

    fetchRoster: ()=> dispatch(fetchRoster()),
    openClickDayModal: (data)=> dispatch(openClickDayModal(data)),
    closeClickDayModal: ()=> dispatch(closeClickDayModal()),
    openEventDayModal: (data)=> dispatch(openEventDayModal(data)),
    closeEventDayModal: ()=> dispatch(closeEventDayModal()),
    updateModalField: (data)=> dispatch(updateModalField(data)),
    rosterGeneration: ()=> dispatch(rosterGeneration()),
    rosterDelete: ()=> dispatch(rosterDelete()),

  };
}

function mapStateToProps(state){
	return {
          roster:state.roster,
          currentDoctor:state.currentCompany.currentDoctor,
        };
}

export default connect(mapStateToProps,bindAction)(DoctorRoster);
