import React, { Component,PropTypes } from 'react';
import classNames from 'classnames';

export default class ScheduleResourceSlot extends Component {

  static propTypes = {
    resource: PropTypes.object,
    label: PropTypes.string,
    isFirstForTime: PropTypes.bool,
    isContent: PropTypes.bool
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _resourceClick(){
    console.log('click on resource',this.props.resource);
    //this.props.onRowClick(row);
  }

  _celClick(cell){
    console.log('click on cell',cell);
  }

  render() {
    //if having lable => return header of the table, otherwise => retunr the body of table
    var classes = classNames({'fc-minor': (this.props.label?false:true) });
    var returnValue;

    if(this.props.isContent){
      if(this.props.isFirstForTime){
        returnValue = <td className="fc-axis" style={{width:'48.78125px'}}></td>;
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
          returnValue = <th className="fc-axis fc-widget-header" style={{width:'48.78125px'}}></th>;
      }else{
        returnValue = <th className="fc-resource-cell" data-resource-id="a">{this.props.label}</th>;
      }
    }else{
      if(this.props.isFirstForTime){
        returnValue = <td className="fc-axis fc-widget-content" style={{width:'48.78125px'}}></td>;
      }else{
        returnValue = <td className="fc-day fc-widget-content fc-sat fc-past" data-resource-id="a" onClick={this._resourceClick.bind(this)}></td>;
      }
    }
    return returnValue;
  }
}
