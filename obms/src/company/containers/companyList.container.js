import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';

import * as actions from '../../redux/actions';
import MyTable from '../../common_uis/components/table.component';

class CompanyList extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    this.props.loadCompaniesFromServer();
    console.log('companyList.componentDidMount');
  }

  componentWillUnmount() {

  }

  _onRowClick(rowData){
      console.log("click on company row = ",rowData);
      this.props.setCurrentCompany(rowData);
      this.context.router.push('/Home/CompanyDetail');
  }

  _onClickNewCompany(){
      this.props.setCurrentCompany({});
      this.context.router.push('/Home/CompanyDetail');
  }

  render() {
    var columns = [
                    {title:'Company Name',fieldName:'companyName'},
                    {title:'Address',fieldName:'address'},
                    {title:'Ward',fieldName:'ward'},
                    {title:'District',fieldName:'suburbDistrict'},
                    {title:'City/Province',fieldName:'stateProvince'}
                  ];

    return (
      (
        <div className="portlet box green portlet-datatable ng-scope">
            <div className="portlet-title">
                <div className="caption bold uppercase">
                    <h4>Company list</h4>
                    <span className="caption-subject ng-binding"></span>
                </div>
                <div className="actions">
                    <a className="btn red-thunderbird btn-sm" onClick={this._onClickNewCompany.bind(this)}>
                        New Company
                    </a>
                    <button
                      onClick={() => toastr.success('The title', 'The message')}
                      type="button">Toastr Success
                    </button>
                </div>
            </div>
            <div className="portlet-body">
                <MyTable columns={columns} data = {this.props.companies} onRowClick={this._onRowClick.bind(this)}/>
            </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(CompanyList);
