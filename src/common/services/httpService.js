import axios from "axios";
import logger from "../../services/logService";
import { toast } from "react-toastify";
import { refreshJwt } from "./authService";
// import { configure } from '@testing-library/react';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

const securedRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

securedRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log("Interceptor", error.response.status)
    if (error.response.status == "401") {
      window.location = "/logout";
    } else {
      // console.log("Interceptor", error)
      return Promise.reject(error);
    }
  }
);

function setJwt(jwt) {
  securedRequest.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
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
