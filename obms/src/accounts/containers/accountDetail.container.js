import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../redux/actions/currentAccountAction';
import MyForm from "../../common_uis/components/form.component";
import Text from  "../../common_uis/components/text.component";
import Checkbox from  "../../common_uis/components/checkbox.component";
import Person from  "../../common_uis/components/person.component";
import SubmitButton from  "../../common_uis/components/submitButton.component";



const log = (type) => console.log.bind(console, type);

class AccountDetail extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  _submit(){
    console.log('submit account detail');
    this.props.saveCurrentAccount(this.props.currentCompany.companyId,this.props.currentAccount);
  }

  render() {
    let isNew = this.props.currentAccount.id ? false:true;
    return (
      (
        <div>
          <MyForm
            update={this.props.updateCurrentAccountFields}
            onSubmit={this._submit.bind(this)}
            value={this.props.currentAccount}
          >
            <Person personModel="Person" accountModel="Account" isAccount={true} isNew={isNew}/>
            <SubmitButton/>
          </MyForm>

        </div>
      )
    );
  }
}

function mapStateToProps(state){
	return {currentAccount:state.currentAccount,currentCompany:state.currentCompany};
}

export default connect(mapStateToProps,actions)(AccountDetail);
