import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + '/users/login/';
const tokenKey = "token"

export async function login({username, password}) {
  let newUsername = username.toLowerCase();
  const {data} =  await http.post(apiEndpoint, {username: newUsername, password});
  const jwt = data.access;
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwtDecode(jwt);
    
  }
  catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  tokenKey  
}