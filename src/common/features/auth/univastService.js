import apiRoutes from "../../routes/apiRoutes";
import http from "../../services/httpService";
import axios from "axios";

export default class UnivastService {
  static async getCountries() {
    const response = await http.get(apiRoutes.getCountries, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
      },
    });
    if (response.response === false) {
      throw new Error("some error");
    }
    return response.data;
  }

  static async getSchools(countryid) {
    const response = await http.get(apiRoutes.getSchool + countryid, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Api-Key ${process.env.REACT_APP_UNIVAST_KEY}`,
      },
    });
    if (response.response === false) {
      throw new Error("some error");
    }

    return response.data;
  }
}
