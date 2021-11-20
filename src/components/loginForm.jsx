import React from 'react';
import Joi from 'joi-browser';
import Myspinner from './spinner';
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
        {/* the spinner */}
        <div id='spinnerContainer' className='spinner-container vanish'>
          <Myspinner />
        </div>
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
    //Activate spinner
    const spinner = document.getElementById('spinnerContainer');
    spinner.classList.remove('vanish');

    // call the backend
    try {
      const { data } = this.state;
      await auth.login(data);
      spinner.classList.add('vanish');

      const user = auth.getCurrentUser();
      if (user.email_verified) {
        // window.location = '/qfeed';
        this.props.history.push('/');
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
        spinner.classList.add('vanish');
      } else if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.username = 'Username or password is incorrect';
        this.setState({ errors });
        spinner.classList.add('vanish');
      } else {
        const errors = { ...this.state.errors };
        errors.username = 'Check your internet connection and try again';
        this.setState({ errors });
        spinner.classList.add('vanish');
      }
    }
  };
}

export default LoginForm;
