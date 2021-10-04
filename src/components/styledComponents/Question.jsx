import React, { Component } from 'react';
import profile from '../../images/profile.png';
import department from '../../images/department.svg';

class Question extends Component {
  render() {
    return (
      <div className='question '>
        <div className='horinzontal-align'>
          <img className='profile-image' src={profile} alt='profile image' />

          <div className='user-info'>
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

        {/* the question itself */}
        <p className='question-content'>random stuff preferably Lorem Ipsum</p>
      </div>
    );
  }
}

export default Question;
