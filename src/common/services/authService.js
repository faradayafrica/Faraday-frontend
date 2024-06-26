import http from "./httpService";
import jwtDecode from "jwt-decode";
import axios from "axios";

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
  console.log(refresh_token);
  await axios
    .post(`${process.env.REACT_APP_API_URL + "/users/refresh_token/"}`, {
      refresh: refresh_token,
    })
    .then((resp) => {
      const jwt = resp.data.access;
      localStorage.setItem(tokenKey, jwt);
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
// another way to get the current user
// export async function getCurrentUser() {
//   try {
//     const jwt = localStorage.getItem(tokenKey);
//     if (!jwt) return null;

//     const url = "https://faradayapi-staging.azurewebsites.net/v1/users/me/"
//     const { data } = await axios.get(url, {
//       headers: { Authorization: `Bearer ${jwt}` },
//     });

//     return data;
//   } catch (ex) {
//     console.error("Error fetching current user:", ex);
//     return null;
//   }
// }

export async function updateSchoolDetail(user) {
  const url = process.env.REACT_APP_API_URL + "/users/edu_update/";

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };

  await axios.patch(
    url,
    {
      ...user,
    },
    config
  );
}

export async function updateUserInterests(followedInterests) {
  const updatedInterests = followedInterests.map((interest) => ({
    name: interest,
  }));
  console.log(updatedInterests);
  const url =
    process.env.REACT_APP_API_URL + "/users/profile_update/interests/";
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };
  await axios.patch(url, updatedInterests, config);
}

// function to fetch the recommended user to follow
export async function fetchRecommendedUsers() {
  const url = process.env.REACT_APP_API_URL + "/users/recommended/";
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };
  const { data } = await axios.get(url, config);
  console.log(data);
  return data;
}

// function to follow a user
export async function followUser(userId, username) {
  const url = `${process.env.REACT_APP_API_URL}/users/${username}/follow/`;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };
  await axios.post(url, userId, config);
}

export async function editUserProfile(user) {
  const url = process.env.REACT_APP_API_URL + "/users/edu_update/";

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };

  await axios.patch(
    url,
    {
      ...user,
    },
    config
  );
}

export async function updatePersonalDetail(data) {
  const url = process.env.REACT_APP_API_URL + "/users/bio_update/";

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };

  await axios.patch(url, data, config);
}

export async function confirmEmail({ confirmationCode }) {
  const user = getCurrentUser();
  //  http.setJwt(getJwt());

  const url = process.env.REACT_APP_API_URL + "/users/verifyotp/";
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };

  await axios.post(
    url,
    {
      email: user.email,
      otp: confirmationCode,
    },
    config
  );
}

export async function resendEmailConfirmation() {
  const user = getCurrentUser();
  const { email } = user;

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(tokenKey)}` },
  };

  const url = process.env.REACT_APP_API_URL + "/users/resendotp/";

  await axios.post(url, { email }, config);
}

//Recover password by email http call starts here
//STEP 1
export async function forgotPassword({ email }) {
  const apiEndpoint = process.env.REACT_APP_API_URL + "/users/password/reset/";
  let newEmail = email.toLowerCase();
  await axios.post(apiEndpoint, {
    email: newEmail,
  });
}

//STEP 2
export async function confirmAccount({ email, confirmationCode }) {
  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/users/password/reset/confirm/";

  await axios.post(apiEndpoint, {
    email,
    otp_code: confirmationCode,
  });
}

//STEP 3
export async function resetPassword({ email, new_password, confirm_password }) {
  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/users/password/reset/complete/";

  await axios.post(apiEndpoint, {
    email,
    new_password,
    confirm_password,
  });
}
//Recover password by email http call ends here

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

export function isLoggedIn() {
  const jwt = localStorage.getItem(tokenKey);
  return jwt !== null && jwt !== undefined;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  tokenKey,
  getJwt,
  refreshJwt,
  getRefresh,
  getCurrentUser,
  isLoggedIn,

  login,
  logout,
  confirmEmail,
  resendEmailConfirmation,
  updateSchoolDetail,
  updatePersonalDetail,
  updateUserInterests,
  fetchRecommendedUsers,
  followUser,

  forgotPassword,
  confirmAccount,
  resetPassword,
};
