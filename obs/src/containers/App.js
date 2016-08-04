import React,{Component} from 'react';
import {Link} from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Affix ,AutoAffix} from 'react-overlays';
import * as actions from '../redux/actions';

class App extends Component {

  	constructor(props) {
		  super(props)
    }

    componentWillMount(){
    	this.props.loadPractitionerFromServer();
      this.props.logInAsGuest();
    }


	render(){

		var style3 = {
			display: 'inline-block',
		    position:'fixed',
		    top: '0',
		    left: '0',
		    right: '0',
		    bottom: '0',
		    width:'60em',
		    height:'30em',
		    margin: 'auto',
		    border: 'rgba(0, 0, 0, 0)',
		    'backgroundColor': 'rgba(255, 255, 255, 0.8)'
		};

		return (

        <div id="wrapper">
          <header id="header" className="header">
            <div className="header-top bg-theme-colored sm-text-center">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="widget no-border m-0">
                      <ul className="list-inline sm-text-center mt-5">
                        <li className="m-0 pl-10 pr-10"> <i className="fa fa-phone text-white"></i> <a className="text-white" href="#">123-456-789</a> </li>
                        <li className="text-white m-0 pl-10 pr-10"> <i className="fa fa-clock-o text-white"></i> Mon-Fri 8:00 to 2:00 </li>
                        <li className="m-0 pl-10 pr-10"> <i className="fa fa-envelope-o text-white"></i> <a className="text-white" href="#">contact@yourdomain.com</a> </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div id="side-panel-trigger" className="side-panel-trigger pull-right flip sm-pull-none mt-5"><a href="#"><i className="fa fa-bars font-24 text-white"></i></a></div>
                    <div className="widget no-border m-0">
                      <ul className="social-icons icon-dark icon-circled icon-theme-colored icon-sm pull-right flip sm-pull-none sm-text-center mt-sm-15">
                        <li><a href="#"><i className="fa fa-facebook text-white"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter text-white"></i></a></li>
                        <li><a href="#"><i className="fa fa-google-plus text-white"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram text-white"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin text-white"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="header-middle p-0 bg-lightest xs-text-center">
              <div className="container pt-0 pb-0">
                <div className="row">
                  <div className="col-xs-12 col-sm-4 col-md-5">
                    <div className="widget no-border m-0">
                      <a className="menuzord-brand pull-left flip xs-pull-center mb-15" href="javascript:void(0)"><img src="template/images/logo-wide.png" alt=""/></a>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <div className="widget no-border pull-right sm-pull-none sm-text-center mt-10 mb-10 m-0">
                      <ul className="list-inline">
                        <li><i className="icon_mobile text-theme-colored font-32 mt-5 sm-display-block"></i></li>
                        <li>
                          <a href="#" className="font-12 text-gray text-uppercase">Call us today!</a>
                          <h5 className="font-14 m-0"> +(012) 345 6789</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-3">
                    <div className="widget no-border pull-right sm-pull-none sm-text-center mt-10 mb-10 m-0">
                      <ul className="list-inline">
                        <li><i className="fa fa-clock-o text-theme-colored font-36 mt-5 sm-display-block"></i></li>
                        <li>
                          <a href="#" className="font-12 text-gray text-uppercase">We are open!</a>
                          <h5 className="font-13 text-black m-0"> Mon-Fri 8:00-16:00</h5>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <AutoAffix viewportOffsetTop={0} container={this}>
            <div className="header-nav-wrapper navbar-scrolltofixed bg-light navbar-static-top">
              <div className="container">
                <nav id="menuzord" className="menuzord blue bg-light">
                  <ul className="menuzord-menu">
                    <li className="active"><Link to="/">Home</Link>
                    </li>
                  </ul>

                  <ul className="pull-right flip hidden-sm hidden-xs">
                    <div className="widget no-border m-0">
                      <a className="btn btn-colored btn-flat btn-theme-colored mt-15" data-toggle="modal" >Log in</a>
                    </div>
                  </ul>
                </nav>
              </div>
            </div>

          </AutoAffix>

          <div className="main-content">
            {this.props.children}
          </div>
          <footer id="footer" className="footer pb-0 bg-black-111">
            <div className="container pb-20">
              <div className="row multi-row-clearfix">
                <div className="col-sm-6 col-md-3">
                  <div className="widget dark"> <img alt="" src="template/images/logo-wide-white.png"/>
                    <p className="font-12 mt-10 mb-10">Medinova is a library of corporate and business templates with predefined web elements which helps you to build your own site.</p>
                    <a className="btn btn-default btn-transparent btn-xs btn-flat mt-5" href="#">Read more</a>
                    <ul className="social-icons icon-sm icon-bordered icon-circled clearfix mt-20">
                      <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="widget dark">
                    <h5 className="widget-title line-bottom">Photos from Flickr</h5>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="widget dark">
                    <h5 className="widget-title line-bottom">Quick Links</h5>
                    <ul className="list-border list theme-colored angle-double-right">
                      <li><a href="#">Privacy Policy</a></li>
                      <li><a href="#">Donor Privacy Policy</a></li>
                      <li><a href="#">Disclaimer</a></li>
                      <li><a href="#">Terms of Use</a></li>
                      <li><a href="#">Copyright Notice</a></li>
                      <li><a href="#">Media Center</a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="widget dark">
                    <h5 className="widget-title line-bottom">Quick Contact</h5>
                    <ul className="list list-border">
                      <li><a href="#">+(012) 345 6789</a></li>
                      <li><a href="#">hello@yourdomain.com</a></li>
                      <li><a href="#" className="lineheight-20">121 King Street, Melbourne Victoria 3000, Australia</a></li>
                    </ul>
                    <p className="text-white mb-5 mt-15">Subscribe to our newsletter</p>
                    <form id="footer-mailchimp-subscription-form" className="newsletter-form mt-10">
                      <label className="display-block" ></label>
                      <div className="input-group">
                        <input type="email" value="" name="EMAIL" placeholder="Your Email"  className="form-control" data-height="37px" id="mce-EMAIL"/>
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-colored btn-theme-colored m-0"><i className="fa fa-paper-plane-o text-white"></i></button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-nav bg-black-222 p-20">
              <div className="row text-center">
                <div className="col-md-12">
                  <p className="text-white font-11 m-0">Copyright &copy;2015 ThemeMascot. All Rights Reserved</p>
                </div>
              </div>
            </div>
          </footer>
        </div>

			)
	}
}


function mapStateToProps(state){
	return state;
}

function mapDispatchToProps(dispatch){
	return {
		actions: bindActionCreators(actions,dispatch)
	}
}

export default connect(mapStateToProps,actions)(App);
