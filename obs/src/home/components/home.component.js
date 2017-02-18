import React, { Component } from 'react';
import {Link} from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import BookingTypes from '../../bookingTypes/containers/bookingTypes.container';

const styles = {
  customWidth: {
    width: 150,
  },
};


export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: 1
    }
  }

  componentDidMount() {
    // console.log('home.componentDidMount');
    // document.body.classList.add('page-boxed');
    // document.body.classList.add('page-container-bg-solid');
  }

  componentWillUnmount() {
    // document.body.classList.remove('page-boxed');
    // document.body.classList.remove('page-container-bg-solid');
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      (
          <div className="main">
              <div className="homepage">
                  <div className="container-fluid header">
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-9 col-md-8 col-sm-8 col-xs-6">
                                  <div className="logo"><a href="#"><img src="assets/images/icon/redimed.svg"/></a></div>
                              </div>
                              <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                                  <div className="dropdown">
                                      <button className="btn btn-success btn-lg" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          Duc Vu
                                      </button>
                                      <ul className="dropdown-menu" aria-labelledby="dLabel">
                                          <li><a href="my-profile.html"><i className="fa fa-user-o"></i> My Profile</a></li>
                                          <li><a href="mybooking.html"><i className="fa fa-calendar"></i> My Booking</a></li>
                                          <li><a href="my-organization.html"><i className="fa fa-users"></i> My Organzination</a></li>
                                          <li><a href="setting.html"><i className="fa fa-cogs"></i> Setting</a></li>
                                          <li><a href="#"><i className="fa fa-list-alt"></i> Invoices</a></li>
                                          <hr className="hr-custom"/>
                                          <li><a href="#"><i className="fa fa-power-off"></i> Log Out</a></li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/*<!--/header-->*/}

                  <div className="container center">
                      <div className="row">
                          <div className="col-lg-12 col-md-12">
                              <h1 className="text-center title-home">Book a doctor, dentist, physio and more</h1>
                          </div>
                      </div>
                      <div className="row">
                          <BookingTypes/>
                      </div>
                      <div className="row">
                          <div className="col-lg-8 col-lg-offset-2 col-md-offset-2 col-md-8 col-sm-12 col-xs-12">
                              <div className="box-search">
                                  <h2 className="text-center">Looking for something else?</h2>
                                  <div className="form-group">
                                      <div className="input-group form-group m_20_0">
                                          <input type="text" className="form-control input-lg input-lg-custom " placeholder="Suburd, Practitioner, Practice and Procedure"/>
                                          <span className="input-group-btn">
                                              <button className="btn btn-lg btn-lg-custom btn-primary" type="button">Search</button>
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="container-fluid footer hidden-xs">
                      <div className="container">
                          <div className="row">
                              <div className="col-lg-3 col-md-3 col-sm-3">
                                  <p><a href="#"><img src="assets/images/icon/redimed-bw.svg" style={{border:"0",width:120,height:30}}  /></a></p>
                                  <h4>Contact Us</h4>
                                  <ul>
                                      <li>Joondalup: <b>08 9300 3835</b></li>
                                      <li>Belmont: <b>08 9230 0900</b></li>
                                      <li>Rockingham: <b>08 9527 1585</b></li>
                                      <li><a href="#"><h4>Mobile App</h4></a></li>
                                  </ul>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 column-2">
                                  <h4>Commercial</h4>
                                  <ul>
                                      <li><a href="#">Health screening and Wellness</a></li>
                                      <li><a href="#">Injury Management</a></li>
                                      <li><a href="#">Medico Legal</a></li>
                                      <li><a href="#">Telehealth Services</a></li>
                                  </ul>
                              </div>
                              <div className="col-lg-3 col-md-3 col-sm-3 column-3">
                                  <h4>Urgent Injury Care</h4>
                                  <ul>
                                      <li><a href="#">General Medical Services</a></li>
                                      <li><a href="#">Allied Health Services</a></li>
                                      <li><a href="#">Surgical Specialists</a></li>
                                      <li>24/7 Emergency</li>
                                  </ul>
                              </div>
                              <div style={{textAlign:"center"}} className="col-lg-3 col-md-3 col-sm-3">
                                  <p><a href="#"><img src="assets/images/homepage/logo-iso9001-l.png" style={{border:"0",width:60}}  /></a></p>
                                  <p className="copyright"><span>© REDIMED 2015</span> - Website Design by Meditek</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              {/*<!-- Modal Sign In -->*/}
              <div id="SignIn-modal"  className="modal"  role="dialog">
                  <div className="modal-dialog modal-sm" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h2 className="modal-title text-center">Sign In to Redimed</h2>
                          </div>
                          <div className="modal-body">
                              <div className="form-group">
                                  <input className="form-control" placeholder="Username"/>
                              </div>
                              <div className="form-group">
                                  <input className="form-control" placeholder="Username"/>
                              </div>
                              <p className="text-right"><a href="#">Forgot your password ?</a></p>
                              <div className="form-group">
                                  <button className="btn btn-group-justified btn-primary btn-lg">Sign in</button>
                              </div>
                              <hr/>
                              <p>Don't have an account ? <a href="#">Join Now !</a></p>
                          </div>
                      </div>
                  </div>
              </div>

              <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#ForgotPassword-modal">
                  Forgot your password ?
              </button>
              <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#SignIn-modal">
                  Sign In
              </button>
              <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#SignUp-modal">
                  Sign Up
              </button>
              {/*<!-- Modal Forgot Password -->*/}

              <div id="ForgotPassword-modal"  className="modal" role="dialog">
                  <div className="modal-dialog modal-sm" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h2 className="modal-title text-center">Forgot your password ?</h2>
                          </div>
                          <div className="modal-body">
                              <p className="m-20-0">Enter your email address below and we’ll send you instructions to reset your password</p>
                              <div className="form-group">
                                  <input className="form-control" placeholder="Your Email"/>
                              </div>
                              <div className="form-group">
                                  <button className="btn btn-group-justified btn-primary btn-lg">Send Reset Link</button>
                              </div>
                              <hr/>
                              <p className="text-center"><a href="#">Back to Sign in</a></p>
                          </div>
                      </div>
                  </div>
              </div>
              {/*<!-- Modal Sign Up -->*/}

              <div id="SignUp-modal"  className="modal"  role="dialog">
                  <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h1 className="modal-title text-center">Create an account</h1>
                          </div>
                          <div className="modal-body">
                              <div className="row">
                                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                      <div className="title-signup">
                                          <h3 className="text-uppercase nopadding nomargin">Individual</h3>
                                      </div>
                                      <div className="form-group">
                                          <input className="form-control" placeholder="First name"/>
                                      </div>
                                      <div className="form-group">
                                          <input type="text" className="form-control" placeholder="Last name"/>
                                      </div>
                                      <div className="form-group">
                                          <input type="email" className="form-control" placeholder="Your Email"/>
                                      </div>
                                      <div className="form-group">
                                          <input type="password" className="form-control" placeholder="Password"/>
                                      </div>
                                      <div className="form-group">
                                          <button className="btn btn-group-justified btn-success btn-lg">Create an account</button>
                                      </div>
                                  </div>

                                  <div className="col-lg-1 col-md-1 hidden-sm hidden-xs">
                                      <div className="ver-line text-center">
                                          <div className="ver-text">
                                              <span>Or</span>
                                          </div>
                                      </div>
                                  </div>

                                  <hr className="hidden-lg hidden-md"/>

                                  <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                      <div className="title-signup">
                                          <h3 className="text-uppercase nopadding nomargin">Organization</h3>
                                      </div>
                                      <div className="row">
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                              <div className="form-group">
                                                  <input className="form-control" placeholder="First name"/>
                                              </div>
                                              <div className="form-group">
                                                  <input className="form-control" placeholder="Last name"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="email" className="form-control" placeholder="Your Email"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="password" className="form-control" placeholder="Password"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="text" className="form-control" placeholder="Organzination Name"/>
                                              </div>
                                          </div>
                                          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                              <div className="form-group">
                                                  <input type="text" className="form-control" placeholder="Address"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="text" className="form-control" placeholder="Surburb"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="number" className="form-control" placeholder="Post code"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="number" className="form-control" placeholder="State"/>
                                              </div>
                                              <div className="form-group">
                                                  <input type="number" className="form-control" placeholder="Contact Number"/>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="form-group">
                                          <button className="btn btn-group-justified btn-success btn-lg">Create an account</button>
                                      </div>
                                  </div>
                              </div>

                              <div className="clearfix"></div>

                              <hr/>

                              <p className="text-center">Have an account ? <a href="#">Sign In !</a></p>


                          </div>
                          <div className="modal-footer" style={{textAlign:"center"}}>
                              <p className="small text-center">By Signin up with Redimed, I agree to the <a href="#">Term of Use.</a></p>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      )
    );
  }
}
