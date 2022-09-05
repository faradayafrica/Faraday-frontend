import React from "react";
import Myspinner from "../components/styledComponents/Spinner";
import Joi from "joi-browser";
import Form from "../components/common/Form";
import faraday from "../images/logo.svg";
import auth from "../services/authService";
import UserContext from "../context/userContext";
import { Redirect } from "react-router-dom";
import { PromiseToast } from "../components/common/CustomToast";

class ConfirmEmail extends Form {
  static contextType = UserContext;

  state = {
    data: { confirmationCode: "" },
    errors: {},
    redirect: null,
    resend: false,
  };

  schema = {
    confirmationCode: Joi.string().max(6).required().label("Code"),
  };

  // componentDidMount() {
  //   const { user } = this.context;

  //   console.log(auth.getCurrentUser().email);

  //   console.log(user, "user");
  // }

  hidePopup = () => {
    const popup = document.getElementById("popupContainer");
    popup.classList.add("vanish");
    const cannotSend = document.getElementById("cannotSend");
    cannotSend.classList.add("vanish");
  };

  doResend = () => {
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    try {
      let resend = this.state.resend;
      const promise = auth.resendEmailConfirmation();
      spinner.classList.add("vanish");
      PromiseToast("Code resent", "Can't resend at the moment", promise);
      resend = true;
      this.setState({ resend });
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.confirmationCode = `Code not sent, ${ex.response.data.detail}`;
        spinner.classList.add("vanish");
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          "Check your internet connection and try again";
        spinner.classList.add("vanish");
        this.setState({ errors });
      }
    }
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    const progress = document.getElementById("progressBar");
    spinner.classList.remove("vanish");

    // call the backend
    try {
      const { data } = this.state;
      await auth.confirmEmail(data);
      progress.classList.add("progress-50");
      this.setState({ ...this.state, redirect: "/update-school-detail" });
      spinner.classList.add("vanish");

      // this.props.history.push("/update-school-detail");
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.confirmationCode = "Something went wrong";
        spinner.classList.add("vanish");
        this.setState({ errors });
      } else if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          "Please make sure the code provided above is correct";
        spinner.classList.add("vanish");
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          "Check your internet connection and try again";
        spinner.classList.add("vanish");
        this.setState({ errors });
      }
    }
  };

  render() {
    const { user } = this.context;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="login-page">
        <div id="cannotSend" onClick={this.hidePopup} className="popup vanish">
          <div className="alert alert-warning my-1 mx-auto  text-center">
            <p className="m-4 alert-body">Can't send code at the moment!</p>
          </div>
        </div>
        {/* the spinner */}
        <div id="spinnerContainer" className="spinner-container vanish">
          <Myspinner />
        </div>
        <div className="progress-container mx-auto mt-3">
          <div id="progressBar" className="progress progress-25"></div>
        </div>
        <div className="form-container">
          <div className="logo-container">
            <img className="logo" src={faraday} alt="faraday" />
          </div>
          <h3 className="form-title">We sent you a code</h3>
          <p className="mx-3 extra-info text-md">
            enter it below to confirm your email.
          </p>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            <div className="form-group log" style={{ marginTop: "1.5rem" }}>
              <div className="form-group log">
                <label className="sr-only" htmlFor="email">
                  email
                </label>
                <input
                  // autoFocus
                  readOnly
                  value={auth.getCurrentUser().email || user.email}
                  name="email"
                  id="email"
                  className="form-control static-input"
                />
              </div>
            </div>
            {this.renderInput("confirmationCode", "Enter Confirmation Code")}
            {this.renderButton("Confirm my email")}
          </form>
        </div>
        {!this.state.resend && (
          <p className="mx-auto text-center mt-3 text-md">
            Didn't get a code,
            <span
              onClick={this.doResend}
              className="icon-container-secondary link-brand bubbly-button"
            >
              resend code.
            </span>
          </p>
        )}

        {/* Replaces the resend button for 5secs after it has been clicked */}
        {this.state.resend && (
          <p className="mx-auto text-center mt-3 text-md">
            We have resent the confirmation code!
          </p>
        )}
      </div>
    );
  }
}

export default ConfirmEmail;
