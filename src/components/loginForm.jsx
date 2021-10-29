import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import faraday from '../images/logo.svg';

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
          <h3 className='form-title'>Login</h3>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput('username', 'Username')}
            {this.renderInput('password', 'Password', 'password')}
            {this.renderButton('Login')}
          </form>
        </div>
      </div>
    );
  }

  doSubmit = () => {
    // call the backend
    console.log('login');
  };
}

export default LoginForm;
