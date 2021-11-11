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
    confirmationCode: Joi.string().max(6).required().label('Code'),
  };

  render() {
    return (
      <div className='login-page'>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>We sent you a code</h3>
          <p className='mx-3 extra-info'>
            enter it below to confirm your email.
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
            resend code.
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
        errors.confirmationCode = 'Something went wrong';
        this.setState({ errors });
      } else if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          'Please make sure the code provided above is correct';
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          'Check your internet connection and try again';
        this.setState({ errors });
      }
    }
  };
}

export default ConfirmEmail;
