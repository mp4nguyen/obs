import React, { PropTypes } from 'react';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as _ from 'underscore';

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

  displayName: 'DoctorsChip',

  propTypes: {
    label: PropTypes.string,
    data: PropTypes.array,
    doctors: PropTypes.array,
    doctorSubModel: PropTypes.string,
    addNewDoctorCallBack: PropTypes.func,
    removeDoctorCallBack: PropTypes.func
  },

  getInitialState(){
    return {
            isOpenDialog: false,
            isNew: false,
            currentDoctor:{doctorId:null,isenable:null}
           };
  },

  shouldComponentUpdate(nextProps, nextState,nextContext){
      return !_.isEqual(nextProps.data,this.props.data)|| !_.isEqual(nextProps.doctors,this.props.doctors) || !_.isEqual(nextState,this.state);
  },

  _newDoctor(){
    this.setState({isNew:true,isOpenDialog:true,currentDoctor:{doctorId:null,fullName:null,isenable:null}});
  },

  _submit(fields){
    console.log('submit = ',this.state.currentDoctor);
    if(this.props.addNewDoctorCallBack){
      let doctor = this.props.doctors.find(c=>{
        return c.doctorId == this.state.currentDoctor.doctorId;
      });
      this.props.addNewDoctorCallBack(doctor);
    }
    this.setState({isOpenDialog:false,isNew:false});
  },

  _handleCloseModel(){
    this.setState({isOpenDialog:false});
  },

  _updateField(field){
      console.log('update field = ',field);
      this.setState({currentDoctor:Object.assign({},this.state.currentDoctor,field)});
  },

  _handleRequestDeleteChip(bt){
    console.log('doctorsChip._handleRequestDeleteChip  bt = ',bt);
    if(this.props.removeDoctorCallBack){
      this.props.removeDoctorCallBack(bt);
    }
  },

  _doctorOnChange(event, index, value, payload) {
    let o = {doctorId:value,isenable:1}
    this.setState({currentDoctor:o});
  },


  renderChip(data) {
    if(!this.props.data) return null;

    let chips = this.props.data.map((doctor,index)=>{
      return (
        <Chip
          key={index}
          onRequestDelete={() => this._handleRequestDeleteChip(doctor)}
          style={styles.chip}
        >
          {doctor.fullName}
        </Chip>
      );
    });

    return chips;
  },

  render() {
    //ONly allow to select the booking type that not in use
    let doctors = [];
    if(this.state.isNew && this.props.data){
      this.props.doctors.map(doctor=>{
        let findDoctor = this.props.data.find(data=>{
          return data.doctorId === doctor.doctorId;
        })
        if(!findDoctor){
          doctors.push(doctor);
        }
      });
    }else{
      doctors = this.props.doctors;
    }

    let items = [];
    let value = null;

    items = doctors.map((value,index)=>{
      return (<MenuItem key={index} value={value.doctorId} primaryText={value[this.props.doctorSubModel].firstName+' '+ value[this.props.doctorSubModel].lastName} />);
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
                                <a className="btn btn-circle grey-salsa btn-outline btn-sm" onClick={this._newDoctor}>
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
                      title="Add Doctor"
                      modal={false}
                      actions={actions}
                      open={this.state.isOpenDialog}
                      onRequestClose={this._handleCloseModel}
                    >
                        <div className="row">
                          <div className="col-md-6">
                            <SelectField
                              onChange={this._doctorOnChange}
                              value={this.state.currentDoctor.doctorId}
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
