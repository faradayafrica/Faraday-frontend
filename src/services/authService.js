import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/users/login/';

export function login({username, password}) {
    return http.post(apiEndpoint, {username, password});
  }