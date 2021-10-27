import React from 'react';
import faraday from '../images/logo.svg';
import Input from './styledComponents/input';

class SignUpForm extends React.Component {
  state = {
    account: {
      fname: '',
      lname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className='login-page'>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>Signup</h3>

          <form>
            <div className='horinzontal-align label-group'>
              <Input
                name='fname'
                type='text'
                placeholder={'First name'}
                // value={account.fname}
                error={errors.fname}
              />
              <Input
                name='lname'
                type='text'
                placeholder={'Last name'}
                // value={account.lname}
                error={errors.lname}
              />
            </div>

            <Input
              name='username'
              type='text'
              placeholder={'Username'}
              // value={account.username}
              error={errors.username}
            />
            <Input
              name='email'
              type='text'
              placeholder={'Email'}
              // value={account.email}
              error={errors.email}
            />

            <Input
              name='password'
              type='password'
              placeholder='Password'
              // value={account.password}
              error={errors.password}
            />

            <Input
              name='password'
              type='password'
              placeholder='Confirm password'
              // value={account.password}
              error={errors.password}
            />

            <button className='btn btn-green btn-login my-2'>Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
