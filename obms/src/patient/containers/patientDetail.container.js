import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../redux/actions';
import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";

import Person from  "../../common_uis/components/person.component";

const log = (type) => console.log.bind(console, type);

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};


class PatientDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  static propTypes = {
      createPatientCallback: React.PropTypes.func
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _save(){
    console.log('submit company detail');
    this.props.createPatient(this.props.patientDetail,this.props.createPatientCallback);
    //this.props.uploadPhotoDoctor(this.props.currentDoctor);
  }


  render() {

    return (
      (
        <div>
           <MyForm
             update={this.props.updateFieldForPatientDetail}
             onSubmit={this._save.bind(this)}
             value={this.props.patientDetail}
           >
             {/*Begin: Personal Information*/}
             <Person isNoAvatar={true}/>
             <div className="row">
               <div className="col-md-8"></div>
               <div className="col-md-4">
                 <SubmitButton className="pull-right" label="Save"/>
               </div>
             </div>
             {/*Begin: Personal Information*/}
           </MyForm>
        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return state;
}

export default connect(mapStateToProps,actions)(PatientDetail);
