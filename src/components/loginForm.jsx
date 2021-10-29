import React, { Component } from 'react';
import Input from './styledComponents/input';
import Joi from 'joi-browser';
import faraday from '../images/logo.svg';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().max(30).required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className='login-page'>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>Login</h3>

          <form onSubmit={this.handleSubmit}>
            <Input
              name='username'
              type='text'
              placeholder={'Enter username'}
              onChange={this.handleChange}
              value={account.username}
              error={errors.username}
            />
            <Input
              name='password'
              type='password'
              placeholder='Enter password'
              onChange={this.handleChange}
              value={account.password}
              error={errors.password}
            />

            <button className='btn btn-green btn-login my-2'>Login</button>
          </form>
        </div>
      </div>
    );
  }

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    //call the server and redirect user to a different page
    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
  };

  validateProperty = ({ name, value }) => {
    if (name === 'username') {
      if (value.trim() === '') return 'Username cannot be empty';
      if (!/^[a-zA-Z0-9]+$/.test(value)) {
        return 'Your username cannot contain symbols';
      }
    }

    if (name === 'password') {
      if (value.trim() === '') return 'Password cannot be empty';
      if (value.trim().length < 8) return 'Password should be atleast 8 digits';
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
}

export default LoginForm;
