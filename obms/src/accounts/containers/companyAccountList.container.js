import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';

import * as actions from '../../redux/actions/currentAccountAction';
import MyTable from '../../common_uis/components/table.component';

class CompanyAccountList extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    console.log('CompanyAccountList.componentDidMount');
  }

  componentWillUnmount() {

  }

  _onRowClick(rowData){
      console.log("click on company row = ",rowData);
      this.props.setCurrentAccount(rowData);
      this.context.router.push('/Home/Account');
  }

  _onClickNewCompany(){
      this.props.setCurrentAccount({});
      this.context.router.push('/Home/Account');
  }

  render() {
    var columns = [
                    {title:'Username',fieldName:'username'},
                    {title:'First name',fieldName:'firstName'},
                    {title:'Last name',fieldName:'lastName'},
                    {title:'Account type',fieldName:'userType'}
                  ];

    return (
      (
        <div className="portlet light">
            <div className="portlet-title">
                <div className="caption">
                    <span className="caption-subject bold uppercase"> Account List</span>
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
              <MyTable columns={columns} data = {this.props.Accounts} onRowClick={this._onRowClick.bind(this)}/>
            </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return {Accounts:state.currentCompany.Accounts};
}

export default connect(mapStateToProps,actions)(CompanyAccountList);
