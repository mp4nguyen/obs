import axios from 'axios';

import * as types from './types';

export function setCurrentClinic(currentClinic){
    return{
      type: types.SET_CURRENT_CLINIC,
      currentClinic
    }
};

export function	updateCurrentClinicFields(currentClinic){
	return {
		type: types.UPDATE_CURRENT_CLINIC_FIELDS,
		currentClinic
	}
};
