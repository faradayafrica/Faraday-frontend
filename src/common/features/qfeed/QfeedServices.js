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

  static async fetchQuestion(ques_id) {
    const user = getCurrentUser();
    if (user?.username) {
      const resp = await http.get(apiRoutes.fetchQuestions + `${ques_id}/`);
      return resp.data;
    } else {
      const resp = await axios.get(apiRoutes.fetchQuestions + `${ques_id}/`);
      return resp.data;
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
    const { data } = await http.post(apiRoutes.vote + `${postid}/${value}/`);
    return data;
  }

  static async closeQuestion(postid) {
    const value = "markclosed";
    const { data } = await http.post(
      apiBase + `/qfeed/que/${postid}/${value}/`
    );
    return data;
  }

  // <--------------Comment Services starts here--------------->
  static async fetchQuestionComments(postid, pageParam) {
    const user = getCurrentUser();
    if (user?.username) {
      const data = await http.get(
        apiRoutes.fetchComments + `${postid}/?page=${pageParam}`
      );
      return data;
    } else {
      const data = await axios.get(
        apiRoutes.fetchComments + `${postid}/?page=${pageParam}`
      );
      return data;
    }
  }

  static async markSolution(postid, commentid) {
    const { data } = await http.post(
      apiBase + `/qfeed/que/marksolution/${postid}/${commentid}/`
    );
    return data;
  }

  static async deleteComment(ques_id, commentid) {
    const { data } = await http.delete(
      apiRoutes.deleteComment + `${ques_id}/${commentid}/`
    );
    return data;
  }

  static async createComment(postid, content) {
    const { data } = await http.post(apiRoutes.createcomment, {
      postid,
      content,
    });
    return data;
  }

  static async fetchSecondComments(commentid) {
    const user = getCurrentUser();
    if (user?.username) {
      const { data } = await http.get(
        apiBase + `/qfeed/comments/${commentid}/replies/` // || `qfeed/comments/reply/${commentid}/`
      );
      return data;
    } else {
      const { data } = await axios.get(
        apiBase + `/qfeed/comments/${commentid}/replies/`
      );
      return data;
    }
  }

  static async createSecondComments(commentid, content) {
    const { data } = await http.post(
      apiBase + `/qfeed/comments/reply/${commentid}/`,
      {
        content,
      }
    );
    return data;
  }

  static async fetchThirdComments(commentid) {
    const user = getCurrentUser();
    if (user?.username) {
      const { data } = await http.get(
        apiBase + `/qfeed/reply/${commentid}/replies/`
      );
      return data;
    } else {
      const { data } = await axios.get(
        apiBase + `/qfeed/reply/${commentid}/replies/`
      );
      return data;
    }
  }

  static async createThirdComments(commentid, content) {
    const { data } = await http.post(apiBase + `/qfeed/reply/${commentid}/`, {
      content,
    });
    return data;
  }

  static async deleteReply(replyid) {
    const { data } = await http.delete(
      apiRoutes.deleteComment + `reply/${replyid}/delete/`
    );
    return data;
  }
}
