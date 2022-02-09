import React from 'react';

function ProfileNav({ user, questionCount }) {
  return (
    <div className='profile__nav'>
      <div className='d-flex'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          height='35'
          viewBox='0 0 35 35'
          fill='none'
        >
          <path
            d='M13.83 16L17.41 12.41L16 11L10 17L16 23L17.41 21.59L13.83 18H26V16H13.83Z'
            fill='#6C757D'
          />
        </svg>

        <div className=' flex-col'>
          <h3>
            {user.last_name ? user.last_name : 'First'}{' '}
            {user.first_name ? user.first_name : 'Surname'}
          </h3>
          <p className=''>{questionCount ? questionCount : '__'}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileNav;
