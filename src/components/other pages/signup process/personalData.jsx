import React, { useRef } from 'react';
import Joi from 'joi-browser';
import Form from '../../form';
import Myspinner from '../../spinner';
import faraday from '../../../images/logo.svg';

class PersonalData extends Form {
  state = {
    data: {
      image: 'https://api.faraday.africa/images/default.jpg',
      bio: '',
      day: '',
      month: '',
      year: '',
    },
    errors: {},
  };

  constructor() {
    super();
    this.fileInputRef = React.createRef();
  }

  schema = {
    image: Joi.required().label('image'),
    bio: Joi.string().max(160).label('Bio'),
    day: Joi.number().label('Day'),
    month: Joi.string().label('Month'),
    year: Joi.string().label('Year'),
  };

  imageHandler = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const data = { ...this.state.data };
        data['image'] = reader.result;
        this.setState({ data });
        console.log(this.state.data.image);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <div className='login-page'>
        {/* the spinner */}
        <div id='spinnerContainer' className='spinner-container vanish'>
          <Myspinner />
        </div>
        <div className='progress-container mx-auto mt-3'>
          <div id='progressBar' className='progress progress-75'></div>
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
              {/* <button
                onClick={event => {
                  event.preventDefault();
                  this.fileInputRef.current.click();
                }}
                className='btn add-profile-btn'
              >
                Add Image
              </button>
              <input
                type='file'
                style={{ display: 'none' }}
                ref={this.fileInputRef}
                accept='image/*'
                onChange={event => {
                  const file = event.target.files[0];
                  if (file && file.type.substr(0, 5) === 'image ') {
                    const data = { ...this.state.data };
                    data['image'] = file;
                    this.setState({ data });
                    console.log(file, this.state.data);
                  } else {
                    const data = { ...this.state.data };
                    data['image'] = null;
                    this.setState({ data });
                  }
                }
              }
              /> */}

              <img
                className='add-profile-btn'
                src={this.state.data.image}
                id='img'
                alt=''
                onClick={event => {
                  this.fileInputRef.current.click();
                }}
              />

              <input
                type='file'
                name='image-upload'
                id='input'
                accept='image/*'
                onChange={this.imageHandler}
                ref={this.fileInputRef}
                style={{ display: 'none' }}
              />
              <label htmlFor='input' className='sr-only'>
                Add Image
              </label>
            </div>
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderInput('bio', 'Your bio')}

            <div className='horinzontal-align label-group'>
              {/* {this.renderSelect('school', 'School', this.state.schools)} */}
              <div className=' col-4'>
                {this.renderDateSelect('year', 'Year', [
                  { name: '1999' },
                  { name: '1993' },
                ])}
              </div>
              <div className='col-4 mr-3'>
                {this.renderDateSelect('month', 'Month', [
                  { name: 'May' },
                  { name: 'January' },
                ])}
              </div>
              <div className='col'>
                {this.renderDateSelect('day', 'Day', [
                  { name: '1' },
                  { name: '2' },
                  { name: '3' },
                ])}
              </div>
            </div>

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
    progress.classList.add('progress-100');
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
