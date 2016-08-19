import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';

//import Calendar from   "../../common_uis/components/calendar.component";
import PatientSearch from '../../patient/containers/PatientSearch.container';
import * as actions from '../../redux/actions';

const log = (type) => console.log.bind(console, type);

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class PatientSearchExample extends Component {

    render() {

        return (
        (
          <Dialog
            title="Search Patients"
            modal={false}
            open={true}
            contentStyle={customContentStyle}
            autoScrollBodyContent={true}
          >
            <PatientSearch></PatientSearch>
          </Dialog>
        )
      );
    }
}


function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(PatientSearchExample);
