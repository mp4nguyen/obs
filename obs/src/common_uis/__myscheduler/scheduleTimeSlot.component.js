import React, { Component,PropTypes } from 'react';
import classNames from 'classnames';

export default class ScheduleTimeSlot extends Component {

  static propTypes = {
    timeInStr: PropTypes.string.isRequired,
    label: PropTypes.string,
    columns: PropTypes.array,
    data: PropTypes.object,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _rowClick(){
    console.log('click on row',this.props.timeInStr);
    //this.props.onRowClick(row);
  }

  _celClick(cell){
    console.log('click on cell',cell);
  }

  _onDrag(){
    console.log('mouse ondrag',this.props.timeInStr);
  }

  _onDragEnd(){
    console.log('mouse ondragend',this.props.timeInStr);
  }

  render() {
    //class in order to display the seperate line with dot or solid
    //if have lable => display solid, otherwise display dot dot dot
    var classes = classNames({'fc-minor': (this.props.label?false:true) });

    return (
          <tr className={classes}>
            <td className="fc-axis fc-time fc-widget-content" style={{width:'48.78125px'}}>
              <span>{this.props.label}</span>
            </td>
            <td
                className="fc-widget-content"
                onClick={this._rowClick.bind(this)}
                onMouseDown={this._onDrag.bind(this)}
                onMouseUp={this._onDragEnd.bind(this)}
                ></td>
          </tr>
          );
  }
}
