import React from "react";
import { Redirect } from "react-router-dom";
import Myspinner from "../../../../common/components/Spinner";
import Form from "../../../components/Form";
import Joi from "joi-browser";
import auth from "../../../../common/services/authService";
import UserContext from "../../../context/userContext";
import faraday from "../../../../common/assets/logo-green.svg";
import { ErrorToast } from "../../../../common/components/CustomToast";

class ResetPassword extends Form {
  static contextType = UserContext;

  state = {
    data: { password: "", confirmPassword: "" },
    redirect: null,
    errors: {},
    showPassword: false,
  };

  schema = {
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.string().min(8).required().label("Password"),
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
          <h3 className="form-title text-[#1C1C1C] font-bold">
            Enter a new password
          </h3>{" "}
          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderPassword(
              "password",
              "Password",
              this.state.showPassword ? "" : "password"
            )}
            {this.renderPassword(
              "confirmPassword",
              "Confirm Password",
              "password"
            )}
            {this.renderButton("Change Password")}
          </form>
        </div>
        {this.renderRedirectBtn("Sign up", "signup", "Don't have an account?")}
      </div>
    );
  }

  doSubmit = async () => {
    const { user } = this.context;
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    // call the backend
    try {
      const { data } = this.state;
      await auth.resetPassword({
        ...user,
        new_password: data.password,
        confirm_password: data.confirmPassword,
      });
      spinner.classList.add("vanish");
      this.setState({ ...this.state, redirect: "/login" });
    } catch (error) {
      spinner.classList.add("vanish");
      if (error.response.status >= 400) {
        ErrorToast(error.message);
      } else {
        ErrorToast("Something went wrong, please try again later");
      }
    }
  };
}

export default ResetPassword;
