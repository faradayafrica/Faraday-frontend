import http from "./httpService";
import auth from "./authService";

const apiEndpoint = process.env.REACT_APP_API_URL + "/users/register/";

export async function register(user) {
  let newUsername = user.username.toLowerCase();
  const { data } = await http.post(apiEndpoint, {
    fname: user.fname,
    lname: user.lname,
    username: newUsername,
    email: user.email,
    password: user.password,
  });

  const jwt = data.access;
  localStorage.setItem(auth.tokenKey, jwt);
}
