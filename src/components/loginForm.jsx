import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import faraday from '../images/logo.svg';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required().label('Username'),
    password: Joi.string().min(8).required().label('Password'),
  };

  render() {
    return (
      <div className='login-page'>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>Welcome back</h3>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
        </div>
        {this.renderRedirectBtn('Sign up', 'signup', "Don't have an account?")}
      </div>
    );
  }

  doSubmit = async () => {
    // call the backend
    try {
      const { data } = this.state;
      await auth.login(data);

      const user = auth.getCurrentUser();
      if (user.email_verified) {
        window.location = '/qfeed';
      } else {
        auth.resendEmailConfirmation();
        //redirect to "/confirm-email without doing a full page reload"
        this.props.history.push('/confirm-email');
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.username = 'Internal error, please try again';
        this.setState({ errors });
      } else if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.username = 'Username or password is incorrect';
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.username = 'Check your internet connection and try again';
        this.setState({ errors });
      }
    }
  };
}

export default LoginForm;
