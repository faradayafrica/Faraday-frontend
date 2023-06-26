import apiRoutes from "../../routes/apiRoutes";
import http from "../../services/httpService";
import axios from "axios";
import { getCurrentUser } from "../../services/authService.js";

const apiBase = process.env.REACT_APP_API_URL;

export default class NotificationService {
  static async fetchNotifications(pageParam) {
    const resp = await http.get(apiBase + `/notifications/?page=${pageParam}`);
    return resp;
  }
}
