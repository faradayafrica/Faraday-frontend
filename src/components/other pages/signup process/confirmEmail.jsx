import React from 'react';
import Joi from 'joi-browser';
import Form from '../../form';
import faraday from '../../../images/logo.svg';
import auth from '../../../services/authService';

class ConfirmEmail extends Form {
  state = {
    data: { confirmationCode: '' },
    errors: {},
  };

  schema = {
    confirmationCode: Joi.string().required().label('The confirmation code'),
  };

  render() {
    return (
      <div className='login-page'>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>Confirm Email</h3>
          <p className='mx-5'>
            We sent you a code, enter it below to confirm your email
          </p>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput('confirmationCode', 'Enter Confirmation Code')}
            {this.renderButton('Confirm my email')}
          </form>
        </div>
        <p className='mx-auto text-center mt-3'>
          Didn't get a code,
          <span
            onClick={async () => await auth.resendEmailConfirmation()}
            className='icon-container-secondary link-brand bubbly-button'
          >
            resend confirmation code
          </span>
        </p>
      </div>
    );
  }

  doSubmit = async () => {
    // call the backend
    try {
      const { data } = this.state;
      await auth.confirmEmail(data);

      window.location = '/qfeed';
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

export default ConfirmEmail;
