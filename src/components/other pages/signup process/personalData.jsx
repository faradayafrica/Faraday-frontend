import React from 'react';
import Joi from 'joi-browser';
import Form from '../../form';
import Myspinner from '../../spinner';
import faraday from '../../../images/logo.svg';
import {
  getSchools,
  getFaculties,
  getLevel,
} from '../../../services/schoolService';

class PersonalData extends Form {
  state = {
    data: {
      bio: '',
    },
    errors: {},
  };

  schema = {
    bio: Joi.string().max(160).label('Bio'),
  };

  render() {
    return (
      <div className='login-page'>
        {/* the spinner */}
        <div id='spinnerContainer' className='spinner-container vanish'>
          <Myspinner />
        </div>
        <div className='progress-container mx-auto mt-3'>
          <div className='progress progress-75'></div>
        </div>
        <div className='form-container'>
          <div className='logo-container'>
            <img className='logo' src={faraday} alt='faraday' />
          </div>
          <h3 className='form-title '>Let’s finish up</h3>
          <p className='mx-3 extra-info text-md'>
            Let’s get to know you a little beter. What makes you special?
          </p>

          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label for='exampleFormControlFile1'>Example file input</label>
              <input
                type='file'
                className='form-control-file'
                id='exampleFormControlFile1'
              />
            </div>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}

            {this.renderInput('bio', 'Your bio')}

            {this.renderButton('Next')}
            <button
              className='btn btn-green-outline btn-login my-2 bubbly-button'
              onClick={this.skipValidation}
            >
              Skip
            </button>
          </form>
        </div>
      </div>
    );
  }

  skipValidation = () => {
    console.log('form skipped');
    window.location = '/qfeed';
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById('spinnerContainer');
    const progress = document.getElementById('progressBar');
    spinner.classList.remove('vanish');

    //onTry
    progress.classList.remove('vanish');
    progress.classList.add('progress-25');
    // call the backend

    const { data } = this.state;
    console.log(data);

    //  try {
    //    await auth.updateSchoolDetail(data);
    //    progress.classList.add('progress-75');
    //    window.location = '/update-personal-data';
    //    spinner.classList.add('vanish');
    //  } catch (ex) {
    //    if (ex.response && ex.response.status === 500) {
    //      const errors = { ...this.state.errors };
    //      errors.school = 'Something went wrong';
    //      this.setState({ errors });
    //      spinner.classList.add('vanish');
    //    } else if (ex.response && ex.response.status === 401) {
    //      const errors = { ...this.state.errors };
    //      errors.school = `There's an auth error`;
    //      this.setState({ errors });
    //      spinner.classList.add('vanish');
    //    } else {
    //      const errors = { ...this.state.errors };
    //      errors.school = 'Check your internet connection and try again';
    //      this.setState({ errors });
    //      spinner.classList.add('vanish');
    //    }}
  };
}

export default PersonalData;
