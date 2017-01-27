import React, { Component,PropTypes } from 'react';
import moment from 'moment';

import ScheduleResourceSlot from './ScheduleResourceSlot.component';

export default class ScheduleResources extends Component {

  static propTypes = {
    resources: PropTypes.array.isRequired,
    isHeader: PropTypes.bool,
    isContent: PropTypes.bool
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

  _buildResourceFrame(){

      let resourceSlots = [];
      if(this.props.isHeader){
        resourceSlots.push(<ScheduleResourceSlot key={-1} isFirstForTime={true} label="Time"/>);
        this.props.resources.map((res,index)=>{
          resourceSlots.push(<ScheduleResourceSlot key={index} label={res.title} resource={res}/>);
        });
      }else{
        resourceSlots.push(<ScheduleResourceSlot key={-1} isFirstForTime={true} isContent={this.props.isContent}/>);
        this.props.resources.map((res,index)=>{
          resourceSlots.push(<ScheduleResourceSlot key={index} resource={res} isContent={this.props.isContent}/>);
        });
      }

      return resourceSlots;
  }

  render() {
    if(this.props.isHeader){
      return (
        (
          <thead>
            <tr>
              {this._buildResourceFrame()}
            </tr>
          </thead>
        )
      );
    }else {
      return (
        (
          <tbody>
            <tr>
              {this._buildResourceFrame()}
            </tr>
          </tbody>
        )
      );
    }

  }
}
