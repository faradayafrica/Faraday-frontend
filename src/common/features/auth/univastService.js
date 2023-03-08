import apiRoutes from "../../routes/apiRoutes";
import http from "../../services/httpService";
import axios from "axios";

export default class UnivastService {
  static async getSchools() {
    const response = await http.get(apiRoutes.getSchool, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
      },
    });
    if (response.response === false) {
      throw new Error("some error");
    }

    console.log(response.data);
    return response.data;
  }
}
