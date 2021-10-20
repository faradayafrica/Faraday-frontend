import React, { Component } from 'react';
import Input from './styledComponents/input';
import faraday from '../images/logo.svg';

class SignUpForm extends React.Component {
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

            <button className='btn btn-green btn-login mt-2'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
