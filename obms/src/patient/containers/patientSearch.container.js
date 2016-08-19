import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';

import * as actions from '../../redux/actions';
import MyForm from "../../common_uis/components/form.component";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import MyTable from "../../common_uis/components/table.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";
import PatientDetail from "./PatientDetail.container";


const log = (type) => console.log.bind(console, type);

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '1000px',
  maxHeight: '100%'

};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class PatientSearch extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props){
    super(props);
    this.state = {isOpenNewPatientDialog:false};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submitNewPatient(){
    console.log('_submitNewPatient company detail');
    //this.props.uploadPhotoDoctor(this.props.currentDoctor);
  }

  _onRowClick(row){
    console.log('clicked on row = ',row);
    this.props.setPatientForPatientSearch(row);
  }

  _search(){
    console.log('Search patient....');
    this.props.fetchPatientForPatientSearch(this.props.patientSearch.searchCriteria);
  }

  _newPatient(){
      this.setState({isOpenNewPatientDialog: true});
  }

  _closeNewPatientDialog(){
      this.setState({isOpenNewPatientDialog: false});
  }

  _createPatientCallback(patient){
    console.log('_createPatientCallback running and patient = ' ,patient);
    this.props.setPatientForPatientSearch(patient);
  }

  render() {
    const actions = [
          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._submitNewPatient}
          />,
          <FlatButton
            label="Close"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this._closeNewPatientDialog.bind(this)}
          />,
        ];

    var columns = [
                    {title:'Title',fieldName:'title'},
                    {title:'First name',fieldName:'firstName'},
                    {title:'Last name',fieldName:'lastName'},
                    {title:'DOB',fieldName:'dob'},
                    {title:'Phone',fieldName:'phone'},
                    {title:'Mobile',fieldName:'mobile'},
                    {title:'Email',fieldName:'email'},
                    {title:'Address',fieldName:'address'}
                  ];
    return (
      (
        <div>
           <MyForm
             update={this.props.updateFieldForPatientSearch}
             value={this.props.patientSearch.searchCriteria}
           >
             {/*Begin: Search criteria*/}
             <div className="row">
               <div className="col-md-4">
                <Text name="firstName" placeholder= "First name" label= "First name"/>
               </div>
               <div className="col-md-4">
                 <Text name="lastName" placeholder= "First name" label= "First name"/>
               </div>
               <div className="col-md-4">
                 <Text name= "gender" placeholder= "Gender" label= "Gender"/>
               </div>
             </div>
             <div className="row">
               <div className="col-md-4">
                 <Text name= "mobile" placeholder= "Mobile" label= "Mobile"/>
               </div>
               <div className="col-md-4">
                 <Text name= "phone" placeholder= "Phone" label= "Phone" />
               </div>
               <div className="col-md-4">
                 <Text name= "email" placeholder= "Email" label= "Email"validate={["email"]}/>
               </div>
             </div>
             <div className="row">
               <div className="col-md-8"></div>
               <div className="col-md-4">
                 <RaisedButton className="pull-right"  primary label="New Patient" onTouchTap={this._newPatient.bind(this)}/>
                 <span className="pull-right"  style={{margin: 10}}/>
                 <RaisedButton className="pull-right"  primary label="Search" onTouchTap={this._search.bind(this)}/>
               </div>
             </div>
             {/*End: Search criteria*/}
           </MyForm>
           {/*Begin: Search result*/}
           <MyTable columns={columns} data={this.props.patientSearch.patients} onRowClick={this._onRowClick.bind(this)}/>
           {/*End: Search result*/}
           {/*Begin: new patient*/}
           <Dialog
             title="New Patient"
             modal={false}
             open={this.state.isOpenNewPatientDialog}
             contentStyle={customContentStyle}
             autoScrollBodyContent={true}
             onRequestClose={this._closeNewPatientDialog.bind(this)}
           >
             <PatientDetail createPatientCallback={this._createPatientCallback.bind(this)}></PatientDetail>
           </Dialog>
           {/*End: mew patient*/}
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(PatientSearch);
