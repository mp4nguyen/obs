import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {saveCurrentCompany,updateCurrentCompanyFields} from '../../redux/actions/companyAction';
import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Address from  "../../common_uis/components/address.component";
import UploadPhoto from  "../../common_uis/components/uploadPhoto.component";
import DropZonePhoto from  "../../common_uis/components/dropZonePhoto.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";


const log = (type) => console.log.bind(console, type);

class CompanyDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit company detail');
    this.props.saveCurrentCompany();
  }

  render() {

    return (
      (
        <div>
          <MyForm
            update={this.props.updateCurrentCompanyFields}
            onSubmit={this._submit.bind(this)}
            value={this.props.currentCompany}
          >
            <div className="row">
              <div className="col-md-9">
                <Text name= "companyName" placeholder= "Company name" label= "Company name *"validate={["required"]}/>
              </div>
              <div className="col-md-3">
                <Checkbox name= "isEnable" label= "Enable"/>
              </div>
            </div>
            <Address/>
            <Text name= "description" placeholder= "Description" label= "Description" multiLine={true} rows={2}/>
            <Text name= "policy" placeholder= "Policy" label= "Policy" multiLine={true} rows={2}/>
            <Text name= "conditionToBook" placeholder= "Condition to book" label= "Condition to book" multiLine={true} rows={2}/>
            <div className="row">
              <div className="col-md-3">
                <div>Icon</div>
              </div>
              <div className="col-md-3">
                <UploadPhoto  name="iconBase64" photoData="iconBase64"/>
              </div>
            </div>
            <SubmitButton/>
          </MyForm>

        </div>
      )
    );
  }
}

function bindAction(dispatch) {
  return {
    saveCurrentCompany: () => dispatch(saveCurrentCompany()),
    updateCurrentCompanyFields: (data) => dispatch(updateCurrentCompanyFields(data)),

  };
}

function mapStateToProps(state){
	return {currentCompany: state.currentCompany.company};
}

export default connect(mapStateToProps,bindAction)(CompanyDetail);
