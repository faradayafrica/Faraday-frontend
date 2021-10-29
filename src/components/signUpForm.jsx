import React from 'react';
import Form from './form';
import faraday from '../images/logo.svg';
import Joi from 'joi-browser';

class SignUpForm extends Form {
  state = {
    data: {
      fname: '',
      lname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
  };

  schema = {
    fname: Joi.string().alphanum().required().label('First name'),
    lname: Joi.string().alphanum().required().label('Last name'),
    username: Joi.string().min(3).max(30).required().label('Username'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(8).required().label('Password'),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({
        language: { any: { allowOnly: 'must match password' } },
      }),
  };

  render() {
    return (
      <div className='login-page'>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>Signup</h3>

          <form>
            <div className='horinzontal-align label-group'>
              {this.renderInput('lname', 'Last name')}
              {this.renderInput('fname', 'First name')}
            </div>

            {this.renderInput('username', 'Username')}
            {this.renderInput('email', 'Email')}

            {this.renderInput('password', 'Password', 'text')}
            {this.renderInput('confirmPassword', 'Confirm Password', 'text')}

            {this.renderButton('Sign up')}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
