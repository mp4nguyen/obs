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
