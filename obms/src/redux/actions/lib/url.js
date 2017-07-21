let baseUrl = 'https://localhost:3000/api';
//let goBaseUrl = 'http://localhost:8000/api/v1';
let goBaseUrl = 'https://medicalbookings.redimed.com.au:8009/api/v1';


export  function apiUrl(url){
  return baseUrl + url;
}


export  function goApiUrl(url){
  return goBaseUrl + url;
}
