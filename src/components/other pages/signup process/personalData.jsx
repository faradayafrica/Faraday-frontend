import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/Form';
import Myspinner from '../../spinner';
import faraday from '../../../images/logo.svg';
import addImage from '../../../images/Add Image.svg';
import auth from '../../../services/authService';
import { getYear, getMonth } from '../../../services/bioServices';

class PersonalData extends Form {
  state = {
    data: {
      image: addImage,
      bio: '',
      day: '',
      month: '',
      year: '',
    },

    gender: [
      { name: 'Male' },
      { name: 'Female' },
      { name: 'Non-binary' },
      { name: 'Rather not say' },
    ],
    year: [],
    month: [],
    days: {
      thirtyOne: [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '10' },
        { name: '11' },
        { name: '12' },
        { name: '13' },
        { name: '14' },
        { name: '15' },
        { name: '16' },
        { name: '17' },
        { name: '18' },
        { name: '19' },
        { name: '20' },
        { name: '21' },
        { name: '22' },
        { name: '23' },
        { name: '24' },
        { name: '25' },
        { name: '26' },
        { name: '27' },
        { name: '28' },
        { name: '29' },
        { name: '30' },
        { name: '31' },
      ],
      thirty: [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '10' },
        { name: '11' },
        { name: '12' },
        { name: '13' },
        { name: '14' },
        { name: '15' },
        { name: '16' },
        { name: '17' },
        { name: '18' },
        { name: '19' },
        { name: '20' },
        { name: '21' },
        { name: '22' },
        { name: '23' },
        { name: '24' },
        { name: '25' },
        { name: '26' },
        { name: '27' },
        { name: '28' },
        { name: '29' },
        { name: '30' },
      ],
      twentyNine: [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
        { name: '5' },
        { name: '6' },
        { name: '7' },
        { name: '8' },
        { name: '9' },
        { name: '10' },
        { name: '11' },
        { name: '12' },
        { name: '13' },
        { name: '14' },
        { name: '15' },
        { name: '16' },
        { name: '17' },
        { name: '18' },
        { name: '19' },
        { name: '20' },
        { name: '21' },
        { name: '22' },
        { name: '23' },
        { name: '24' },
        { name: '25' },
        { name: '26' },
        { name: '27' },
        { name: '28' },
        { name: '29' },
      ],
    },

    errors: {},
  };

  schema = {
    image: Joi.required().label('image'),
    bio: Joi.string().max(160).label('Bio'),
    gender: Joi.string().label('Gender'),
    day: Joi.number().label('Day'),
    month: Joi.string().label('Month'),
    year: Joi.string().label('Year'),
  };

  constructor() {
    super();
    this.fileInputRef = React.createRef();
  }

  populateYear() {
    const year = getYear();
    this.setState({ year });
  }
  populateMonth() {
    const month = getMonth();
    this.setState({ month });
  }

  componentDidMount() {
    this.populateYear();
    this.populateMonth();
  }

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
            {/* the input fields is being rendered by a method in the parent class "Form" in form.jsx */}
            {this.renderFileInput('image')}
            {this.renderTextArea('bio', 'Your bio')}
            {this.renderGenderSelect('gender', 'Gender', this.state.gender)}

            <div className='horinzontal-align label-group'>
              <div className=' col-4'>
                {this.renderDateSelect('year', 'Year', this.state.year)}
              </div>
              <div className='col-4 mr-3'>
                {this.renderDateSelect('month', 'Month', this.state.month)}
              </div>
              <div className='col'>
                {this.renderDateSelect('day', 'Day', this.listDays())}
              </div>
            </div>

            {this.renderButton('Next')}
            {/* <button
              className='btn btn-green-outline btn-login my-2 bubbly-button'
              onClick={this.skipValidation}
            >
              Skip
            </button> */}
          </form>
        </div>
      </div>
    );
  }

  skipValidation = () => {
    console.log('form skipped');
    window.location = '/qfeed';
  };

  listDays = () => {
    switch (this.selectedMonth) {
      case 'January':
        return this.state.days.thirtyOne;
      case 'Febuary':
        return this.state.days.twentyNine;
      case 'March':
        return this.state.days.thirtyOne;
      case 'April':
        return this.state.days.thirty;
      case 'May':
        return this.state.days.thirtyOne;
      case 'June':
        return this.state.days.thirty;
      case 'July':
        return this.state.days.thirtyOne;
      case 'August':
        return this.state.days.thirtyOne;
      case 'September':
        return this.state.days.thirty;
      case 'October':
        return this.state.days.thirtyOne;
      case 'November':
        return this.state.days.thirty;
      case 'December':
        return this.state.days.thirtyOne;
      default:
        return this.state.days.thirty;
    }
  };

  doSubmit = async () => {
    //Activate spinner
    const spinner = document.getElementById('spinnerContainer');
    const progress = document.getElementById('progressBar');
    spinner.classList.remove('vanish');

    //onTry
    progress.classList.remove('vanish');
    // call the backend

    const date = `${this.state.data.day}/${this.state.data.month}/${this.state.data.year}`;
    const newData = {
      profile_pic: this.state.data.image,
      dob: date,
      gender: this.state.data.gender,
      bio: this.state.data.bio,
    };
    console.log(newData);

    try {
      // await auth.refreshJwt();
      await auth.updatePersonalDetail(newData);
      progress.classList.add('progress-100');
      window.location = '/';
      spinner.classList.add('vanish');
    } catch (ex) {
      if (ex.response && ex.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.bio = 'Something went wrong';
        this.setState({ errors });
        spinner.classList.add('vanish');
      } else if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.bio = `There's an auth error`;
        this.setState({ errors });
        spinner.classList.add('vanish');
      } else {
        const errors = { ...this.state.errors };
        errors.bio = 'Check your internet connection and try again';
        this.setState({ errors });
        spinner.classList.add('vanish');
      }
    }
  };
}

export default PersonalData;
