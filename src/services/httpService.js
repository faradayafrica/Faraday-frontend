import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';
import {refreshJwt} from "./authService"
// import { configure } from '@testing-library/react';

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurrred.');
  }

  return Promise.reject(error);
});

const securedRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});  

securedRequest.interceptors.response.use(response => {
  return response;
}, function(error){
  console.log("Interceptor", error)
  if(error.status == "401") {
   window.location = "/logout";
  } else {
    return error;
  }
});

function setJwt(jwt) {
  securedRequest.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

const exportedObject = {
  get: securedRequest.get,
  post: securedRequest.post,
  put: securedRequest.put,
  patch: securedRequest.patch,
  delete: securedRequest.delete,
  setJwt,
};

export default exportedObject;
