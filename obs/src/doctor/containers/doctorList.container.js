import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';

import * as actions from '../../redux/actions';
import MyTable from '../../common_uis/components/table.component';

class DoctorList extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _onRowClick(rowData){
      this.props.setCurrentDoctor(rowData);
  }

  _onClickNewCompany(){
      this.props.setCurrentDoctor({Person:{}});
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
        <div className="portlet box green portlet-datatable ng-scope">
            <div className="portlet-title">
                <div className="caption bold uppercase">
                    <h4>Doctor list</h4>
                    <span className="caption-subject ng-binding"></span>
                </div>
                <div className="actions">
                    <a className="btn red-thunderbird btn-sm" onClick={this._onClickNewCompany.bind(this)}>
                        New Doctor
                    </a>
                </div>
            </div>
            <div className="portlet-body">
                <MyTable columns={columns} data = {this.props.currentCompany.Doctors} subModel="Person" onRowClick={this._onRowClick.bind(this)}/>
            </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(DoctorList);
