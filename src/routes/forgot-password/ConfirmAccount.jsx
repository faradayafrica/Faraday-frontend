import React from "react";
import Myspinner from "../../components/styledComponents/Spinner";
import Joi from "joi-browser";
import Form from "../../components/common/Form";
import faraday from "../../images/logo.svg";
import auth from "../../services/authService";
import UserContext from "../../context/userContext";
import { Redirect } from "react-router-dom";
import { ErrorToast, PromiseToast } from "../../components/common/CustomToast";

class ConfirmAccount extends Form {
  static contextType = UserContext;

  state = {
    data: { confirmationCode: "" },
    errors: {},
    redirect: null,
    resend: false,
    time: 30,
  };

  schema = {
    confirmationCode: Joi.string().max(6).required().label("Code"),
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.resend) this.timeDown();
  }

  timeDown() {
    let resend = false;

    setTimeout(() => {
      let time = this.state.time - 1;

      if (time === 0) {
        this.setState({ resend });
        this.setState({ time: 30 });
      } else {
        this.setState({ time });
      }
    }, 1000);
  }

  doResend = () => {
    const spinner = document.getElementById("spinnerContainer");
    console.log(auth.getCurrentUser().email, "Confirm Password");
    if (auth.getCurrentUser().email) {
      spinner.classList.remove("vanish");
      try {
        let resend = this.state.resend;
        const promise = auth.resendEmailConfirmation().then(() => {
          resend = true;
          this.setState({ resend });
        });
        spinner.classList.add("vanish");
        PromiseToast(
          "Code resent",
          "Can't resend at the moment, try again later ",
          promise
        );
      } catch (ex) {
        if (ex.response && ex.response.status >= 400) {
          const errors = { ...this.state.errors };
          errors.confirmationCode = `Code not sent, ${ex.response.data.detail}`;
          // spinner.classList.add("vanish");
          this.setState({ errors });
        } else {
          const errors = { ...this.state.errors };
          errors.confirmationCode =
            "Check your internet connection and try again";
          // spinner.classList.add("vanish");
          this.setState({ errors });
        }
      }
    } else {
      ErrorToast("Sorry, we didn't get your email.");
    }
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    const progress = document.getElementById("progressBar");
    spinner.classList.remove("vanish");
    const { data } = this.state;

    // call the backend
    try {
      await auth.confirmAccount(data);

      progress.classList.add("progress-50");
      this.setState({ ...this.state, redirect: "/update-school-detail" });
      spinner.classList.add("vanish");
      // this.props.history.push("/update-school-detail");
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.confirmationCode = ex.response.data.detail;
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
        errors.confirmationCode = "Something went wrong, try again later";
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
        {/* the spinner */}
        <div id="spinnerContainer" className="spinner-container vanish">
          <Myspinner />
        </div>
        <div className="progress-container mx-auto mt-3">
          <div id="progressBar" className="progress progress-25"></div>
        </div>
        <div className="form-container">
          <div className="logo-container">
            <img className="logo mx-auto" src={faraday} alt="faraday" />
          </div>
          <h3 className="form-title">We sent a code to your Email</h3>
          <p className="mx-3 extra-info text-md">
            Enter it below to confirm your account.
          </p>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            <div className="form-group log" style={{ marginTop: "1.5rem" }}>
              <div className="form-group log">
                <label className="sr-only " htmlFor="email">
                  email
                </label>
                <input
                  // autoFocus
                  readOnly
                  value={auth.getCurrentUser().email || user.email}
                  name="email"
                  id="email"
                  className="form-control static-input rounded-lg"
                />
              </div>
            </div>
            {this.renderInput("confirmationCode", "Enter Confirmation Code")}
            {this.renderButton("Confirm my account")}
          </form>
        </div>
        {!this.state.resend && (
          <p className="mx-auto text-center mt-3 text-md">
            Didn't get a code?
            <span
              onClick={this.doResend}
              className="icon-container-secondary link-brand bubbly-button"
            >
              Resend code.
            </span>
          </p>
        )}

        {/* Replaces the resend button for 5secs after it has been clicked */}
        {this.state.resend && (
          <p className="mx-auto text-center mt-3 text-md max-w-xs">
            We have resent the confirmation code! You can try again in{" "}
            <span className="text-brand">{this.state.time + " "} </span> seconds
          </p>
        )}
      </div>
    );
  }
}

export default ConfirmAccount;
