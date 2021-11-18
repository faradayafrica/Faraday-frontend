import React from 'react';
import Joi from 'joi-browser';
import Form from '../../form';
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
    // call the backend

    const { data } = this.state;
    console.log(data);

    var select = document.getElementById('faculty');
    var text = select.options[select.selectedIndex].text;
    console.log(text);
  };
}

export default PersonalData;
