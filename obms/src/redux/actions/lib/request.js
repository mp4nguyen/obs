import axios from 'axios';

import {apiUrl,goApiUrl} from './url';

var lpAccessToken = "";

export function setAccessToken(accessToken){
  lpAccessToken = accessToken;
}

export function postRequest(url,data,params){
  var accessToken = localStorage.getItem('AccessToken');
  return axios.post(apiUrl(url),data,{headers:{Authorization:lpAccessToken},params});
}

export function getRequest(url,data,params){
  var accessToken = localStorage.getItem('AccessToken');
  return axios.get(apiUrl(url),{headers:{Authorization:lpAccessToken},params});
}



//////////////////////////////////////////////////////////////

var goInstance = axios.create({
  baseURL:goApiUrl(""),
});

export const setToken = (token) => {
  //accessToken = token;
  goInstance.defaults.headers.common['accessToken'] = token;
};

export const goPostRequest = (url, data, options = {}) => goInstance.post(url, data, options);

export const goGetRequest = (url, params, options = {}) => goInstance.get(url, params, options);
