import Perf from 'react-addons-perf'
window.Perf = Perf;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from "react-router";

import ReduxToastr from 'react-redux-toastr'
import injectTapEventPlugin from 'react-tap-event-plugin';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';


import routes from './routes';
import reducers from './redux/reducers';

import MySchedulerExample from './common_uis/example/myscheduler';
import MySchedulerWithRedux from './common_uis/example/MySchedulerWithRedux';
import PatientSearchExample from './common_uis/example/PatientSearchExample';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise,thunk)(createStore);

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


//tam thoi stop running

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStoreWithMiddleware(reducers)}>
      <div>
        <Router history={browserHistory} routes={routes}>
        </Router>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
        />
      </div>
    </Provider>
  </MuiThemeProvider>
  , document.querySelector('.main-app'));



// ReactDOM.render(
//     <MuiThemeProvider muiTheme={muiTheme}>
//       <Provider store={createStoreWithMiddleware(reducers)}>
//         <PatientSearchExample/>
//       </Provider>
//     </MuiThemeProvider>
//     , document.querySelector('.main-app'));

//testing with calendar
// ReactDOM.render(
//     <MuiThemeProvider muiTheme={muiTheme}>
//       <Provider store={createStoreWithMiddleware(reducers)}>
//         <MySchedulerWithRedux/>
//       </Provider>
//     </MuiThemeProvider>
//     , document.querySelector('.main-app'));

/*
  observe(function(knightPosition){
    ReactDOM.render(<div style={{width:'500px',height:'500px',boder:'1px solid gray'}}>
              <Board knightPosition={knightPosition} />
            </div>
      , document.querySelector('.main-app'));
  });

  */
