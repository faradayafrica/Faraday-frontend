import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import Myspinner from "../../../../common/components/Spinner";
import Form from "../../../components/Form";
import auth from "../../../../common/services/authService";
import faraday from "../../../../common/assets/logo.svg";
import { ErrorToast } from "../../../../common/components/CustomToast";
import UserContext from "../../../context/userContext";

class ForgotPassword extends Form {
  static contextType = UserContext;

  state = {
    data: { email: "" },
    redirect: null,
    errors: {},
    showPassword: false,
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
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
          <h3 className="form-title">Recover Account</h3>
          <p className="text-xs mt-1 max-w-[280px] mx-auto">
            Please fill in details associated to the account you want to recover
          </p>
          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput("email", "Email")}
            {this.renderButton("Continue")}
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

    const { setUser } = this.context;

    // call the backend
    try {
      const { data } = this.state;
      await auth
        .forgotPassword(data)
        .then(() => setUser({ ...this.state.data }));
      spinner.classList.add("vanish");
      this.setState({ ...this.state, redirect: "/confirm-account" });
    } catch (error) {
      spinner.classList.add("vanish");
      if (error.response.status === 404) {
        ErrorToast("There's no account associated with this email");
      } else {
        ErrorToast(`Code not sent, ${error.message}`);
      }
    }
  };
}

export default ForgotPassword;
