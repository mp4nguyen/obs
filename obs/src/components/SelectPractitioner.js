import React,{Component} from 'react';

var classNames = require( 'classnames' ); 

class SelectPractitioner extends Component{

	constructor(props,context){
		super(props,context);		
	}


	handleClick(event){
		console.log('event =',event);		
		this.props.selectPractitioner(event);
	}


	render(){
		
		return (
                <div className="form-group row select-practitioner">
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
							<div key={i} className="col-sm-2">
								<button type="button" className={classes} onClick={boundClick}>
									{item.bookingTypeName}
								</button>		                  		                	
							</div>			            
							);
				        },this)
			    	}                
            			                			                	
                </div>			
			)
	}
}

export default SelectPractitioner;




