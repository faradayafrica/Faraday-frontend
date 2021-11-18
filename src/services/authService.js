import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const apiEndpoint = apiUrl + '/users/login/';
const tokenKey = 'token';

http.setJwt(getJwt());

// axios.interceptors.request.use(
//   config => {
//     const jwt = getJwt();
//     config.headers.authorization = `Bearer ${jwt}`;
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

export async function login({ username, password }) {
  let newUsername = username.toLowerCase();
  const { data } = await http.post(apiEndpoint, {
    username: newUsername,
    password,
  });
  const jwt = data.access;

  localStorage.setItem(tokenKey, jwt);
}

export async function confirmEmail({ confirmationCode }) {
  const user = getCurrentUser();

  const url = apiUrl + '/users/verifyotp/';
  await http.post(url, {
    email: user.email,
    otp: confirmationCode,
  });
}
export async function updateSchoolDetail(user) {
  const url = apiUrl + '/users/edu_update/';
  const jwt = getJwt();
  await axios.patch(url, {
    ...user,
    // headers: {
    //   Authorization: `Bearer ${jwt}`,
    //   'Content-Type': 'application/json',
    // },
  });
}

export async function resendEmailConfirmation() {
  const user = getCurrentUser();

  const url = apiUrl + '/users/resendotp/';
  await http.post(url, {
    email: user.email,
  });
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return { email_verified: null };
  }
}

export function getJwt() {
  try {
    return localStorage.getItem(tokenKey);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  tokenKey,
  confirmEmail,
  resendEmailConfirmation,
  updateSchoolDetail,
};
