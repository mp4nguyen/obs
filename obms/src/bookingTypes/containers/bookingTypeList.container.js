import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';

import * as actions from '../../redux/actions/currentBookingTypeAction';
import MyTable from '../../common_uis/components/table.component';

class BookingTypeList extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    console.log('BookingTypeList.componentDidMount');
  }

  componentWillUnmount() {

  }

  _onRowClick(rowData){
      console.log("click on company row = ",rowData);
      this.props.setCurrentBookingType(rowData);
  }

  _onClickNewBookingType(){
      this.props.setCurrentBookingType({});
  }

  render() {
    var columns = [
                    {title:'Booking type name',fieldName:'bookingTypeName'},
                    {title:'Enable',fieldName:'isenable',type:'CHECKBOX'}
                  ];

    return (
      (
        <div className="portlet light">
            <div className="portlet-title">
                <div className="caption">
                    <span className="caption-subject bold uppercase"> Booking Type List</span>
                </div>
                <div className="actions">
                    <a className="btn btn-circle btn-default">
                        <i className="fa fa-pencil"></i> Edit </a>
                    <a className="btn btn-circle btn-default" onClick={this._onClickNewBookingType.bind(this)}>
                        <i className="fa fa-plus" ></i> Add </a>
                    <a className="btn btn-circle btn-icon-only btn-default fullscreen" data-original-title="" title=""> </a>
                </div>
            </div>
            <div className="portlet-body">
              <MyTable columns={columns} data = {this.props.bookingTypes} onRowClick={this._onRowClick.bind(this)}/>
            </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return {bookingTypes:state.bookingTypes};
}

export default connect(mapStateToProps,actions)(BookingTypeList);
