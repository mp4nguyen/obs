import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';

import MyTable from './table.component';
import Text from './text.component';
import * as validators from './validators';

export default React.createClass({

  displayName: 'Clinics',

  propTypes: {
    data: PropTypes.array.isRequired
  },

  _onRowClick(rowData){
    console.log('');
      //this.props.setCurrentDoctor(rowData);
  },

  _onClickNewCompany(){
    console.log('');
      //this.props.setCurrentDoctor({Person:{}});
  },

  render() {
    var columns = [
                    {title:'Clinic Name',fieldName:'clinicName'},
                    {title:'Address',fieldName:'address'},
                    {title:'Ward',fieldName:'ward'},
                    {title:'District',fieldName:'suburbDistrict'},
                    {title:'City/Province',fieldName:'stateProvince'}
                  ];

    return (
      <div className="portlet box green portlet-datatable ng-scope">
          <div className="portlet-title">
              <div className="caption bold uppercase">
                  <h4>Clinics</h4>
                  <span className="caption-subject ng-binding"></span>
              </div>
              <div className="actions">
                  <a className="btn red-thunderbird btn-sm" onClick={this._onClickNewCompany}>
                      New Doctor
                  </a>
              </div>
          </div>
          <div className="portlet-body">
              <MyTable columns={columns} data = {this.props.data} onRowClick={this._onRowClick}/>
          </div>
      </div>
    );
  }
});
