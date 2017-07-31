import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';

import {fetchDoctorsFromServer,setCurrentDoctor,newDoctor} from '../../redux/actions/currentDoctorAction';
import MyTable from '../../common_uis/components/table.component';

class DoctorList extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    this.props.fetchDoctorsFromServer()
  }

  componentWillUnmount() {

  }

  _onRowClick(rowData){
      this.props.setCurrentDoctor(rowData);
  }

  _onClickNewCompany(){
      this.props.newDoctor();
  }

  render() {
    var columns = [
                    {title:'Title',fieldName:'title'},
                    {title:'First Name',fieldName:'firstName'},
                    {title:'Last Name',fieldName:'lastName'},
                    {title:'Gender',fieldName:'gender'},
                    {title:'Mobile',fieldName:'mobile'},
                    {title:'Email',fieldName:'email'}
                  ];

    return (
      (
        <div className="portlet light">
            <div className="portlet-title">
                <div className="caption">
                    <span className="caption-subject bold uppercase"> Doctor List</span>
                </div>
                <div className="actions">
                    <a className="btn btn-circle btn-default">
                        <i className="fa fa-pencil"></i> Edit </a>
                    <a className="btn btn-circle btn-default" onClick={this._onClickNewCompany.bind(this)}>
                        <i className="fa fa-plus" ></i> Add </a>
                    <a className="btn btn-circle btn-icon-only btn-default fullscreen" data-original-title="" title=""> </a>
                </div>
            </div>
            <div className="portlet-body">
              <MyTable columns={columns} data = {this.props.doctors} onRowClick={this._onRowClick.bind(this)}/>
            </div>
        </div>
      )
    );
  }
}

function bindAction(dispatch) {
  return {

    newDoctor: () => dispatch(newDoctor()),
    fetchDoctorsFromServer: () => dispatch(fetchDoctorsFromServer()),
    setCurrentDoctor: (data) => dispatch(setCurrentDoctor(data)),

  };
}

function mapStateToProps(state){
	return {doctors:state.currentCompany.doctors};
}

export default connect(mapStateToProps,bindAction)(DoctorList);
