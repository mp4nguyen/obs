import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';

import ClinicList from "../../clinic/containers/clinicList.container";
import CompanyDetail from "../containers/companyDetail.container";


const log = (type) => console.log.bind(console, type);

class Company extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit company detail');
    this.props.saveCurrentCompany(this.props.currentCompany);
  }

  render() {

    return (
      (
        <div>
          <Tabs>
            <Tab label="Company Information" >
              <CompanyDetail/>
            </Tab>
            <Tab label="Clinics" >
              <ClinicList/>
            </Tab>
            <Tab label="Accounts" >
              <ClinicList/>
            </Tab>
         </Tabs>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default Company;
