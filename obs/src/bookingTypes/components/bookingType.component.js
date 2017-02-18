import React, { Component,PropTypes } from 'react';


class BookingType extends Component {

  static propTypes =  {
    bookingType: PropTypes.object,    
    clickCB: PropTypes.func
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  onClick(){
    if(this.props.clickCB){
      //console.log('bookingType.component.onClick = ',this.props.bookingType);
      this.props.clickCB(this.props.bookingType);
    }
  }

  render() {

    //console.log('bookingType.component bt = ',this.props.bookingType);
    var btnClass = this.props.bookingType.isActive ? "btn btn-success" : "btn";

    return (
      (
        <div className="block-icon">
            <button className={btnClass} onClick={this.onClick.bind(this)} >
                <img src={this.props.bookingType.icon}/>
                <p>{this.props.bookingType.bookingTypeName}</p>
            </button>
        </div>
      )
    );
  }
}


export default BookingType;
