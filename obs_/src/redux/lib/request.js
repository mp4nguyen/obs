import axios from 'axios';

import apiUrl from './url';

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
