import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toastr} from 'react-redux-toastr';

import {setCurrentBookingType} from '../../redux/actions/bookingTypesAction';
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
                    {title:'Enable',fieldName:'isEnable',type:'CHECKBOX'},
                    {title:'Icon',fieldName:'icon',type:'IMAGE'},
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

function bindAction(dispatch) {
  return {
    setCurrentBookingType: (rowData) => dispatch(setCurrentBookingType(rowData)),
  };
}

function mapStateToProps(state){
	return {bookingTypes:state.bookingType.bookingTypes};
}

export default connect(mapStateToProps,bindAction)(BookingTypeList);
