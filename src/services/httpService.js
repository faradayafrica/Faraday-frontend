import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';
import { configure } from '@testing-library/react';

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

function setJwt(jwt) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
