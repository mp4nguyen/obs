import React, { Component,PropTypes} from 'react';
import moment from 'moment';
import * as _ from 'underscore'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ScheduleResourceSlot from './ScheduleResourceSlot.component';


class ScheduleResourceHeaders extends Component {

  static contextTypes = {
      headerTitleField: PropTypes.string,
      headerNameField: PropTypes.string,
  }

  shouldComponentUpdate(nextProps, nextState,nextContext) {
    return  !_.isEqual(nextProps,this.props);
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

      this.props.resources.map((res,index)=>{
        if(res.currentRoster){
          let resourceName = res[this.context.headerTitleField]+' '+res[this.context.headerNameField];
          resourceSlots.push(<ScheduleResourceSlot key={index} label={ resourceName } resource={res} hasTimeSlots={false}/>);
        }
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



function bindAction(dispatch) {
  return {};
}

function mapStateToProps(state){
	return {
          resources: state.scheduler.resourcesAfterProcess,
         };
}

export default connect(mapStateToProps,bindAction)(ScheduleResourceHeaders);
