import React from "react";
import img from "../../images/profile3.png";
import { Link } from "react-router-dom";

function ProfileData({ user }) {
  return (
    <div className='profile__data'>
      <div className='flex justify-content-between'>
        <img className='rounded-circle' src={img} alt='' />
        <div className='align-self-end'>
          <Link to='/bookmarks'>
            <button className='btn profile__btn'>
              <svg
                width='14'
                height='18'
                viewBox='0 0 14 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                class='bookmark-icon'
              >
                <path
                  d='M6.1136 10.6136L0.9 15.8272V0.9H12.6V15.8272L7.38639 10.6136C7.21761 10.4448 6.98869 10.35 6.75 10.35C6.5113 10.35 6.28239 10.4448 6.1136 10.6136Z'
                  stroke='#6C757D'
                  stroke-width='1.8'
                  stroke-linejoin='round'
                ></path>
              </svg>
            </button>
          </Link>

          <button className='btn profile__btn ml-3'>Edit Profile</button>
        </div>
      </div>

      <div className='profile__user'>
        <h2>Nworie Kingsley</h2>
        <p className='username'>@nworiekingslee</p>
        <p className='description'>
          A brand designer and frontend developer. currently working with
          @devgenix, @favouritejome1 on a unique edtech solution.
        </p>

        <div className='flex profile__school'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12 21C10.7369 19.9226 9.56619 18.7415 8.5 17.469C6.9 15.558 5 12.712 5 9.99999C4.99858 7.16754 6.70425 4.61338 9.32107 3.52939C11.9379 2.44539 14.9501 3.04523 16.952 5.04899C18.2685 6.3596 19.0059 8.14238 19 9.99999C19 12.712 17.1 15.558 15.5 17.469C14.4338 18.7415 13.2631 19.9226 12 21ZM12 4.99999C9.23995 5.0033 7.00331 7.23994 7 9.99999C7 11.166 7.527 13.185 10.035 16.186C10.6531 16.924 11.309 17.6297 12 18.3C12.691 17.6304 13.3472 16.9259 13.966 16.189C16.473 13.184 17 11.165 17 9.99999C16.9967 7.23994 14.7601 5.0033 12 4.99999ZM12 13C10.3431 13 9 11.6568 9 9.99999C9 8.34313 10.3431 6.99999 12 6.99999C13.6569 6.99999 15 8.34313 15 9.99999C15 10.7956 14.6839 11.5587 14.1213 12.1213C13.5587 12.6839 12.7957 13 12 13Z'
              fill='#A2ABB3'
            />
          </svg>
          <p>Nnamdi Azikwe University, Awka</p>
        </div>
        <div className='flex profile__school'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M20 21H4C3.44772 21 3 20.5523 3 20V12.7C3 12.4119 3.12432 12.1378 3.341 11.948L5 10.5V4C5 3.44772 5.44772 3 6 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21ZM9 7.329C9.24212 7.32928 9.47592 7.4174 9.658 7.577L14.658 11.952C14.874 12.1407 14.9986 12.4132 15 12.7V19H19V5H7V8.75L8.341 7.576C8.52348 7.41654 8.75766 7.32876 9 7.329ZM8 16H10V19H13V13.157L9 9.657L5 13.157V19H8V16Z'
              fill='#A2ABB3'
            />
          </svg>
          <p> Electronics and Computer Engineering</p>
        </div>
      </div>

      <div className='flex justify-between'>
        <p className='flex ques-solu border-right'>
          118
          <span>Questions</span>
        </p>
        <p className='flex ques-solu border-right'>
          24
          <span>Solutions</span>
        </p>
        <p className='flex ques-solu'>
          92
          <span>Followers</span>
        </p>
      </div>
    </div>
  );
}

export default ProfileData;
