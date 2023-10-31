// inspired by https://leanpub.com/redux-book
import axios from "axios";
import {  apiError, apiStart, apiEnd  } from "../actions/api";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import qs from "querystring";

const baseUrl="http://localhost:5000/";



const tokenData={
  ClientId:"Client2",
  CustomerSecurityKey:"002",
  ApplicationSecurityKey:"Y2F0Y2hlciUyMHdvbmclMjBsb3ZlJTIwLm5ldA=="
}
axios.defaults.headers.common["Content-Type"] = "application/json";

 
// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest =>  axios.post(`${baseUrl}token`,qs.stringify(tokenData)).then(tokenRefreshResponse => {
  
    localStorage.setItem('AuthToken', tokenRefreshResponse.data);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data;
    return Promise.resolve();
});


 
// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

function getAuthToken(){
  return localStorage.getItem('AuthToken');
}
axios.defaults.headers.common = {
  "Content-Type": "application/json"
}
axios.interceptors.request.use(request => {
  
  request.headers['Authorization'] = 'Bearer '+getAuthToken();
  return request;
});

const apiMiddleware = ({ dispatch }) => next => action => {
  
  next(action);

  if (action.type !== "API") return;

  const {
    path,
    method,
    data,
    onSuccess,
    onFailure,
    currentAction,
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
 const endPointUrl= `${baseUrl}${path}`;
  

  
    dispatch(apiStart());
  
    dispatch(currentAction());

  axios
    .request({
      url:endPointUrl,
      method,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));

      
    })
    .finally(() => {
      
        dispatch(apiEnd());
      
    });
};

export default apiMiddleware;
