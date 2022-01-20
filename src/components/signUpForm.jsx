import React from "react";
import Form from "./common/Form";
import Myspinner from "./spinner";
import faraday from "../images/logo.svg";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

import * as userService from "../services/userService";

class SignUpForm extends Form {
  state = {
    data: {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: { email: "" },
  };

  schema = {
    fname: Joi.string().alphanum().required().label("First name"),
    lname: Joi.string().alphanum().required().label("Last name"),
    username: Joi.string().min(3).max(30).required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("Please make sure this")
      .options({
        language: { any: { allowOnly: "matches with password" } },
      }),
  };

  render() {
    return (
      <div className='login-page'>
        {/* the spinner */}
        <div id='spinnerContainer' className='spinner-container vanish'>
          <Myspinner />
        </div>

        <div className='progress-container mx-auto mt-3'>
          <div id='progressBar' className='progress vanish'></div>
        </div>

        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>Create your account</h3>

          <form onSubmit={this.handleSubmit}>
            <div className='horinzontal-align label-group'>
              {this.renderInput("fname", "First name")}
              {this.renderInput("lname", "Last name")}
            </div>

            {this.renderInput("username", "Username")}
            {this.renderInput("email", "Email")}

            {/* <div className='horinzontal-align label-group mb-3'> */}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("confirmPassword", "Confirm", "password")}
            {/* </div> */}

            {this.renderButton("Sign up")}
          </form>

          <p className='faraday-terms mt-2 text-sm'>
            By clicking the sign up button, you agree to our
            <Link
              to='/terms-and-condition'
              className='link-grey icon-container-secondary '
            >
              Terms and Condition
            </Link>
            and
            <Link
              to='/privacy-policy'
              className='link-grey icon-container-secondary '
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        {this.renderRedirectBtn("Login", "login", "Already have an account?")}
      </div>
    );
  }

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    const progress = document.getElementById("progressBar");
    spinner.classList.remove("vanish");

    // call the backend
    try {
      const { data } = this.state;
      await userService.register(data);
      progress.classList.remove("vanish");
      progress.classList.add("progress-25");
      window.location = "/confirm-email";
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
}

export default SignUpForm;
