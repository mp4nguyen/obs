import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

import DoctorRoster from "../containers/doctorRoster.container";
import DoctorDetail from "../containers/doctorDetail.container";

const log = (type) => console.log.bind(console, type);




class Doctor extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {

    return (
      (
        <div>
          <Tabs>
            <Tab label="Doctor Information" >
              <div className="portlet light">
                  <div className="portlet-title">
                      <div className="caption">
                          <span className="caption-subject bold uppercase"> </span>
                      </div>
                      <div className="actions">
                          <a className="btn btn-circle btn-default">
                              <i className="fa fa-pencil"></i> Edit </a>
                          <a className="btn btn-circle btn-default" >
                              <i className="fa fa-plus" ></i> Add </a>
                          <a className="btn btn-circle btn-icon-only btn-default fullscreen" data-original-title="" title=""> </a>
                      </div>
                  </div>
                  <div className="portlet-body">
                      <DoctorDetail/>
                  </div>
              </div>

            </Tab>
            <Tab
              label="Roster"
            >
              <div>
                <div className="portlet light">
                    <div className="portlet-title">
                        <div className="caption">
                            <span className="caption-subject bold uppercase"> </span>
                        </div>
                        <div className="actions">
                            <a className="btn btn-circle btn-default">
                                <i className="fa fa-pencil"></i> Edit </a>
                            <a className="btn btn-circle btn-default" >
                                <i className="fa fa-plus" ></i> Add </a>
                            <a className="btn btn-circle btn-icon-only btn-default fullscreen" data-original-title="" title=""> </a>
                        </div>
                    </div>
                    <div className="portlet-body">
                      <DoctorRoster/>
                    </div>
                </div>

              </div>
            </Tab>

         </Tabs>
        </div>
      )
    );
  }
}

export default Doctor;
