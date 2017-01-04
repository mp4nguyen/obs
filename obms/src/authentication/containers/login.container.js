import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as actions from '../../redux/actions';



class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {
    document.body.classList.add('login');
  }

  componentWillUnmount() {
    document.body.classList.remove('login');
  }

  _onchangeUsername(e){
    console.log(e);
    this.props.updateLoginFields({username:e.target.value});
  }

  _onchangePassword(e){
    this.props.updateLoginFields({password:e.target.value});
  }

  _buttonLogin(e){
    e.preventDefault();
    console.log('clicked login button');
    this.props.login(this.props.user);
  }

  renderAlert(){
      if(this.props.user.err){
        return(
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.user.err}
          </div>
        )
      }
  }

  render() {
    return (
      (
        <div>
              <div className="logo">
                  <a>
                      <img src="../assets/pages/img/logo-big-white.png" style={{height: '17px'}} alt="" /> </a>
              </div>
              <div className="content">
                  <form onSubmit={this._buttonLogin.bind(this)}>
                      <div className="form-title">
                          <span className="form-title">Welcome.</span>
                          <span className="form-subtitle">Please login.</span>
                      </div>
                      <div className="alert alert-danger display-hide">
                          <button className="close" data-close="alert"></button>
                          <span> Enter any username and password. </span>
                      </div>
                      <div className="form-group">
                          <label className="control-label visible-ie8 visible-ie9">Username</label>
                          <input className="form-control form-control-solid placeholder-no-fix" type="text" autoComplete="off" placeholder="Username" name="username" onChange={this._onchangeUsername.bind(this)} value={this.props.user.username}/> </div>
                      <div className="form-group">
                          <label className="control-label visible-ie8 visible-ie9">Password</label>
                          <input className="form-control form-control-solid placeholder-no-fix" type="password" autoComplete="off" placeholder="Password" name="password" onChange={this._onchangePassword.bind(this)} value={this.props.user.password} /> </div>
                      <div>
                          <a className="btn red btn-block uppercase" onClick={this._buttonLogin.bind(this)}> Login </a>
                          {this.renderAlert()}
                      </div>
                      <div className="form-actions">
                          <div className="pull-left">
                              <label className="rememberme check">
                                  <input type="checkbox" name="remember" value="1" />Remember me </label>
                          </div>
                          <div className="pull-right forget-password-block">
                              <a href="javascript:;" id="forget-password" className="forget-password">Forgot Password?</a>
                          </div>
                      </div>
                      <div className="login-options">
                          <h4 className="pull-left">Or login with</h4>
                          <ul className="social-icons pull-right">
                              <li>
                                  <a className="social-icon-color facebook" data-original-title="facebook" href="javascript:;"></a>
                              </li>
                              <li>
                                  <a className="social-icon-color twitter" data-original-title="Twitter" href="javascript:;"></a>
                              </li>
                              <li>
                                  <a className="social-icon-color googleplus" data-original-title="Goole Plus" href="javascript:;"></a>
                              </li>
                              <li>
                                  <a className="social-icon-color linkedin" data-original-title="Linkedin" href="javascript:;"></a>
                              </li>
                          </ul>
                      </div>
                      <div className="create-account">
                          <p>
                              <a href="javascript:;" className="btn-primary btn" id="register-btn">Create an account</a>
                          </p>
                      </div>
                  </form>
              </div>
              <div className="copyright hide"> 2014 © Metronic. Admin Dashboard Template. </div>
          </div>
      )
    );
  }
}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps,actions)(Login);
