import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/bookingTypesAction';
import BookingType from '../components/bookingType.component';

class BookingTypes extends Component {

  componentDidMount() {
    this.props.fetchBookingTypesFromServer();
    console.log('companyList.componentDidMount');
  }

  componentWillUnmount() {

  }

  _onBTClick(bt){
      console.log("click bt = ",bt);
      this.props.setClickedBookingType(bt);
  }

  render() {

    console.log('this.props.bookingType = ',this.props.bookingType);
    if(!this.props.bookingType){
      return (<div/>);
    }

    return (
      (
        <div style={{textAlign:"center"}} className="col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2">
            <div className="main-icon">
                {this.props.bookingType.bookingTypes.map((bt,index)=>{
                    return(
                      <BookingType key={index} bookingType={bt} clickCB={this._onBTClick.bind(this)}/>
                    )
                })}
            </div>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return {bookingType:state.bookingType};
}

export default connect(mapStateToProps,actions)(BookingTypes);
