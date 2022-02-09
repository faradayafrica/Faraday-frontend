import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const apiEndpoint = apiUrl + '/users/login/';
const tokenKey = 'token';
const refreshKey = 'refresh';

http.setJwt(getJwt());

export async function login({ username, password }) {
  let newUsername = username.toLowerCase();
  const { data } = await http.post(apiEndpoint, {
    username: newUsername,
    password,
  });
  const jwt = data.access;
  const refresh = data.refresh;

  localStorage.setItem(tokenKey, jwt);
  localStorage.setItem(refreshKey, refresh);
}

export async function refreshJwt() {
  const refresh_token = getRefresh();
  const response = await http.post(
    'https://api.faraday.africa/v1/users/refresh_token/',
    {
      refresh: refresh_token,
    }
  );

  const jwt = response.data.access;
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
  // const jwt = getJwt();
  await axios.patch(url, {
    ...user,
  });
}

export async function editUserProfile(user) {
  const url = apiUrl + '/users/edu_update/';
  await axios.patch(url, {
    ...user,
  });
}

export async function updatePersonalDetail(data) {
  const url = apiUrl + '/users/bio_update/';

  await axios.patch(url, {
    ...data,
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
export function getRefresh() {
  try {
    return localStorage.getItem(refreshKey);
  } catch (ex) {
    return null;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  getRefresh,
  tokenKey,
  confirmEmail,
  resendEmailConfirmation,
  updateSchoolDetail,
  updatePersonalDetail,
  refreshJwt,
};
