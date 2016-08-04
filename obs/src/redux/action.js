export const LOAD_PRACTITIONER_FROM_SERVER = 'LOAD_PRACTITIONER_FROM_SERVER';
export const SELECT_PRACTITIONER = 'SELECT_PRACTITIONER';
export const LOAD_CLINICS_FROM_SERVER = 'LOAD_CLINICS_FROM_SERVER';

import axios from 'axios';

let actions = {
	addTodo: function(text){
		return {
			type: 'ADD_TODO',
			text: text
		}
	},

	completeTodo: function(id){
		return {
			type: 'COMPLETE_TODO',
			id: id
		}
	},

	deleteTodo: function(id){
		return {
			type: 'DELETE_TODO',
			id: id
		}
	},

	createNewUserId: function(){
		return {
			type: 'CREATE_USER_ID',
			id: Math.round(Math.random()*100)
		}
	},

	createNewUserIdIfOdd: function(){
		return (dispatch,getState) => {
			const {user} = getState();
			if(user.id % 2 === 0){
				return;
			}
			dispatch(actions.createNewUserId());
		}
	},	

	createNewUserIdAsync: function(){
		return (dispatch) => {

			setTimeout(() => {
				dispatch(actions.createNewUserId())
			},10000)
			
		}
	},

	loadPractitionerFromServer: function(){
		const request = axios.get('https://0.0.0.0:3001/api/BBookingTypes?filter[include]=Clinics');

		return {
			type: LOAD_PRACTITIONER_FROM_SERVER,
			payload: request
		}
	},

	selectPractitioner: function(practitioner){
		return {
			type: 'SELECT_PRACTITIONER',
			practitioner: practitioner
		}
	},

	loadClinicsFromServer: function(){
		const request = axios.get('https://0.0.0.0:3001/api/BClinics');

		return {
			type: LOAD_CLINICS_FROM_SERVER,
			payload: request
		}
	}		
}

export default actions;


