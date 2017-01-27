import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import MyTable from './table.component';
import MyForm from "./form.component";
import Text from  "./text.component";
import Select from  "./select.component";
import Date from "./date.component";
import Time from "./time.component";
import Checkbox from  "./checkbox.component";
import SubmitButton from  "./submitButton.component";
import * as validators from './validators';

export default React.createClass({

  displayName: 'BookingTypes',

  propTypes: {
    data: PropTypes.array.isRequired,
    bookingTypes: PropTypes.array.isRequired,
    addNewBookingTypeCallBack: PropTypes.func,
    updateBookingTypeCallBack: PropTypes.func
  },

  getInitialState(){
    return {
            isOpenDialog: false,
            isNew: false,
            currentBookingType:null
           };
  },

  _onRowClick(rowData){
    console.log(' _onRowClick = ',rowData);
    this.setState({isOpenDialog:true,currentBookingType:rowData});
  },

  _newBookingType(){
    console.log('');
    this.setState({isNew:true,isOpenDialog:true,currentBookingType:{bookingTypeId:null,bookingTypeName:null,isenable:null}});
  },

  _submit(fields){
    console.log('submit = ',this.state.currentBookingType);
    if(this.props.addNewBookingTypeCallBack && this.state.isNew){
      this.props.addNewBookingTypeCallBack(this.state.currentBookingType);
    }else if(this.props.updateBookingTypeCallBack && !this.state.isNew){
      this.props.updateBookingTypeCallBack(this.state.currentBookingType);
    }
    this.setState({isOpenDialog:false,isNew:false});
  },

  _handleCloseModel(){
    this.setState({isOpenDialog:false});
  },

  _updateField(field){
      console.log('update field = ',field);
      this.setState({currentBookingType:Object.assign({},this.state.currentBookingType,field)});
  },

  render() {
    //ONly allow to select the booking type that not in use
    let bookingTypes = [];
    if(this.state.isNew && this.props.data){
      this.props.bookingTypes.map(bt=>{
        let findBT = this.props.data.find(data=>{
          return data.bookingTypeId === bt.bookingTypeId;
        })
        if(!findBT){
          bookingTypes.push(bt);
        }
      });
    }else{
      bookingTypes = this.props.bookingTypes;
    }

    const actions = [
          <SubmitButton />,
          <FlatButton
            label="Close"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._handleCloseModel}
          />,
        ];

    var columns = [
                    {title:'Booking Type',fieldName:'bookingTypeName'},
                    {title:'Enable',fieldName:'isenable',type:'checkbox'}
                  ];

    return (
      <div>
        <div className="portlet box green portlet-datatable ng-scope">
            <div className="portlet-title">
                <div className="caption bold uppercase">
                    <h4>Booking Types</h4>
                    <span className="caption-subject ng-binding"></span>
                </div>
                <div className="actions">
                    <a className="btn red-thunderbird btn-sm" onClick={this._newBookingType}>
                        New Booking Type
                    </a>
                </div>
            </div>
            <div className="portlet-body">
                <MyTable columns={columns} data = {this.props.data} onRowClick={this._onRowClick}/>
            </div>
        </div>
        {/*Begin dialog for add new or edit bookingTypes*/}
        <MyForm
          update={this._updateField}
          onSubmit={this._submit}
          value={this.state.currentBookingType}
        >
          <Dialog
            title="Define Rosters"
            modal={false}
            actions={actions}
            open={this.state.isOpenDialog}
            onRequestClose={this._handleCloseModel}
          >
              <div className="row">
                <div className="col-md-6">
                  <Select disabled={!this.state.isNew} dataSource={bookingTypes} valueField="bookingTypeId" primaryField="bookingTypeName" name="bookingTypeId" placeholder= "Booking Type" label= "Booking Type *" validate={["required"]}/>
                </div>
                <div className="col-md-6">
                  <Checkbox name= "isenable" label= "Enable"/>
                </div>
              </div>
          </Dialog>
        </MyForm>
        {/*End dialog for add new or edit bookingTypes*/}
      </div>
    );
  }
});
