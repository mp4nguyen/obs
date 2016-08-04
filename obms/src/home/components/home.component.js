import React, { Component } from 'react';
import {Link} from 'react-router';

//import { Affix ,AutoAffix} from 'react-overlays';
import Affix from '../../common_uis/components/affix.component';

export default class Home extends Component {

  componentDidMount() {
    console.log('home.componentDidMount');
    document.body.classList.add('page-boxed');
    document.body.classList.add('page-container-bg-solid');
  }

  componentWillUnmount() {
    document.body.classList.remove('page-boxed');
    document.body.classList.remove('page-container-bg-solid');
  }

  render() {
    return (
      (
        <div>
          <div className="page-header">
              <div className="page-header-top">
                  <div className="container">
                      <div className="page-logo">
                          <a href="index.html">
                              <img src="../assets/layouts/layout3/img/logo-default.jpg" alt="logo" className="logo-default"/>
                          </a>
                      </div>
                      {/* END LOGO */}
                      {/* BEGIN RESPONSIVE MENU TOGGLER */}
                      <a href="javascript:;" className="menu-toggler"></a>
                      {/* END RESPONSIVE MENU TOGGLER */}
                      {/* BEGIN TOP NAVIGATION MENU */}
                      <div className="top-menu">
                          <ul className="nav navbar-nav pull-right">
                              {/* BEGIN NOTIFICATION DROPDOWN */}
                              <li className="dropdown dropdown-extended dropdown-notification dropdown-dark" id="header_notification_bar">
                                  <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                      <i className="icon-bell"></i>
                                      <span className="badge badge-default">7</span>
                                  </a>
                                  <ul className="dropdown-menu">
                                      <li className="external">
                                          <h3>You have
                                              <strong>12 pending</strong> tasks</h3>
                                          <a href="app_todo.html">view all</a>
                                      </li>
                                      <li>
                                          <ul className="dropdown-menu-list scroller" style={{height: 250 + 'px'}} data-handle-color="#637283">
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">just now</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-success">
                                                              <i className="fa fa-plus"></i>
                                                          </span> New user registered. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">3 mins</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-danger">
                                                              <i className="fa fa-bolt"></i>
                                                          </span> Server #12 overloaded. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">10 mins</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-warning">
                                                              <i className="fa fa-bell-o"></i>
                                                          </span> Server #2 not responding. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">14 hrs</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-info">
                                                              <i className="fa fa-bullhorn"></i>
                                                          </span> Application error. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">2 days</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-danger">
                                                              <i className="fa fa-bolt"></i>
                                                          </span> Database overloaded 68%. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">3 days</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-danger">
                                                              <i className="fa fa-bolt"></i>
                                                          </span> A user IP blocked. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">4 days</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-warning">
                                                              <i className="fa fa-bell-o"></i>
                                                          </span> Storage Server #4 not responding dfdfdfd. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">5 days</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-info">
                                                              <i className="fa fa-bullhorn"></i>
                                                          </span> System Error. </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="time">9 days</span>
                                                      <span className="details">
                                                          <span className="label label-sm label-icon label-danger">
                                                              <i className="fa fa-bolt"></i>
                                                          </span> Storage server failed. </span>
                                                  </a>
                                              </li>
                                          </ul>
                                      </li>
                                  </ul>
                              </li>
                              {/* END NOTIFICATION DROPDOWN */}
                              {/* BEGIN TODO DROPDOWN */}
                              <li className="dropdown dropdown-extended dropdown-tasks dropdown-dark" id="header_task_bar">
                                  <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                      <i className="icon-calendar"></i>
                                      <span className="badge badge-default">3</span>
                                  </a>
                                  <ul className="dropdown-menu extended tasks">
                                      <li className="external">
                                          <h3>You have
                                              <strong>12 pending</strong> tasks</h3>
                                          <a href="app_todo_2.html">view all</a>
                                      </li>
                                      <li>
                                          <ul className="dropdown-menu-list scroller" style={{height: 275 + 'px'}} data-handle-color="#637283">
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">New release v1.2 </span>
                                                          <span className="percent">30%</span>
                                                      </span>
                                                      <span className="progress">
                                                          <span style={{width: '40%'}} className="progress-bar progress-bar-success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">40% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">Application deployment</span>
                                                          <span className="percent">65%</span>
                                                      </span>
                                                      <span className="progress">
                                                          <span style={{width: '65%'}} className="progress-bar progress-bar-danger" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">65% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">Mobile app release</span>
                                                          <span className="percent">98%</span>
                                                      </span>
                                                      <span className="progress">
                                                          <span style={{width: '98%'}} className="progress-bar progress-bar-success" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">98% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">Database migration</span>
                                                          <span className="percent">10%</span>
                                                      </span>
                                                      <span className="progress">
                                                          <span style={{width: '10%'}} className="progress-bar progress-bar-warning" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">10% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">Web server upgrade</span>
                                                          <span className="percent">58%</span>
                                                      </span>
                                                      <span className="progress">
                                                          <span style={{width: '58%'}} className="progress-bar progress-bar-info" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">58% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">Mobile development</span>
                                                          <span className="percent">85%</span>
                                                      </span>
                                                      <span className="progress">
                                                          <span style={{width: '85%'}} className="progress-bar progress-bar-success" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">85% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="javascript:;">
                                                      <span className="task">
                                                          <span className="desc">New UI release</span>
                                                          <span className="percent">38%</span>
                                                      </span>
                                                      <span className="progress progress-striped">
                                                          <span style={{width: '38%'}} className="progress-bar progress-bar-important" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100">
                                                              <span className="sr-only">38% Complete</span>
                                                          </span>
                                                      </span>
                                                  </a>
                                              </li>
                                          </ul>
                                      </li>
                                  </ul>
                              </li>
                              {/* END TODO DROPDOWN */}
                              <li className="droddown dropdown-separator">
                                  <span className="separator"></span>
                              </li>
                              {/* BEGIN INBOX DROPDOWN */}
                              <li className="dropdown dropdown-extended dropdown-inbox dropdown-dark" id="header_inbox_bar">
                                  <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                      <span className="circle">3</span>
                                      <span className="corner"></span>
                                  </a>
                                  <ul className="dropdown-menu">
                                      <li className="external">
                                          <h3>You have
                                              <strong>7 New</strong> Messages</h3>
                                          <a href="app_inbox.html">view all</a>
                                      </li>
                                      <li>
                                          <ul className="dropdown-menu-list scroller" style={{height: '275px'}} data-handle-color="#637283">
                                              <li>
                                                  <a href="#">
                                                      <span className="photo">
                                                          <img src="../assets/layouts/layout3/img/avatar2.jpg" className="img-circle" alt=""/> </span>
                                                      <span className="subject">
                                                          <span className="from"> Lisa Wong </span>
                                                          <span className="time">Just Now </span>
                                                      </span>
                                                      <span className="message"> Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="#">
                                                      <span className="photo">
                                                          <img src="../assets/layouts/layout3/img/avatar3.jpg" className="img-circle" alt=""/> </span>
                                                      <span className="subject">
                                                          <span className="from"> Richard Doe </span>
                                                          <span className="time">16 mins </span>
                                                      </span>
                                                      <span className="message"> Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="#">
                                                      <span className="photo">
                                                          <img src="../assets/layouts/layout3/img/avatar1.jpg" className="img-circle" alt=""/> </span>
                                                      <span className="subject">
                                                          <span className="from"> Bob Nilson </span>
                                                          <span className="time">2 hrs </span>
                                                      </span>
                                                      <span className="message"> Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="#">
                                                      <span className="photo">
                                                          <img src="../assets/layouts/layout3/img/avatar2.jpg" className="img-circle" alt=""/> </span>
                                                      <span className="subject">
                                                          <span className="from"> Lisa Wong </span>
                                                          <span className="time">40 mins </span>
                                                      </span>
                                                      <span className="message"> Vivamus sed auctor 40% nibh congue nibh... </span>
                                                  </a>
                                              </li>
                                              <li>
                                                  <a href="#">
                                                      <span className="photo">
                                                          <img src="../assets/layouts/layout3/img/avatar3.jpg" className="img-circle" alt=""/> </span>
                                                      <span className="subject">
                                                          <span className="from"> Richard Doe </span>
                                                          <span className="time">46 mins </span>
                                                      </span>
                                                      <span className="message"> Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                                                  </a>
                                              </li>
                                          </ul>
                                      </li>
                                  </ul>
                              </li>
                              {/* END INBOX DROPDOWN */}
                              {/* BEGIN USER LOGIN DROPDOWN */}
                              <li className="dropdown dropdown-user dropdown-dark">
                                  <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                                      <img alt="" className="img-circle" src="../assets/layouts/layout3/img/avatar9.jpg"/>
                                      <span className="username username-hide-mobile">Nick</span>
                                  </a>
                                  <ul className="dropdown-menu dropdown-menu-default">
                                      <li>
                                          <a href="page_user_profile_1.html">
                                              <i className="icon-user"></i> My Profile </a>
                                      </li>
                                      <li>
                                          <a href="app_calendar.html">
                                              <i className="icon-calendar"></i> My Calendar </a>
                                      </li>
                                      <li>
                                          <a href="app_inbox.html">
                                              <i className="icon-envelope-open"></i> My Inbox
                                              <span className="badge badge-danger"> 3 </span>
                                          </a>
                                      </li>
                                      <li>
                                          <a href="app_todo_2.html">
                                              <i className="icon-rocket"></i> My Tasks
                                              <span className="badge badge-success"> 7 </span>
                                          </a>
                                      </li>
                                      <li className="divider"> </li>
                                      <li>
                                          <a href="page_user_lock_1.html">
                                              <i className="icon-lock"></i> Lock Screen </a>
                                      </li>
                                      <li>
                                          <a href="page_user_login_1.html">
                                              <i className="icon-key"></i> Log Out </a>
                                      </li>
                                  </ul>
                              </li>
                              {/* END USER LOGIN DROPDOWN */}

                          </ul>
                      </div>
                      {/* END TOP NAVIGATION MENU */}
                  </div>
              </div>
              {/* END HEADER TOP */}


                {/* BEGIN HEADER MENU */}
                <div className="page-header-menu">
                    <div className="container">

                        {/* BEGIN MEGA MENU */}
                        {/* DOC: Apply "hor-menu-light" className after the "hor-menu" className below to have a horizontal menu with white background */}
                        {/* DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the dropdown opening on mouse hover */}
                        <div className="hor-menu  ">
                            <ul className="nav navbar-nav navbar-fixed-top">
                                <li className="menu-dropdown classNameic-menu-dropdown">
                                    <Link to="/Home/Bookings">Dashboard</Link>
                                    <ul className="dropdown-menu pull-left">
                                        <li className=" active">
                                            <a href="index.html" className="nav-link  active">
                                                <i className="icon-bar-chart"></i> Default Dashboard
                                                <span className="badge badge-success">1</span>
                                            </a>
                                        </li>
                                        <li className=" ">
                                            <a href="dashboard_2.html" className="nav-link  ">
                                                <i className="icon-bulb"></i> Dashboard 2 </a>
                                        </li>
                                        <li className=" ">
                                            <a href="dashboard_3.html" className="nav-link  ">
                                                <i className="icon-graph"></i> Dashboard 3
                                                <span className="badge badge-danger">3</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="menu-dropdown classNameic-menu-dropdown ">
                                    <a href="javascript:;"> Company Setup
                                        <span className="arrow"></span>
                                    </a>
                                    <ul className="dropdown-menu pull-left">
                                        <li className=" ">
                                            <Link to="/Home/CompanyList">Company List</Link>
                                        </li>
                                        <li className=" ">
                                            <Link to="/Home/CompanyDetail">Company Detail</Link>
                                        </li>
                                        <li className=" ">
                                            <Link to="/Home/ClinicList">Clinic List</Link>
                                        </li>
                                        <li className=" ">
                                            <Link to="/Home/DoctorList">Doctor List</Link>
                                        </li>
                                        <li className=" ">
                                            <Link to="/Home/DoctorRoster">Doctor Roster</Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* END MEGA MENU */}
                    </div>
                </div>
                {/* END HEADER MENU */}


          </div>
          <div className="page-container">
              {/* BEGIN CONTENT */}
              <div className="page-content-wrapper">
                  {/* BEGIN CONTENT BODY */}
                  {/* BEGIN PAGE CONTENT BODY */}
                  <div className="page-content">
                      <div className="container">
                          {/* BEGIN PAGE CONTENT INNER */}
                          <div className="">
                            {this.props.children}
                          </div>
                          {/* END PAGE CONTENT INNER */}
                      </div>
                  </div>
                  {/* END PAGE CONTENT BODY */}
                  {/* END CONTENT BODY */}
              </div>
              {/* END CONTENT */}
          </div>
          {/* END CONTAINER */}
          {/* BEGIN FOOTER */}
          {/* BEGIN PRE-FOOTER */}
          <div className="page-prefooter">
              <div className="container">
                  <div className="row">
                      <div className="col-md-3 col-sm-6 col-xs-12 footer-block">
                          <h2>About</h2>
                          <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam dolore. </p>
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs12 footer-block">
                          <h2>Subscribe Email</h2>
                          <div className="subscribe-form">
                              <form action="javascript:;">
                                  <div className="input-group">
                                      <input type="text" placeholder="mail@email.com" className="form-control"/>
                                      <span className="input-group-btn">
                                          <button className="btn" type="submit">Submit</button>
                                      </span>
                                  </div>
                              </form>
                          </div>
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 footer-block">
                          <h2>Follow Us On</h2>
                          <ul className="social-icons">
                              <li>
                                  <a href="javascript:;" data-original-title="rss" className="rss"></a>
                              </li>
                              <li>
                                  <a href="javascript:;" data-original-title="facebook" className="facebook"></a>
                              </li>
                              <li>
                                  <a href="javascript:;" data-original-title="twitter" className="twitter"></a>
                              </li>
                              <li>
                                  <a href="javascript:;" data-original-title="googleplus" className="googleplus"></a>
                              </li>
                              <li>
                                  <a href="javascript:;" data-original-title="linkedin" className="linkedin"></a>
                              </li>
                              <li>
                                  <a href="javascript:;" data-original-title="youtube" className="youtube"></a>
                              </li>
                              <li>
                                  <a href="javascript:;" data-original-title="vimeo" className="vimeo"></a>
                              </li>
                          </ul>
                      </div>
                      <div className="col-md-3 col-sm-6 col-xs-12 footer-block">
                          <h2>Contacts</h2>
                          <address className="margin-bottom-40"> Phone: 800 123 3456
                              Email:
                              <a href="mailto:info@metronic.com">info@metronic.com</a>
                          </address>
                      </div>
                  </div>
              </div>
          </div>
          {/* END PRE-FOOTER */}
          {/* BEGIN INNER FOOTER */}
          <div className="page-footer">
              <div className="container"> 2014 &copy; Metronic by keenthemes.
                  <a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" title="Purchase Metronic just for 27$ and get lifetime updates for free" target="_blank">Purchase Metronic!</a>
              </div>
          </div>
          <div className="scroll-to-top">
              <i className="icon-arrow-up"></i>
          </div>
          {/* END INNER FOOTER */}
          {/* END FOOTER */}
        </div>
      )
    );
  }
}
