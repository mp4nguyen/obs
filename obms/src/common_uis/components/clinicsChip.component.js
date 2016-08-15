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

  displayName: 'ClinicsChip',

  propTypes: {
    label: PropTypes.string,
    data: PropTypes.array.isRequired,
    clinics: PropTypes.array.isRequired,
    addNewClinicCallBack: PropTypes.func,
    removeClinicCallBack: PropTypes.func
  },

  getInitialState(){
    return {
            isOpenDialog: false,
            isNew: false,
            currentClinic:{clinicId:null,isenable:null}
           };
  },


  _newClinic(){
    this.setState({isNew:true,isOpenDialog:true,currentClinic:{clinicId:null,clinicName:null,isenable:null}});
  },

  _submit(fields){
    console.log('submit = ',this.state.currentClinic);
    if(this.props.addNewClinicCallBack){
      let clinic = this.props.clinics.find(c=>{
        return c.clinicId == this.state.currentClinic.clinicId;
      });
      this.props.addNewClinicCallBack(clinic);
    }
    this.setState({isOpenDialog:false,isNew:false});
  },

  _handleCloseModel(){
    this.setState({isOpenDialog:false});
  },

  _updateField(field){
      console.log('update field = ',field);
      this.setState({currentClinic:Object.assign({},this.state.currentClinic,field)});
  },

  _handleRequestDeleteChip(bt){
    console.log('delete bt = ',bt);
    if(this.props.removeClinicCallBack){
      this.props.removeClinicCallBack(bt);
    }
  },

  _clinicOnChange(event, index, value, payload) {
    let o = {clinicId:value,isenable:1}
    this.setState({currentClinic:o});
  },


  renderChip(data) {
    if(!this.props.data) return null;

    let chips = this.props.data.map((clinic,index)=>{
      return (
        <Chip
          key={index}
          onRequestDelete={() => this._handleRequestDeleteChip(clinic)}
          style={styles.chip}
        >
          {clinic.clinicName}
        </Chip>
      );
    });

    return chips;
  },

  render() {
    //ONly allow to select the booking type that not in use
    let clinics = [];
    if(this.state.isNew && this.props.data){
      this.props.clinics.map(clinic=>{
        let findClinic = this.props.data.find(data=>{
          return data.clinicId === clinic.clinicId;
        })
        if(!findClinic){
          clinics.push(clinic);
        }
      });
    }else{
      clinics = this.props.clinics;
    }

    let items = [];
    let value = null;

    items = clinics.map((value,index)=>{
      return (<MenuItem key={index} value={value.clinicId} primaryText={value.clinicName} />);
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
                                <a className="btn btn-circle grey-salsa btn-outline btn-sm" onClick={this._newClinic}>
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
                      title="Add Clinic"
                      modal={false}
                      actions={actions}
                      open={this.state.isOpenDialog}
                      onRequestClose={this._handleCloseModel}
                    >
                        <div className="row">
                          <div className="col-md-6">
                            <SelectField
                              onChange={this._clinicOnChange}
                              value={this.state.currentClinic.clinicId}
                              floatingLabelText="Clinic"
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
