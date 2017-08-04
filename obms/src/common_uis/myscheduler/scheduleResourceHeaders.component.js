import React, { Component,PropTypes} from 'react';
import moment from 'moment';
import * as _ from 'underscore'
import ScheduleResourceSlot from './ScheduleResourceSlot.component';


export default class ScheduleResourceHeaders extends Component {

  static contextTypes = {
      resources: PropTypes.array,
      headerTitleField: PropTypes.string,
      headerNameField: PropTypes.string,
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    return  !_.isEqual(nextContext,this.context);
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

      this.context.resources.map((res,index)=>{
        if(res.currentRoster){
          let resourceName = res[this.context.headerTitleField]+' '+res[this.context.headerNameField];
          resourceSlots.push(<ScheduleResourceSlot key={index} label={ resourceName } resource={res} hasTimeSlots={false}/>);
        }
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
