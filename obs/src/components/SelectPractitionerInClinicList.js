import React,{Component} from 'react';

var classNames = require( 'classnames' );

class SelectPractitionerInClinicList extends Component{

	constructor(props,context){
		super(props,context);
	}


	handleClick(event){
		console.log('event =',event);
		this.props.selectPractitioner(event);
	}


	render(){

		if(!this.props.practitioners){
			return <div>No data</div>;
		}
		return (
                <div className="tags">
						        {
							        this.props.practitioners.map(function(item, i) {
							          	var boundClick = this.handleClick.bind(this, item);
													var classes = classNames(
																			    {
																			        'btn': true,
																			        'btn-success' : item.isSelected,
																			        'btn-secondary': !item.isSelected,
																			        'btn-flat': true,
																			        'form-control': true
																			    }
																			);

										return (
													<button onClick={boundClick} key={i} className={classes}>
														{item.bookingTypeName}
													</button>
												);
							        },this)
						    	}
                </div>
			)
	}
}

export default SelectPractitionerInClinicList;
