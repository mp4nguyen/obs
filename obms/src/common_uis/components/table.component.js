import React, { Component,PropTypes } from 'react';
import * as _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import moment from 'moment';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    margin: 'auto'
  },
};

export default class MyTable extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
  };

  //columns=[{title:'DOB',fieldName:'dob',dateformat:'DD/MM/YYYY'},]

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  shouldComponentUpdate(nextProp,nextState,nextContext){
    return !_.isEqual(nextProp.data,this.props.data);
  }

  _rowClick(row){
    console.log('click on row',row);
    this.props.onRowClick(row);
  }

  renderBodyTable(){
    var rows = [];
    if(this.props.data){
      if(this.props.subModel){
        rows = this.props.data.map(
          (row,index)=>{
            return(<tr key={index} onClick={this._rowClick.bind(this,row)}>
                      {
                        this.props.columns.map(
                          (column,index2)=>{
                            if(column.type && column.type.toUpperCase == 'CHECKBOX'){
                              return(
                                      <td key={index2}>
                                        <Checkbox
                                          style={styles.checkbox}
                                          checked={row[this.props.subModel][column.fieldName] == 1 ? true:false}
                                        />
                                      </td>
                                    )
                            }else{
                              if(column.dateformat){
                                return(<td key={index2}>{moment(row[this.props.subModel][column.fieldName]).format(column.dateformat)}</td>)
                              }else{
                                return(<td key={index2}>{row[this.props.subModel][column.fieldName]}</td>)
                              }
                            }
                          })
                      }
                   </tr>
                  )
          })
      }else{
        rows = this.props.data.map(
          (row,index)=>{
            return(<tr key={index} onClick={this._rowClick.bind(this,row)}>
                      {
                        this.props.columns.map(
                          (column,index2)=>{
                            if(column.type && column.type.toUpperCase() == 'CHECKBOX'){
                              return(
                                      <td key={index2}>
                                        <Checkbox
                                          style={styles.checkbox}
                                          checked={row[column.fieldName] == 1 ? true:false}
                                        />
                                      </td>
                                    )
                            }else{
                              if(column.dateformat){
                                return(<td key={index2}>{moment(row[column.fieldName]).format(column.dateformat)}</td>)
                              }else{
                                return(<td key={index2}>{row[column.fieldName]}</td>)
                              }
                            }

                          })
                      }
                   </tr>
                  )
          })
      }
    }else{
      return(<div/>)
    }
    return rows;
  }

  render() {
    return (
      (
        <div className="portlet" >
            <div className="portlet-body">
                <div className="table-scrollable">
                    <table className="table table-striped table-bordered table-hover order-column" >
                        <thead>
        	                <tr>
                              {
                                this.props.columns.map(
                                  (column,index)=>{
                                    return(<th key={index}>{column.title}</th>)
                                  })
                              }
        	                </tr>
                        </thead>
                        <tbody>
                          {
                            this.renderBodyTable()
                          }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      )
    );
  }
}
