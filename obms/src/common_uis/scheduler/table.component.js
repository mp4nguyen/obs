import React, { Component,PropTypes } from 'react';

export default class Table extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.object,
    subModel: PropTypes.string,
    onRowClick: PropTypes.func
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

  renderHeaderTable(){
    var headers = [];

    headers = this.props.columns.map(
      (column,index)=>{
        return(<th key={index}>{column.title}</th>)
      });

    console.log('headers=',headers);
    return headers;
  }

  renderBodyTable(){
    var rows = [];
    var rowId = 0;
    if(this.props.data){
        for(var key in this.props.data){
            let rowObject = this.props.data[key];
            let cols = [];

            cols = this.props.columns.map(
              (column,index2)=>{
                let cell = rowObject[column.id];
                if(cell.bookingTypeName){
                  return(<th key={index2} onClick={this._celClick.bind(this,cell)}>{cell.bookingTypeName}</th>)
                }else{
                  return(<th key={index2}></th>)
                }

              });
            cols.unshift(<th>{key}</th>);
            rows.push(<tr key={rowId} onClick={this._rowClick.bind(this,rowObject)}>{cols}</tr>);
            rowId++;
        }
    }else{
      return(<div/>)
    }
    console.log('renderBodyTable  rows=',rows);
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
                              <th>Time</th>
                              {
                                this.renderHeaderTable()
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
