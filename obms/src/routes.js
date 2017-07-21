import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/components/App';
import Login from './authentication/containers/login.container';
import RequireAuth from './authentication/containers/require_auth.container';
import Home from './home/components/home.component';
import CompanyList from './company/containers/companyList.container';
import Company from './company/components/company.component';
import ClinicList from './clinic/containers/clinicList.container';
import ClinicDetail from './clinic/containers/clinicDetail.container';
import DoctorList from './doctor/containers/doctorList.container';
import Doctor from './doctor/components/doctor.component';
import Bookings from './booking/containers/bookings.container';
import AccountDetail from './accounts/containers/accountDetail.container';
import BookingTypeList from './bookingTypes/containers/bookingTypeList.container';
import BookingTypeDetail from './bookingTypes/containers/bookingTypeDetail.container';
import WebRTC from './webrtc/components/webrtc.component';

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
			<IndexRoute component={RequireAuth(ClinicList)}/>
			<Route path="Bookings" component={Bookings} />
			<Route path="CompanyList" component={CompanyList} />
			<Route path="Company" component={Company} />
			<Route path="ClinicList" component={ClinicList} />
			<Route path="ClinicDetail" component={ClinicDetail} />
			<Route path="DoctorList" component={DoctorList} />
			<Route path="Doctor" component={Doctor} />
			<Route path="DoctorRoster" component={Doctor} />
			<Route path="Account" component={AccountDetail} />
			<Route path="BookingTypeList" component={BookingTypeList} />
			<Route path="BookingTypeDetail" component={BookingTypeDetail} />
			<Route path="WebRTC" component={WebRTC} />
		</Route>
		<Route path="greet2" component={Greeting} />
		<Route path="greet3" component={Greeting} />
	</Route>
);
