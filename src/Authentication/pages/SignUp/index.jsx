import React from "react";
import Form from "../../components/Form";
import Myspinner from "../../../common/components/Spinner";
import faraday from "../../../common/assets/logo.svg";
import Joi from "joi-browser";
import { Redirect, Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { connect } from "react-redux";
import { fetchSchoolThunk } from "../../../common/features/auth/univastSlice";
import * as userService from "../../services/userService";
import { ErrorToast } from "../../../common/components/CustomToast";

import { FcGoogle } from "react-icons/fc";

class SignUpPage extends Form {
  static contextType = UserContext;

  state = {
    data: {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
    },
    errors: {},
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
    const spinner = document.getElementById("spinnerContainer");
    const progress = document.getElementById("progressBar");
    spinner.classList.remove("vanish");

    const { setUser } = this.context;

    try {
      const { data } = this.state;
      const res = await userService.register(data);
      setUser(res.data);
      this.setState({ ...this.state, redirect: "/confirm-email" });
      progress.classList.remove("vanish");
      progress.classList.add("progress-25");
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;
        this.setState({ errorMessage });
        ErrorToast(`Sorry! ${errorMessage.detail[0]}`);
      } else {
        this.setState({ errorMessage: "An error occurred" });
      }
    } finally {
      spinner.classList.add("vanish");
    }
  };

  // Function to handle sign up with Google
  googleSignUp = async () => {
    try {
      // Implement Google sign-up logic here using an authentication service/library
      // Example: Use Firebase Authentication with Google OAuth
      // const googleProvider = new firebase.auth.GoogleAuthProvider();
      // await firebase.auth().signInWithPopup(googleProvider);

      // After successful Google sign-up, navigate user to desired page
      this.setState({ redirect: "/desired-page-after-google-signup" });
    } catch (error) {
      console.error("Google sign-up error:", error);
      // Handle error (e.g., display error message)
      ErrorToast("Failed to sign up with Google. Please try again.");
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="login-page">
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
            {this.renderPassword(
              "password",
              "Password",
              this.state.showPassword ? "" : "password"
            )}
            {this.renderButton("Sign up")}
          </form>

          <div>
            <hr />
            OR
          </div>
          <div className="signup-with-google mt-8 flex items-center justify-center border rounded-[20px] hover:bg-blue-500 hover:text-white">
            <button
              className="font-[550] py-2 px-4 flex items-center"
              onClick={this.googleSignUp}
            >
              <FcGoogle size={24} className="mr-2" /> Sign Up with Google
            </button>
          </div>

          <p className="mt-10 text[14px]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0043CE] font-[520]">
              Sign in
            </Link>
          </p>
          <p className="faraday-terms mt-10 text-sm text-center">
            By clicking the sign up button, you agree to our{" "}
            <Link
              to="/terms-and-condition"
              className="text-[#0043CE] font-[550]"
            >
              User Condition
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-[#0043CE] font-[550]">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchSchool: fetchSchoolThunk,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
