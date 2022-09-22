import { Component } from "react";
import { SuccessToast } from "../components/common/CustomToast";
import auth from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    window.localStorage.clear();

    auth.logout();
    window.location = "/login";
  }

  render() {
    return null;
  }
}

export default Logout;
