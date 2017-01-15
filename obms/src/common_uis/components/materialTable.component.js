import React, { Component,PropTypes } from 'react';
import * as _ from 'lodash';
import Checkbox from 'material-ui/Checkbox';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import moment from 'moment';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

export default class MaterialTable extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
  };

  //columns=[{title:'DOB',fieldName:'dob',dateformat:'DD/MM/YYYY'},]

  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px',
    };
  }

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
            return(<TableRow key={index}>
                      {
                        this.props.columns.map(
                          (column,index2)=>{
                            if(column.type && column.type.toUpperCase == 'CHECKBOX'){
                              return(
                                      <TableRowColumn key={index2}>
                                        <Checkbox
                                          style={styles.checkbox}
                                          checked={row[this.props.subModel][column.fieldName] == 1 ? true:false}
                                        />
                                      </TableRowColumn>
                                    )
                            }else{
                              if(column.dateformat){
                                return(<TableRowColumn key={index2}>{moment(row[this.props.subModel][column.fieldName]).format(column.dateformat)}</TableRowColumn>)
                              }else{
                                return(<TableRowColumn key={index2}>{row[this.props.subModel][column.fieldName]}</TableRowColumn>)
                              }
                            }
                          })
                      }
                   </TableRow>
                  )
          })
      }else{
        rows = this.props.data.map(
          (row,index)=>{
            return(<TableRow key={index}>
                      {
                        this.props.columns.map(
                          (column,index2)=>{
                            if(column.type && column.type.toUpperCase() == 'CHECKBOX'){
                              return(
                                      <TableRowColumn key={index2}>
                                        <Checkbox
                                          style={styles.checkbox}
                                          checked={row[column.fieldName] == 1 ? true:false}
                                        />
                                      </TableRowColumn>
                                    )
                            }else{
                              if(column.dateformat){
                                return(<TableRowColumn key={index2}>{moment(row[column.fieldName]).format(column.dateformat)}</TableRowColumn>)
                              }else{
                                return(<TableRowColumn key={index2}>{row[column.fieldName]}</TableRowColumn>)
                              }
                            }

                          })
                      }
                   </TableRow>
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
              <div>
                <Table
                  height={this.state.height}
                  fixedHeader={this.state.fixedHeader}
                  fixedFooter={this.state.fixedFooter}
                  selectable={this.state.selectable}
                  multiSelectable={this.state.multiSelectable}
                  onRowSelection={this._rowClick.bind(this)}
                >
                  <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                  >
                    <TableRow>
                        {
                          this.props.columns.map(
                            (column,index)=>{
                              return(<TableHeaderColumn tooltip={column.title} key={index}>{column.title}</TableHeaderColumn>)
                            })
                        }
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                  >
                    {this.renderBodyTable()}

                  </TableBody>
                </Table>
              </div>
            );
  }
}
