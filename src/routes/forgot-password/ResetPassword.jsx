import React from "react";
import { Redirect, Link } from "react-router-dom";
import Myspinner from "../../components/styledComponents/Spinner";
import Form from "../../components/common/Form";
import Joi from "joi-browser";
import auth from "../../services/authService";
import faraday from "../../images/logo.svg";

class ResetPassword extends Form {
  componentDidMount() {
    // console.log("props", this.props);
    if (this.props.clearCache == true) window.location.reload(true);
  }

  state = {
    data: { password: "" },
    redirect: null,
    errors: {},
    showPassword: false,
  };

  schema = {
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
          <h3 className="form-title">Enter a new password</h3>{" "}
          <p className="text-xs mt-1 max-w-[280px] mx-auto">Final step</p>
          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderPassword(
              "password",
              "Password",
              this.state.showPassword ? "" : "password"
            )}
            {this.renderButton("Change Password")}
          </form>
        </div>
        {this.renderRedirectBtn("Sign up", "signup", "Don't have an account?")}
      </div>
    );
  }

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    // call the backend
    try {
      const { data } = this.state;
      await auth.login(data);
      spinner.classList.add("vanish");

      const user = auth.getCurrentUser();
      if (user.email_verified) {
        window.location = "/";
      } else {
        auth.resendEmailConfirmation();
        this.setState({ ...this.state, redirect: "/confirm-email" });
      }
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

export default ResetPassword;