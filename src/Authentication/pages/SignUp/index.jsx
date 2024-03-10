import React from "react";
import Form from "../../components/Form";
import Myspinner from "../../../common/components/Spinner";
import faraday from "../../../common/assets/logo-green.svg";
import Joi from "joi-browser";
import { Redirect } from "react-router";
import UserContext from "../../context/userContext";
import { connect } from "react-redux";
import { fetchSchoolThunk } from "../../../common/features/auth/univastSlice";

import * as userService from "../../services/userService";
import { ErrorToast } from "../../../common/components/CustomToast";
import OrGoogle from "../../components/OrGoogle";
import { Link } from "react-router-dom";

class SignUpPage extends Form {
  static contextType = UserContext;

  state = {
    data: {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      // confirmPassword: "",
    },
    errors: { email: "" },
    errorMessage: null,
    redirect: null,
    showPassword: false,
    showErrors: false,
  };

  componentDidMount() {
    const { fetchSchool } = this.props;
    fetchSchool();
  }

  schema = {
    fname: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/)
      .required()
      .label("First name"),

    lname: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[A-Za-z0-9\s]+$/)
      .required()
      .label("Last name"),

    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Username")
      .regex(/^[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    const progress = document.getElementById("progressBar");
    spinner.classList.remove("vanish");

    const { setUser } = this.context;

    // call the backend
    try {
      const { data } = this.state;
      await userService
        .register(data)
        .then((res) => {
          setUser(res.data);
          this.setState({ ...this.state, redirect: "/confirm-email" });
          progress.classList.remove("vanish");
          progress.classList.add("progress-25");
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            errorMessage: err.response.data.message,
          });
          ErrorToast(`Sorry! ${err.response.data.message.detail[0]}`);
        })
        .finally(() => {
          spinner.classList.add("vanish");
        });

      spinner.classList.add("vanish");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };

        if (ex.response.data.detail[0].indexOf("username") !== -1) {
          errors.username = ex.response.data.detail[0];
        } else {
          errors.email = ex.response.data.detail[0];
        }
        this.setState({ errors });
        spinner.classList.add("vanish");
      } else if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.email = "Something went wrong, check back later";
        spinner.classList.add("vanish");
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.email = "Check your internet connection and try again";
        spinner.classList.add("vanish");

        this.setState({ errors });
      }
    }
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

        <div className="progress-container mx-auto mt-3">
          <div id="progressBar" className="progress vanish"></div>
        </div>

        <div className="form-container">
          <div className="logo-container">
            <img className="logo mx-auto" src={faraday} alt="faraday" />
          </div>
          <h3 className="form-title">Create your account</h3>

          <form onSubmit={this.handleSubmit}>
            <div className="horinzontal-align label-group">
              {this.renderInput("fname", "First name")}
              {this.renderInput("lname", "Last name")}
            </div>

            {this.renderInput("username", "Username")}
            {this.renderInput("email", "Email")}

            {/* <div className='horinzontal-align label-group mb-3'> */}
            {this.renderPassword(
              "password",
              "Password",
              this.state.showPassword ? "" : "password"
            )}
            {/* {this.renderInput(
              "confirmPassword",
              "Confirm Password",
              "password"
            )} */}
            {/* </div> */}

            <div className="text-xs">
              <span>By clicking the sign up button, you agree to our </span>
              <Link to="#" className="text-[#0043CE]">
                User Condition and Privacy Policy
              </Link>
            </div>

            {this.renderButton("Sign up")}
          </form>

          <OrGoogle />
        </div>
        {this.renderRedirectBtn("Login", "login", "Already have an account?")}
      </div>
    );
  }
}

// These lines of code bellow allows us to interact with the redux store from here

const mapDispatchToProps = {
  fetchSchool: fetchSchoolThunk,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
