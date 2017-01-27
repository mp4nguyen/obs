import React, { Component,PropTypes } from 'react';

import ScheduleTimes from './ScheduleTimes.component';

export default class ScheduleFrame extends Component {

  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.object,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _rowClick(row){
    console.log('click on row',row);
    //this.props.onRowClick(row);
  }

  _celClick(cell){
    console.log('click on cell',cell);
  }



  render() {
    return (
      (
      <div className="fc fc-unthemed fc-ltr">
        <div className="fc-view-container" >
          <div className="fc-view fc-agendaDay-view fc-agenda-view" >
            <table>
              {/* Begin calendar header*/}
              <thead className="fc-head">
                <tr>
                  <td className="fc-head-container fc-widget-header">
                    <div className="fc-row fc-widget-header">
                      <table>
                        <thead>
                          <tr>
                            <th className="fc-axis fc-widget-header" style={{width:'48.78125px'}}></th>
                            <th className="fc-resource-cell" data-resource-id="a">Room A</th>
                            <th className="fc-resource-cell" data-resource-id="b">Room B</th>
                            <th className="fc-resource-cell" data-resource-id="c">Room C</th>
                            <th className="fc-resource-cell" data-resource-id="d">Room D</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </td>
                </tr>
              </thead>
              {/* End calendar header*/}
              {/* Begin calendar body*/}
              <tbody className="fc-body">
                <tr>
                  <td className="fc-widget-content">
                    {/* Begin all day session */}
                    <div className="fc-day-grid fc-unselectable">
                      <div className="fc-row fc-week fc-widget-content">
                        <div className="fc-bg">
                          <table>
                            <tbody>
                              <tr>
                                <td className="fc-axis fc-widget-content" style={{width:'48.78125px'}}><span>all-day</span></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="a"></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="b"></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="c"></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="d"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="fc-content-skeleton">
                          <table>
                            <tbody>
                              <tr>
                                <td className="fc-axis" style={{width:'48.78125px'}}></td>
                                <td className="fc-event-container">
                                  <a className="fc-day-grid-event fc-h-event fc-event fc-not-start fc-end fc-draggable fc-resizable">
                                    <div className="fc-content">
                                      <span className="fc-title">event 1</span>
                                    </div>
                                    <div className="fc-resizer fc-end-resizer"></div>
                                  </a>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* End all day session */}
                    <hr className="fc-divider fc-widget-header"/>
                    {/* Begin time session */}
                    <div className="fc-scroller fc-time-grid-container" style={{overflowX: 'hidden', overflowY: 'scroll', height: '601px'}}>
                      <div className="fc-time-grid fc-unselectable">
                        {/* Begin column resources */}
                        <div className="fc-bg">
                          <table>
                            <tbody>
                              <tr>
                                <td className="fc-axis fc-widget-content" style={{width:'48.78125px'}}></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="a"></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="b"></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="c"></td>
                                <td className="fc-day fc-widget-content fc-sat fc-past" data-date="2016-05-07" data-resource-id="d"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* End column resources */}
                        {/* Begin time slots */}
                        <div className="fc-slats">
                          <table>


                            <ScheduleTimes/>

                          </table>
                        </div>
                        {/* End time slots */}
                        {/* Begin events on time slots */}
                        <div className="fc-content-skeleton">
                          <table>
                            <tbody>
                              <tr>
                                <td className="fc-axis" style={{width:'48.78125px'}}></td>
                                <td>
                                  <div className="fc-content-col">
                                    <div className="fc-event-container fc-helper-container">
                                    </div>
                                    <div className="fc-event-container">
                                      <a className="fc-time-grid-event fc-v-event fc-event fc-start fc-end fc-draggable fc-resizable"
                                        style={{top: '307px', bottom: '-461px', zIndex: 1, left: '0%', right: '0%'}} >
                                        <div className="fc-content">
                                          <div className="fc-time" data-start="7:00" data-full="7:00 AM - 10:30 AM">
                                            <span>7:00 - 10:30</span>
                                          </div>
                                          <div className="fc-title">event 2</div>
                                        </div>
                                        <div className="fc-bg"></div>
                                        <div className="fc-resizer fc-end-resizer"></div>
                                      </a>
                                    </div>
                                    <div className="fc-highlight-container">
                                    </div>
                                    <div className="fc-bgevent-container">
                                    </div>
                                    <div className="fc-business-container">
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="fc-content-col">
                                  </div>
                                </td>
                                <td>
                                  <div className="fc-content-col">
                                  </div>
                                </td>
                                <td>
                                  <div className="fc-content-col">
                                  </div>
                                </td>

                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* End events on time slots */}
                      </div>
                    </div>
                    {/* End time session */}
                  </td>
                </tr>
              </tbody>
              {/* End calendar body*/}
            </table>
          </div>
        </div>
      </div>
      )
    );
  }
}

/*
<tbody>
  <tr data-time="00:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>12am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="00:15:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>ss</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="00:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>

  <tr data-time="01:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>1am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="01:15:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="01:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="02:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>2am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="02:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="03:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>3am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="03:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="04:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>4am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="04:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="05:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>5am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="05:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="06:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>6am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="06:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="07:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>7am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="07:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="08:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>8am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="08:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="09:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>9am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="09:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="10:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>10am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="10:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="11:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>11am</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="11:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="12:00:00">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
      <span>12pm</span>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
  <tr data-time="12:30:00" className="fc-minor">
    <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
    </td>
    <td className="fc-widget-content"></td>
  </tr>
</tbody>*/
