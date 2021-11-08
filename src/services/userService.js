import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/users/register/';

export function register(user) {
  let newUsername = user.username.toLowerCase();
  return http.post(apiEndpoint, {
    fname: user.fname,
    lname: user.lname,
    username: newUsername,
    email: user.email,
    password: user.password,
  });
}
