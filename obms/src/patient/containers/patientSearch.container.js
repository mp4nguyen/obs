import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {HotKeys} from 'react-hotkeys';


import {fetchPatientForPatientSearch,updateFieldForPatientSearch,setPatientForPatientSearch} from '../../redux/actions/patientSearchAction';
import MyForm from "../../common_uis/components/form.component";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import MyTable from "../../common_uis/components/table.component";
import MaterialTable from "../../common_uis/components/materialTable.component";
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

const keyMap = {
    'searchPatient': 'ctrl+f',
    'newPatient': 'ctrl+n'
};

class PatientSearch extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
    onPatientSelected: React.PropTypes.func,
    onPatientCreated: React.PropTypes.func
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
    console.log('clicked on row = ',row,this.props.patients[row[0]]);
    this.props.setPatientForPatientSearch(this.props.patients[row[0]]);
    if(this.props.onPatientSelected){
      this.props.onPatientSelected(this.props.patients[row[0]]);
    }
  }

  _search(){
    console.log('Search patient....');
    this.props.fetchPatientForPatientSearch(this.props.searchCriteria);
  }

  _newPatient(){
      this.setState({isOpenNewPatientDialog: true});
  }

  _closeNewPatientDialog(){
      this.setState({isOpenNewPatientDialog: false});
  }

  _createdPatientCallback(patient){
    console.log('_createPatientCallback running and patient = ' ,patient);
    this.props.setPatientForPatientSearch(patient);
    this.setState({isOpenNewPatientDialog: false});
    if(this.props.onPatientCreated){
      this.props.onPatientCreated(patient);
    }
  }


  render() {
    console.log('patientSearch.render() is running ...................');
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

    const handlers = {
        'searchPatient': this._search.bind(this),
        'newPatient': this._newPatient.bind(this)
      };

    var columns = [
                    {title:'First name',fieldName:'firstName'},
                    {title:'Last name',fieldName:'lastName'},
                    {title:'DOB',fieldName:'dob',dateformat:'DD/MM/YYYY'},
                    {title:'Mobile',fieldName:'mobile'},
                    {title:'Email',fieldName:'email'},
                    {title:'Address',fieldName:'address'}
                  ];
    return (
      (

          <div>
             <MyForm
               update={this.props.updateFieldForPatientSearch}
               value={this.props.searchCriteria}
               onSubmit={()=>{ this._search() }}
             >
               {/*Begin: Search criteria*/}
               <div className="row">
                 <div className="col-md-3">
                  <Text isFocus={true} name="firstName" placeholder= "First name" label= "First name"/>
                 </div>
                 <div className="col-md-3">
                   <Text name="lastName" placeholder= "First name" label= "First name"/>
                 </div>
                 <div className="col-md-3">
                   <Text name= "mobile" placeholder= "Mobile" label= "Mobile"/>
                 </div>
                 <div className="col-md-3">
                   <Text name= "email" placeholder= "Email" label= "Email" />
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
             <MaterialTable columns={columns} data={this.props.patients} onRowClick={this._onRowClick.bind(this)}/>
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
               <PatientDetail createPatientCallback={this._createdPatientCallback.bind(this)}></PatientDetail>
             </Dialog>
             {/*End: mew patient*/}
          </div>

      )
    );
  }
}


function bindAction(dispatch) {
  return {
    fetchPatientForPatientSearch: () => dispatch(fetchPatientForPatientSearch()),
    updateFieldForPatientSearch: (data) => dispatch(updateFieldForPatientSearch(data)),
    setPatientForPatientSearch: (data) => dispatch(setPatientForPatientSearch(data)),
  };
}

function mapStateToProps(state){
	return state.patientSearch;
}

export default connect(mapStateToProps,bindAction)(PatientSearch);
