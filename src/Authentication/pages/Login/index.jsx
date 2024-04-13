import React from "react";
import { Redirect, Link } from "react-router-dom";
import Myspinner from "../../../common/components/Spinner";
import Form from "../../components/Form";
import Joi from "joi-browser";
import auth from "../../../common/services/authService";
import faraday from "../../../common/assets/logo.svg";

class LoginPage extends Form {
  componentDidMount() {
    if (this.props.clearCache === true) window.location.reload(true);
  }

  state = {
    data: { username: "", password: "" },
    redirect: null,
    errors: {},
    showPassword: false,
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label("Username"),
    password: Joi.string().min(8).required().label("Password"),
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="login-page">
        {/* the spinner */}
        <div id="spinnerContainer" className="spinner-container vanish">
          <Myspinner />
        </div>
        <div className="form-container">
          <div className="logo-container ">
            <img className="logo mx-auto" src={faraday} alt="faraday" />
          </div>
          <h3 className="form-title">Welcome back</h3>{" "}
          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput("username", "Username or Email")}
            {this.renderPassword(
              "password",
              "Password",
              this.state.showPassword ? "" : "password"
            )}
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              <p
                className="text-sm mt-2 mb-0 text-night-secondary"
                style={{ textAlign: "right" }}
              >
                Forgot your password?
              </p>
            </Link>
            {this.renderButton("Login")}
            {this.renderRedirectBtn(
              "Create an account",
              "signup",
              "New to Faraday?"
            )}
          </form>
        </div>
      </div>
    );
  }

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    // This is to get the Query Parameter
    const currentPage = window.location.pathname.substring(1);

    let redirectUrl = currentPage;

    // call the backend
    try {
      const { data } = this.state;
      await auth.login(data);
      spinner.classList.add("vanish");

      window.location = redirectUrl ?? "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.username = "Internal error, please try again";
        this.setState({ errors });
        spinner.classList.add("vanish");
      } else if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        if (ex.response.data.detail.includes("password")) {
          errors.password = ex.response.data.detail;
        } else {
          errors.username = ex.response.data.detail;
        }
        this.setState({ errors });
        spinner.classList.add("vanish");
      } else {
        const errors = { ...this.state.errors };
        errors.username = "Something went wrong, please try again";
        this.setState({ errors });
        spinner.classList.add("vanish");
      }
    }
  };
}

export default LoginPage;
