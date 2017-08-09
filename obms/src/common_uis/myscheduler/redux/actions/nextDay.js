import moment from 'moment';
import {SET_MATRIX_POSITION} from './index'

export default function nextDay(){
  return (dispatch,getState) => {
    let scheduler = getState().scheduler;
    
    dispatch({type:SET_DISPLAY_DATE,payload:displayDate});

    this.currentDisplayDate = clone(this.currentDisplayDate);
    this.currentDisplayDate.add(1,'d');
    this.setState({matrixPositions: {}, events:[], columns:[]});
    this._setCurrentRosterForResources(this.props.resources);
  }
}
