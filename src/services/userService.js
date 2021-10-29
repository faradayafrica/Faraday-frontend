import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/users/register/';

export function register(user) {
  return http.post(apiEndpoint, {
    fname: user.fname,
    lname: user.lname,
    username: user.username,
    email: user.email,
    password: user.password,
  });
}
