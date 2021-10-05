import React, { Component } from 'react';
import profile from '../../images/profile.png';
import department from '../../images/department.svg';

class QuestionProfile extends Component {
  render() {
    return (
      <div className='horinzontal-align'>
        <img className='profile-image' src={profile} alt='profile' />

        <div className='user-info txt'>
          <div className='horinzontal-align'>
            <p className='profile-name'>Nworie User</p>
            <p>@username</p>
            <p>15h</p>
          </div>
          <div className='horinzontal-align'>
            <img src={department} alt='department icon' />
            <p>Computer engineering</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionProfile;
