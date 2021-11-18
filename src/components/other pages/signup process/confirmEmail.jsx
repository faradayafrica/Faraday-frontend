import React from 'react';
import Myspinner from '../../spinner';
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
        <div
          id='popupContainer'
          onClick={this.hidePopup}
          className='popup vanish'
        >
          <div className='alert alert-success my-1 mx-auto  text-center'>
            <p className='m-4 alert-body'>Code Sent!</p>{' '}
          </div>
        </div>
        {/* the spinner */}
        <div id='spinnerContainer' className='spinner-container vanish'>
          <Myspinner />
        </div>
        <div className='progress-container mx-auto mt-3'>
          <div className='progress progress-25'></div>
        </div>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title'>We sent you a code</h3>
          <p className='mx-3 extra-info text-md'>
            enter it below to confirm your email.
          </p>

          <form onSubmit={this.handleSubmit}>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            <div className='form-group log' style={{ marginTop: '1.5rem' }}>
              <div class='form-group log'>
                <label className='sr-only' htmlFor='email'>
                  email
                </label>
                <input
                  // autoFocus
                  readonly
                  value={auth.getCurrentUser().email}
                  name='email'
                  id='email'
                  className='form-control static-input'
                />
              </div>
            </div>
            {this.renderInput('confirmationCode', 'Enter Confirmation Code')}
            {this.renderButton('Confirm my email')}
          </form>
        </div>
        <p className='mx-auto text-center mt-3 text-md'>
          Didn't get a code,
          <span
            onClick={this.doResend}
            className='icon-container-secondary link-brand bubbly-button'
          >
            resend code.
          </span>
        </p>
      </div>
    );
  }

  hidePopup = () => {
    const popup = document.getElementById('popupContainer');
    popup.classList.add('vanish');
  };

  doResend = async () => {
    const spinner = document.getElementById('spinnerContainer');
    spinner.classList.remove('vanish');

    const popup = document.getElementById('popupContainer');

    try {
      await auth.resendEmailConfirmation();
      spinner.classList.add('vanish');
      popup.classList.remove('vanish');
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.confirmationCode = `Code not sent, ${ex.response.data.detail}`;
        spinner.classList.add('vanish');
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          'Check your internet connection and try again';
        spinner.classList.add('vanish');
        this.setState({ errors });
      }
    }
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById('spinnerContainer');
    spinner.classList.remove('vanish');

    // call the backend
    try {
      const { data } = this.state;
      await auth.confirmEmail(data);
      spinner.classList.add('vanish');
      this.props.history.push('/update-school-detail');
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.confirmationCode = 'Something went wrong';
        spinner.classList.add('vanish');
        this.setState({ errors });
      } else if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          'Please make sure the code provided above is correct';
        spinner.classList.add('vanish');
        this.setState({ errors });
      } else {
        const errors = { ...this.state.errors };
        errors.confirmationCode =
          'Check your internet connection and try again';
        spinner.classList.add('vanish');
        this.setState({ errors });
      }
    }
  };
}

export default ConfirmEmail;