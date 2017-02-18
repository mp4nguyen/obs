import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/components/App';
import Login from './authentication/containers/login.container';
import RequireAuth from './authentication/containers/require_auth.container';
import Home from './home/components/home.component';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home}/>
	</Route>
);
