import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

//import Calendar from   "../../common_uis/components/calendar.component";
import MyScheduler from '../MyScheduler';
import * as actions from '../../redux/actions';

const log = (type) => console.log.bind(console, type);


class MySchedulerWithRedux extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    };

    constructor(props){
      super(props);
      this.state={eventWillAdd: null,isOpenDialog: false};
      this.currentEventId = 4;
    }

    componentWillMount(){
        this.props.fetchDoctorsForBookingModule();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _selectingAreaCallback(selectingArea){
      console.log('_selectingAreaCallback = ',selectingArea);
      this.setState({isOpenDialog: true});
    }

    _clickingOnEventCallback(event){
      console.log('ScheduleFrame._clickingOnEventCallback = ',event);
    }

    _resizingEventCallback(event){
      console.log('ScheduleFrame._resizingEventCallback = ',event);
    }

    _movingEventCallback(event){
      console.log('ScheduleFrame._movingEventCallback = ',event);
    }

    _handleCloseDialog(){
      this.setState({isOpenDialog: false});
    }

    render() {
        let displayDate = moment('17/08/2016','DD/MM/YYYY');
        const actions = [
              <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this._submit}
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
              resources={this.props.booking.doctors}
              displayDate={displayDate}
              eventTitleField="fullName"
              columnWidth = {150}
              selectingAreaCallback={this._selectingAreaCallback.bind(this)}
              clickingOnEventCallback={this._clickingOnEventCallback.bind(this)}
              resizingEventCallback={this._resizingEventCallback.bind(this)}
              movingEventCallback={this._movingEventCallback.bind(this)}
              eventWillAdd = {this.state.eventWillAdd}
              />
            {/*Begin dialog for add new or edit bookingTypes*/}
            <Dialog
              title="Define Rosters"
              modal={false}
              actions={actions}
              open={this.state.isOpenDialog}
              onRequestClose={this._handleCloseDialog.bind(this)}
            >
                <div className="row">
                  <div className="col-md-6">
                  </div>
                </div>
            </Dialog>
            {/*End dialog for add new or edit bookingTypes*/}
          </div>
        )
      );
    }
}


function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(MySchedulerWithRedux);
