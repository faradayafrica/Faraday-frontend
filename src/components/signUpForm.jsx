import React from 'react';
import Form from './form';
import faraday from '../images/logo.svg';
import Joi from 'joi-browser';

import * as userService from '../services/userService';

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
    confirmPassword: Joi.string().required()
    .valid(Joi.ref('password'))
    .label('Please make sure this')
    .options({
      language: { any: { allowOnly: 'matches with password' } },
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

          <form onSubmit={this.handleSubmit}>
            <div className='horinzontal-align label-group'>
              {this.renderInput('fname', 'First name')}
              {this.renderInput('lname', 'Last name')}
            </div>

            {this.renderInput('username', 'Username')}
            {this.renderInput('email', 'Email')}

            <div className='horinzontal-align label-group mb-3'>
              {this.renderInput('password', 'Password', 'password')}
              {this.renderInput(
                'confirmPassword',
                'Confirm',
                'password'
              )}
            </div>

            {this.renderButton('Sign up')}
          </form>
        </div>
      </div>
    );
  }

  doSubmit = async () => {
    // call the backend
    console.log('signup');
    await userService.register(this.state.data);
  };
}

export default SignUpForm;
