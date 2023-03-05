import http from "../../common/services/httpService";
import axios from "axios";
import auth from "../../common/services/authService";

const apiEndpoint = process.env.REACT_APP_API_URL + "/users/register/";

export async function register(user) {
  let newUsername = user.username.toLowerCase();
  const { data } = await axios.post(apiEndpoint, {
    fname: user.fname,
    lname: user.lname,
    username: newUsername,
    email: user.email,
    password: user.password,
  });

  const jwt = data.data.access;
  localStorage.setItem(auth.tokenKey, jwt);
  localStorage.setItem("refresh", data.data.refresh);

  return data;
}
