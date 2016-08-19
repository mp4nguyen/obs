import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/components/App';
import Login from './authentication/containers/login.container';
import RequireAuth from './authentication/containers/require_auth.container';
import Home from './home/components/home.component';
import CompanyList from './company/containers/companyList.container';
import CompanyDetail from './company/containers/companyDetail.container';
import ClinicList from './clinic/containers/clinicList.container';
import ClinicDetail from './clinic/containers/clinicDetail.container';
import DoctorList from './doctor/containers/doctorList.container';
import DoctorDetail from './doctor/containers/doctorDetail.container';
import Bookings from './booking/containers/bookings.container';

import MySchedulerWithRedux from './common_uis/example/MySchedulerWithRedux';

const  Greeting = () => {
	return <div>Greeting</div>;
};

const  About = () => {
	return <div>About</div>;
};

//<IndexRoute component={DoctorList}/>
export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login}/>
		<Route path="Home" component={RequireAuth(Home)}>
			<IndexRoute component={Bookings}/>
			<Route path="Bookings" component={Bookings} />
			<Route path="CompanyList" component={CompanyList} />
			<Route path="CompanyDetail" component={CompanyDetail} />
			<Route path="ClinicList" component={ClinicList} />
			<Route path="ClinicDetail" component={ClinicDetail} />
			<Route path="DoctorList" component={DoctorList} />
			<Route path="DoctorDetail" component={DoctorDetail} />
			<Route path="DoctorRoster" component={DoctorDetail} />
		</Route>
		<Route path="greet2" component={Greeting} />
		<Route path="greet3" component={Greeting} />
	</Route>
);
