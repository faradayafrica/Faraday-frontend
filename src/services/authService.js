import http from "./httpService";
import jwtDecode from "jwt-decode";
import axios from "axios"

const apiEndpoint = process.env.REACT_APP_API_URL + "/users/login/";
const tokenKey = "token";
const refreshKey = "refresh";

http.setJwt(getJwt());

export async function login({ username, password }) {
  let newUsername = username.toLowerCase();
  const { data } = await axios.post(apiEndpoint, {
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
  await axios.post(
    `${process.env.REACT_APP_API_URL + "/users/refresh_token/"}`,
    {
      refresh: refresh_token,
    }
    ).then(resp => {
      const jwt = resp.data.access;
      localStorage.setItem(tokenKey, jwt)
    });
    
  
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return { email_verified: null };
  }
}
export async function confirmEmail({ confirmationCode }) {
  const user = getCurrentUser();
  //  http.setJwt(getJwt());

  const url = process.env.REACT_APP_API_URL + "/users/verifyotp/";
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` }
};

  await axios.post(url, {
    email: user.email,
    otp: confirmationCode,
  }, config);
}

export async function updateSchoolDetail(user) {
  console.log(user, "School details oo")
  const url = process.env.REACT_APP_API_URL + "/users/edu_update/";
  // const jwt = getJwt();

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` }
  };

  await axios.patch(url, {
    ...user,
  }, config);
}

export async function editUserProfile(user) {
  const url = process.env.REACT_APP_API_URL + "/users/edu_update/";

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` }
  };

  await axios.patch(url, {
    ...user,
  }, config);
}

export async function updatePersonalDetail(data) {
  const url = process.env.REACT_APP_API_URL + "/users/bio_update/";

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` }
  };

  await axios.patch(url, data, config);
}

export async function resendEmailConfirmation() {
  const user = getCurrentUser();
 const {email} = user

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` }
};

  const url = process.env.REACT_APP_API_URL + "/users/resendotp/";

  await axios.post(url, {email}, config);

}

//Confirm password http call starts here
export async function forgotPassword({ username }) {
  const apiEndpoint = process.env.REACT_APP_API_URL + "/users/password/reset/";
  let newUsername = username.toLowerCase();
  await axios.post(apiEndpoint, {
    email: newUsername
  });
}
//Confirm password http call ends here

export function logout() {
  window.localStorage.clear();
  
}


export function getJwt() {
  return localStorage.getItem(tokenKey);
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
  forgotPassword,
  refreshJwt,
};
