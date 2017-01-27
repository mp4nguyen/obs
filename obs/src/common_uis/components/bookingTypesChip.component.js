import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

var styles = {
     chip: {
       margin: 4,
     },
     wrapper: {
       display: 'flex',
       flexWrap: 'wrap',
     },
   };

export default React.createClass({

  displayName: 'BookingTypesChip',

  propTypes: {
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    bookingTypes: PropTypes.array.isRequired,
    addNewBookingTypeCallBack: PropTypes.func,
    removeBookingTypeCallBack: PropTypes.func
  },

  getInitialState(){
    return {
            isOpenDialog: false,
            isNew: false,
            currentBookingType:{bookingTypeId:null,isenable:null}
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
    if(this.props.addNewBookingTypeCallBack){
      let bt = this.props.bookingTypes.find(bt=>{
        return bt.bookingTypeId == this.state.currentBookingType.bookingTypeId;
      });
      this.props.addNewBookingTypeCallBack(bt);
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

  _handleRequestDeleteChip(bt){
    console.log('delete bt = ',bt);
    if(this.props.removeBookingTypeCallBack){
      this.props.removeBookingTypeCallBack(bt);
    }
  },

  _bookingTypeOnChange(event, index, value, payload) {
    let o = {bookingTypeId:value,isenable:1}
    this.setState({currentBookingType:o});
  },


  renderChip(data) {
    if(!this.props.data) return null;

    let chips = this.props.data.map((bt,index)=>{
      return (
        <Chip
          key={index}
          onRequestDelete={() => this._handleRequestDeleteChip(bt)}
          style={styles.chip}
        >
          {bt.bookingTypeName}
        </Chip>
      );
    });
    console.log('---------->chips = ',chips);
    return chips;
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

    let items = [];
    let value = null;
    items = bookingTypes.map((value,index)=>{
      return (<MenuItem key={index} value={value.bookingTypeId} primaryText={value.bookingTypeName} />);
    });


    const actions = [
          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._submit}
          />,
          <FlatButton
            label="Close"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._handleCloseModel}
          />,
        ];


    return (
            <div>
                <div className="portlet light bordered">
                    <div className="portlet-title">
                        <div className="caption">
                            <span className="caption-subject font-red bold uppercase">{this.props.label}</span>
                        </div>
                        <div className="actions">
                            <div className="actions">
                                <a className="btn btn-circle grey-salsa btn-outline btn-sm" onClick={this._newBookingType}>
                                    <i className="fa fa-plus"></i> Add </a>
                            </div>
                        </div>
                    </div>
                    <div className="portlet-body todo-project-list-content todo-project-list-content-tags" style={{height: 'auto'}}>
                      <div style={styles.wrapper}>
                        {this.renderChip()}
                      </div>
                    </div>
                </div>
                {/*Begin dialog for add new or edit bookingTypes

                  */}
                    <Dialog
                      title="Define Rosters"
                      modal={false}
                      actions={actions}
                      open={this.state.isOpenDialog}
                      onRequestClose={this._handleCloseModel}
                    >
                        <div className="row">
                          <div className="col-md-6">
                            <SelectField
                              onChange={this._bookingTypeOnChange}
                              value={this.state.currentBookingType.bookingTypeId}
                              floatingLabelText="Booking Type"
                            >
                              {items}
                            </SelectField>
                          </div>
                        </div>
                    </Dialog>
                {/*End dialog for add new or edit bookingTypes*/}
            </div>
          );
  }
});
