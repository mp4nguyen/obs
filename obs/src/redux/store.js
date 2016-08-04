import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import multi from 'redux-multi';
import sagaMiddleware from 'redux-saga';
import socketIOMiddleware from './middlewares/socketIOMiddleware'
// Todo: add middleware
let finalCreateStore = compose(
	applyMiddleware(ReduxPromise,thunk,multi,logger(),socketIOMiddleware)
)(createStore);

let configureStore = function(initialState = {practitioners:[],currentPractitioner:{}}){
	return finalCreateStore(rootReducer,initialState);
}

export default configureStore;
