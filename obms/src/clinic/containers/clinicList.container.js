import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchClinicsFromServer} from '../../redux/actions/currentClinicAction';
//import MyTable from '../../common_uis/components/table.component';
import MyTable from '../../common_uis/components/table.component';


class ClinicList extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    isPortlet: React.PropTypes.bool
  };

  componentDidMount() {
    this.props.fetchClinicsFromServer();
  }

  componentWillUnmount() {

  }

  _onRowClick(rowData){
      console.log("click on company row = ",rowData);
      this.props.setCurrentClinic(rowData);
      this.context.router.push('/Home/ClinicDetail');
  }

  _onClickNewClinic(){
      console.log('ClinicList.container._onClickNewClinic is running');
      this.props.setCurrentClinic({});
      this.context.router.push('/Home/ClinicDetail');
  }

  render() {
    var columns = [
                    {title:'Clinic Name',fieldName:'clinicName'},
                    {title:'Address',fieldName:'address'},
                    {title:'Ward',fieldName:'ward'},
                    {title:'District',fieldName:'suburbDistrict'},
                    {title:'City/Province',fieldName:'stateProvince'}
                  ];


      return (
        <div className="portlet light">
            <div className="portlet-title">
                <div className="caption">
                    <span className="caption-subject bold uppercase"> Clinic List</span>
                </div>
                <div className="actions">
                    <a className="btn btn-circle btn-default">
                        <i className="fa fa-pencil"></i> Edit </a>
                    <a className="btn btn-circle btn-default" onClick={this._onClickNewClinic.bind(this)}>
                        <i className="fa fa-plus" ></i> Add </a>
                    <a className="btn btn-circle btn-icon-only btn-default fullscreen" data-original-title="" title=""> </a>
                </div>
            </div>
            <div className="portlet-body">
              <MyTable columns={columns} data = {this.props.clinics} onRowClick={this._onRowClick.bind(this)}/>
            </div>
        </div>
      );

  }
}


function bindAction(dispatch) {
  return {
    fetchClinicsFromServer: () => dispatch(fetchClinicsFromServer()),
  };
}

function mapStateToProps(state){
	return {clinics: state.currentCompany.clinics};
}

export default connect(mapStateToProps,bindAction)(ClinicList);
