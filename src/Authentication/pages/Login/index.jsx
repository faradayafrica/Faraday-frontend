import React from "react";
import { Redirect, Link } from "react-router-dom";
import Myspinner from "../../../common/components/Spinner";
import Form from "../../components/Form";
import Joi from "joi-browser";
import auth from "../../../common/services/authService";
import faraday from "../../../common/assets/logo.svg";
import { FcGoogle } from "react-icons/fc";

class LoginPage extends Form {
  componentDidMount() {
    if (this.props.clearCache == true) window.location.reload(true);
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
          <p className="font-medium text-brand">
            to <span className="font-bold">Beta</span>
          </p>
          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput("username", "Username or Email")}
            {this.renderPassword(
              "password",
              "Password",
              this.state.showPassword ? "" : "password"
            )}
            {this.renderButton("Login")}
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              <p className="text-sm mt-2 mb-0 text-night-secondary">
                forgot password
              </p>
            </Link>
            <div className="text-sm mt-8">
              <hr />
              OR
            </div>
            <div className="signup-with-google mt-8 flex items-center justify-center border rounded-[20px] hover:bg-blue-500 hover:text-white">
              <button
                className="font-[550] py-2 px-4 flex items-center"
                onClick={this.googleSignUp}
              >
                <FcGoogle size={24} className="mr-2" /> Login with Google
              </button>
            </div>
            <p className="mt-10 text[14px]">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#0043CE] font-[510]">
                Create one
              </Link>
            </p>
          </form>
        </div>
        {/* {this.renderRedirectBtn("Sign up", "signup", "Don't have an account?")} */}
      </div>
    );
  }

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById("spinnerContainer");
    spinner.classList.remove("vanish");

    // This is to get the Query Parameter
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    let redirectUrl = params.redirect;

    // call the backend
    try {
      const { data } = this.state;
      await auth.login(data);
      spinner.classList.add("vanish");

      const user = auth.getCurrentUser();
      if (user?.email_verified && user?.edu_verified) {
        window.location = redirectUrl ?? "/";
      } else if (!user?.email_verified) {
        auth.resendEmailConfirmation();
        this.setState({ ...this.state, redirect: "/confirm-email" });
      } else {
        this.setState({ ...this.state, redirect: "/" });
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

export default LoginPage;
