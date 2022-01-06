import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../images/profile1.png";

function MobileNav({ user }) {
  console.log(user);

  const handleMobileMenuClick = () => {
    let mobileSidenav = document.querySelector(".side");

    mobileSidenav.classList.toggle("side-active");
    console.log("Who you wan impress");
  };

  return (
    <div>
      <div className='mobile-sidenav '>
        <div
          className='icon-container icon-container-secondary hanger-menu mr-2'
          id='sidenav-btn'
          data-toggle='tooltip'
          title='mobile-sidenav'
          onClick={handleMobileMenuClick}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z'
              fill='#6C757D'
            />
          </svg>
        </div>
        <div className='side' onClick={handleMobileMenuClick}>
          <div className='side-container'>
            <div className='side-header'>
              <h3>Account info</h3>
              <div
                className='icon-container icon-container-secondary mr-2 side-close'
                data-toggle='tooltip'
                title='close'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z'
                    fill='#6C757D'
                  />
                </svg>
              </div>
            </div>

            <div>
              <img src={Profile} alt='' />
              <div>
                <h2>
                  {user?.first_name} {user?.last_name}
                </h2>
                <p>{user?.username}</p>
              </div>
            </div>

            <div>
              <p>
                200 <span>Questions</span>
              </p>
              <p>
                10 <span>Solution</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
