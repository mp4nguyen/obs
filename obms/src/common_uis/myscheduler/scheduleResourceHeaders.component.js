import React, { Component,PropTypes} from 'react';
import moment from 'moment';
import shallowCompare from 'react-addons-shallow-compare';

import ScheduleResourceSlot from './ScheduleResourceSlot.component';


export default class ScheduleResourceHeaders extends Component {

  static propTypes = {
      resources: PropTypes.array
  }


  shouldComponentUpdate(nextProps, nextState,nextContext) {
    return shallowCompare(this,nextProps, nextState);
  }

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

      resourceSlots.push(<ScheduleResourceSlot key={-1} isFirstForTime={true} label="Time" hasTimeSlots={false}/>);
      this.props.resources.map((res,index)=>{
        resourceSlots.push(<ScheduleResourceSlot key={index} label={res.title} resource={res} hasTimeSlots={false}/>);
      });

      return resourceSlots;
  }

  render() {
    console.log('Rendering header ........');
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
