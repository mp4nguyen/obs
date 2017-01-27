import React,{Component,PropTypes} from 'react';
import ClinicCalendars from './ClinicCalendars';

var classNames = require( 'classnames' );

class ClinicItem extends Component{

  static propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    setCalendarForCurrentBooking: PropTypes.func.isRequired,
    clinic: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  };

  _onMouseEnter(){
    //this.props.onMouseEnter(this.props.index + 1,this.props.clinic);
  }

  _onMouseLeave(){
    //this.props.onMouseLeave(this.props.index + 1,this.props.clinic);
  }

	render(){

    const address = this.props.clinic.address + ' ' + this.props.clinic.ward+ ' ' + this.props.clinic.suburbDistrict+ ' ' + this.props.clinic.stateProvince;
    var calendars = this.props.clinic.currentCalendars;

/*    if(this.props.clinic.Rosters[0]){
      calendars = this.props.clinic.Rosters[0].Calendars;
    }*/
    //'services-tab': true,
    var classes = classNames(
                {

                    'bg-white-light' : !this.props.clinic.isMouseEnter,
                    'bg-success': this.props.clinic.isMouseEnter,
                    'clinic-item': true
                }
            );



		return (
			<div className={classes}
        onMouseEnter={this._onMouseEnter.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}
      >
        <article className="post clearfix mb-50 pb-30">
          <div className="entry-header">
            <h5 className="entry-title mt-0 pt-0"><a href="#">{this.props.clinic.clinicName}</a></h5>
            <ul className="list-inline font-12 mb-20 mt-10">
              <li>{address} <a href="#" className="text-theme-colored">Admin |</a></li>
              <li><span className="text-theme-colored">SEP 12,15</span></li>
            </ul>
          </div>
          <div className="entry-content">
            <p className="mb-30">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores sit nobis magni incidunt eos quasi et excepturi, animi omnis velit, deserunt ratione eum dolorem ducimus ab quidem saepe, natus earum facilis voluptate molestias quos nisi. Beatae in saepe velit nisi sapiente ullam nihil. Laboriosam repellat deleniti voluptate maiores consectetur debitis <a href="#">[...]</a></p>
            <div className="row">
              <ClinicCalendars clinic={this.props.clinic} calendars={calendars} setCalendarForCurrentBooking={this.props.setCalendarForCurrentBooking}/>
            </div>
          </div>
        </article>
      </div>
				)
	}
}

export default ClinicItem;
