import React, { Component,PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import {getBoundsForNode} from './helper';

export default class ScheduleResourceSlot extends Component {

  static contextTypes = {
      setCurrentResource: PropTypes.func,
      setColumnsOfTimeSlots: PropTypes.func
  };

  static propTypes = {
    resource: PropTypes.object,
    label: PropTypes.string,
    isFirstForTime: PropTypes.bool,
    isContent: PropTypes.bool,
    hasTimeSlots: PropTypes.bool,
    hasEvents: PropTypes.bool
  };

  componentDidMount() {
    this.container = ReactDOM.findDOMNode(this);
    this._updateColumnPosition();
  }

  componentDidUpdate(){
    this._updateColumnPosition();
  }

  _updateColumnPosition(){
    if(this.props.hasTimeSlots && this.props.resource){
      let col = this.container.getBoundingClientRect();
      this.context.setColumnsOfTimeSlots(Object.assign({},
                                                        this.props.resource,
                                                        {
                                                          top: col.top,
                                                          bottom: col.bottom,
                                                          right: col.right,
                                                          left: col.left,
                                                          width: col.width
                                                        }
                                                        ));
    }
  }

  componentWillUnmount() {

  }

  _resourceClick(){
    if(this.context.setCurrentResource){
      this.context.setCurrentResource(this.props.resource);
    }
  }

  _celClick(cell){
    console.log('click on cell',cell);
  }

  render() {
    //if having lable => return header of the table, otherwise => retunr the body of table
    var classes = classNames({'fc-minor': (this.props.label?false:true) });
    var returnValue;
    let width = '200px';

    if(this.props.isContent){
      if(this.props.isFirstForTime){
        returnValue = (
                       <td className="fc-day fc-widget-content fc-sat fc-past" style={{width:'48.78125px'}}>
                         <div className="fc-minor">
                           <div className="fc-axis fc-time fc-widget-content">
                             <span>00:00</span>
                           </div>
                         </div>
                       </td>
                      );
      }else{
        returnValue = (<td>
                          <div className="fc-content-col">
                            <div className="fc-event-container fc-helper-container">
                            </div>
                            <div className="fc-event-container">
                            </div>
                            <div className="fc-highlight-container">
                            </div>
                          </div>
                       </td>
                      );
      }
    }else if(this.props.label){
      if(this.props.isFirstForTime){
        returnValue = <th className="fc-day fc-widget-content fc-sat fc-past" style={{width:'48.78125px'}}></th>;
      }else{
        returnValue = <th className="fc-resource-cell" style={{width}}>{this.props.label}</th>;
      }
    }else if(this.props.hasTimeSlots){
      if(this.props.isFirstForTime){
        returnValue = (
                        <td className="fc-day fc-widget-content fc-sat fc-past" style={{width:'48.78125px'}}>
                            {this.props.children}
                        </td>
                      );
      }else{
        let className;

        if(this.props.resource){
          className = classNames("fc-day","fc-widget-content","fc-sat","fc-past",""+this.props.resource.title.replace(/ /g,''));
        }else{
          className = classNames("fc-day","fc-widget-content","fc-sat","fc-past");
        }


        returnValue = (
                      <td className={className} style={{width}} onClick={this._resourceClick.bind(this)}>
                          {this.props.children}
                      </td>
                      );
      }
    }else if(this.props.hasEvents){
      if(this.props.isFirstForTime){
        returnValue = (
                        <td className="fc-day fc-widget-content fc-sat fc-past" style={{width:'48.78125px'}}>
                            {this.props.children}
                        </td>
                      );
      }else{
        let className;

        if(this.props.resource){
          className = classNames(""+this.props.resource.title.replace(/ /g,''));
        }

        returnValue = (
                      <td className={className} style={{width}}>
                        <div className="fc-content-col">
                          {this.props.children}
                        </div>
                      </td>
                      );
      }
    }
    else {
      if(this.props.isFirstForTime){
        returnValue = <td className="fc-day fc-widget-content fc-sat fc-past" style={{width:'48.78125px'}}></td>;
      }else{
        returnValue = (
                      <td className="fc-day fc-widget-content fc-sat fc-past" style={{width}} onClick={this._resourceClick.bind(this)}>
                      </td>
                      );
      }
    }
    return returnValue;
  }
}
