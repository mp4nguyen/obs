import React, { Component,PropTypes } from 'react';
import moment from 'moment';

import ScheduleResourceSlot from './ScheduleResourceSlot.component';

export default class ScheduleResourceHeaders extends Component {
  /*
  use to generate the header of resource ex: name of doctors
  */
  static propTypes = {
    resources: PropTypes.array.isRequired
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

      resourceSlots.push(<ScheduleResourceSlot key={-1} isFirstForTime={true} label="Time"/>);
      this.props.resources.map((res,index)=>{
        resourceSlots.push(<ScheduleResourceSlot key={index} label={res.title} resource={res}/>);
      });

      return resourceSlots;
  }

  render() {

      return (
        (
          <thead>
            <tr>
              {this._buildResourceFrame()}
            </tr>
          </thead>
        )
      );

  }
}
