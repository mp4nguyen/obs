import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from "react-router";

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import multi from 'redux-multi';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

import routes from './routes';
import reducers from './redux/reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise,multi,logger(),thunk)(createStore);

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={routes}>
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.main-app'));
