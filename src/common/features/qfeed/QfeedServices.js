import apiRoutes from "../../routes/apiRoutes";
import http from "../../services/httpService";
import axios from "axios";
import { getCurrentUser } from "../../services/authService.js";

const apiBase = process.env.REACT_APP_API_URL;

export default class QService {
  static async fetchQuestions(pageParam) {
    const user = getCurrentUser();
    if (user?.username) {
      const resp = await http.get(
        apiRoutes.fetchQuestions + `?page=${pageParam}`
      );
      return resp;
    } else {
      const resp = await axios.get(
        apiRoutes.fetchQuestions + `?page=${pageParam}`
      );
      return resp;
    }
  }

  static async followUser(username) {
    const { data } = await http.post(apiBase + `/users/${username}/follow/`);
    return data;
  }

  static async createQuestion(title, content) {
    const { data } = await http.post(apiRoutes.postQuestion, {
      title,
      content,
    });
    return data;
  }

  static async deleteQuestion(ques_id) {
    const { data } = await http.delete(
      apiRoutes.deleteQuestion + `${ques_id}/`
    );
    return data;
  }

  static async voteQuestion(postid, value) {
    const { data } = await http.post(apiRoutes.vote, {
      postid,
      value,
    });
    return data;
  }
}
