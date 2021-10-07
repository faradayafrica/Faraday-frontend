import React, { Component } from 'react';
import profile from '../../images/profile.png';
import departmentIcon from '../../images/department.svg';

class QuestionProfile extends Component {
  render() {
    const { name, department, time, username } = this.props.question;
    return (
      <div className='horinzontal-align txt'>
        <img className='profile-image' src={profile} alt='profile' />

        <div className='user-info col'>
          <div className='horinzontal-align'>
            <p className='profile-name '>{name}</p>
            <p>@{username}</p>
            <p>{time}</p>
          </div>
          <div className='horinzontal-align'>
            <img src={departmentIcon} alt='department icon' />
            <p className='dont-break'>{department}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionProfile;
