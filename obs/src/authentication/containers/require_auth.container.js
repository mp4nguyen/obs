import React,{Component} from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent){
  class Authentication extends Component{
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount(){
      if(!this.props.user.succ){
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps){
      if(!nextProps.user.succ){
        this.context.router.push('/');
      }
    }

    render(){
      console.log('require_auth.render:  this.props = ',this.props);

      if(this.props.user && this.props.user.succ){
        return <ComposedComponent {...this.props} />
      }else{
        return <div/>
      }
    }

  }

  function mapStateToProps(state){
    return state;
  }

  return connect(mapStateToProps)(Authentication)

}
