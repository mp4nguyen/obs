import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/actions';

import SelectPractitioner from '../Components/SelectPractitioner';


class SearchBooking extends Component{

	static contextTypes = {
		router: React.PropTypes.object
	};

	constructor(props,context){
		super(props,context);

	}



	handleChange(event){
		this.setState({
			inputText: event.target.value
		});
	}

	handleSubmit(event){
		event.preventDefault();
		//this.props.loadClinicsFromServer(this.props.currentPractitioner.bookingTypeId);
		this.props.initialTime(this.props.currentPractitioner.bookingTypeId);
		this.context.router.push('/Clinics');
	}

	render(){

		var style3 = {
			display: 'inline-block',
		    position:'fixed',
		    top: '200',
		    left: '0',
		    right: '0',
		    bottom: '0',
		    width:'800px',
		    height:'300px',
		    margin: 'auto',
		    border: 'rgba(0, 0, 0, 0)',
		    'backgroundColor': 'rgba(200, 200, 200, 0.8)'
		};

		return (
	<section id="home" className=""
    	style={{'backgroundImage':'url(template/images/bg/bg3.jpg)', width:'100%', height: '700px'}}
    	>
		<div className="display-table">
			<div className="display-table-cell">
			  <div className="container">
			    <div className="row">
			      <div className="col-md-8 col-md-offset-4">
			      	<div className="bg-theme-colored p-25">
			          <h3 className="m-0 mb-30"><span className="text-white">Make an Appointment</span> </h3>
			          <form id="home_appointment_form" name="home_appointment_form" onSubmit={this.handleSubmit.bind(this)}>
			          	<SelectPractitioner practitioners={this.props.practitioners} selectPractitioner={this.props.selectPractitioner}/>
			              	<div className="input-group">
				                <input id="form_name" name="form_name" className="form-control" type="text" required="" placeholder="Enter Name" aria-required="true"/>
				                <span className="input-group-btn">
				                    <button type="submit" className="btn btn-colored form-control  btn-theme-colored m-0"><i className="fa fa-search text-white"></i></button>
				                </span>
			              	</div>
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
    </section>
			)
	}
}

function mapStateToProps(state){
	return state;
}



export default connect(mapStateToProps,actions)(SearchBooking);
