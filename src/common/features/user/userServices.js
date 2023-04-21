import apiRoutes from "../../routes/apiRoutes";
import http from "../../services/httpService";
// import axios from "axios";
// import { getCurrentUser } from "../../services/authService.js";

const apiBase = process.env.REACT_APP_API_URL;

export default class UserService {
  static async fetchUserQuestions(username, pageParam) {
    const resp = await http.get(
      apiBase + `/users/${username}/ques/?page=${pageParam}`
    ); // Add pagination
    return resp;
  }

  static async fetchUserSolutions(username, pageParam) {
    const resp = await http.get(
      apiBase + `/users/${username}/solutions/?page=${pageParam}`
    );
    return resp;
  }

  static async fetchUserBookmarks(pageParam) {
    const resp = await http.get(apiRoutes.userBookmarks + `?page=${pageParam}`);
    return resp;
  }

  static async fetchUserProfile(username) {
    const { data } = await http.get(apiBase + `/users/${username}/`);
    return data;
  }
}
