import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/profile1.png";
import ProfileIcon from "../images/profile.svg";
import BookMarkIcon from "../images/Bookmarks.svg";
import "../styles/mobileSideNav.scss";
import { useLocation } from "react-router-dom";

function MobileNav({ user }) {
  const [isProfile, setIsProfile] = useState(false);
  // console.log(user);

  const location = useLocation();

  useEffect(() => {
    const allowedRoutes = "profile";

    if (allowedRoutes.includes(location.pathname.replace("/", ""))) {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [location.pathname]);

  const handleMobileMenuClick = () => {
    let mobileSidenav = document.querySelector(".side");

    mobileSidenav.classList.toggle("side-active");
  };

  return (
    <>
      <div className='mobile-sidenav '>
        {/* Hamburger */}
        {!isProfile && (
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
        )}

        <div className='side'>
          <div className='side-container'>
            <div className='side-overlay' onClick={handleMobileMenuClick}></div>
            <div className='side-header'>
              <div className='d-flex'>
                <h3 className='side-account-info'>Account info</h3>
                <div
                  className='icon-container icon-container-secondary side-close'
                  data-toggle='tooltip'
                  title='close'
                  onClick={handleMobileMenuClick}
                >
                  <svg
                    width='30'
                    height='30'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z'
                      fill='#6C757D'
                    />
                  </svg>
                </div>
              </div>
              <div className='d-flex mt-4'>
                <img
                  src={Avatar}
                  alt=''
                  className='rounded-circle mr-2'
                  width='40px'
                  height='40px'
                />
                <div>
                  <h2 className='name'>
                    {user?.first_name} {user?.last_name}
                  </h2>
                  <p className='username'>@{user?.username}</p>
                </div>
              </div>
              <div className='d-flex mt-2'>
                <p className='ques-solu pr-2 mr-2 border-right'>
                  200 <span>Questions</span>
                </p>
                <p className='ques-solu'>
                  10 <span>Solution</span>
                </p>
              </div>
            </div>

            <div className='side-links'>
              <div onClick={handleMobileMenuClick}>
                <Link
                  to='/profile'
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div className='mobile-link'>
                    <img src={ProfileIcon} alt='' className='icon' />

                    <p
                      className='my-auto .dont-break'
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 2,
                      }}
                    >
                      Profile
                    </p>
                  </div>
                </Link>
                <Link to='/bookmarks' style={{ textDecoration: "none" }}>
                  <div className='mobile-link'>
                    <img src={BookMarkIcon} alt='' className='icon' />
                    <p
                      className='my-auto .dont-break'
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 2,
                      }}
                    >
                      Bookmarks
                    </p>
                  </div>
                </Link>
                <Link to='/sponsors' style={{ textDecoration: "none" }}>
                  <div className='mobile-link'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                    >
                      <path
                        d='M5.12954 3.00772C5.48563 2.38457 6.14831 2 6.86603 2H17.134C17.8517 2 18.5144 2.38457 18.8704 3.00772L20.0133 5.00772C20.6612 6.14163 20.0618 7.51107 18.9235 7.89532C18.9276 7.97661 18.9269 8.0591 18.9209 8.14249L18.0638 20.1425C17.989 21.1891 17.1181 22 16.0689 22H7.9311C6.88182 22 6.01094 21.1891 5.93618 20.1425L5.07904 8.14249C5.07308 8.0591 5.07231 7.97661 5.07645 7.89531C3.93813 7.51105 3.33874 6.14162 3.98668 5.00772L5.12954 3.00772ZM7.07396 8L7.28824 11H16.7117L16.926 8H7.07396ZM7.71681 17L7.9311 20H16.0689L16.2831 17H7.71681ZM18.2768 6L17.134 4L6.86603 4L5.72317 6H18.2768Z'
                        fill='#5551FE'
                      />
                    </svg>
                    <p
                      className='my-auto .dont-break'
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 2,
                        color: "#5551FE",
                      }}
                    >
                      Sponsors
                    </p>
                  </div>
                </Link>
                <Link to='/setting' style={{ textDecoration: "none" }}>
                  <div className='mobile-link'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                    >
                      <path
                        d='M13.82 22H10.18C9.71016 22 9.3036 21.673 9.20304 21.214L8.79604 19.33C8.25309 19.0921 7.73827 18.7946 7.26104 18.443L5.42404 19.028C4.97604 19.1709 4.48903 18.9823 4.25404 18.575L2.43004 15.424C2.19763 15.0165 2.2777 14.5025 2.62304 14.185L4.04804 12.885C3.98324 12.2961 3.98324 11.7019 4.04804 11.113L2.62304 9.816C2.27719 9.49837 2.19709 8.98372 2.43004 8.576L4.25004 5.423C4.48503 5.0157 4.97204 4.82714 5.42004 4.97L7.25704 5.555C7.5011 5.37416 7.75517 5.20722 8.01804 5.055C8.27038 4.91269 8.53008 4.78385 8.79604 4.669L9.20404 2.787C9.30411 2.32797 9.71023 2.00049 10.18 2H13.82C14.2899 2.00049 14.696 2.32797 14.796 2.787L15.208 4.67C15.4888 4.79352 15.7623 4.93308 16.027 5.088C16.274 5.23081 16.5127 5.38739 16.742 5.557L18.58 4.972C19.0277 4.82967 19.5142 5.01816 19.749 5.425L21.569 8.578C21.8015 8.98548 21.7214 9.49951 21.376 9.817L19.951 11.117C20.0158 11.7059 20.0158 12.3001 19.951 12.889L21.376 14.189C21.7214 14.5065 21.8015 15.0205 21.569 15.428L19.749 18.581C19.5142 18.9878 19.0277 19.1763 18.58 19.034L16.742 18.449C16.5095 18.6203 16.2678 18.7789 16.018 18.924C15.7559 19.0759 15.4854 19.2131 15.208 19.335L14.796 21.214C14.6956 21.6726 14.2896 21.9996 13.82 22ZM7.62004 16.229L8.44004 16.829C8.62489 16.9652 8.81755 17.0904 9.01704 17.204C9.20474 17.3127 9.39801 17.4115 9.59604 17.5L10.529 17.909L10.986 20H13.016L13.473 17.908L14.406 17.499C14.8133 17.3194 15.1999 17.0961 15.559 16.833L16.38 16.233L18.421 16.883L19.436 15.125L17.853 13.682L17.965 12.67C18.0142 12.2274 18.0142 11.7806 17.965 11.338L17.853 10.326L19.437 8.88L18.421 7.121L16.38 7.771L15.559 7.171C15.1998 6.90671 14.8133 6.68175 14.406 6.5L13.473 6.091L13.016 4H10.986L10.527 6.092L9.59604 6.5C9.39785 6.58704 9.20456 6.68486 9.01704 6.793C8.81878 6.90633 8.62713 7.03086 8.44304 7.166L7.62204 7.766L5.58204 7.116L4.56504 8.88L6.14804 10.321L6.03604 11.334C5.98684 11.7766 5.98684 12.2234 6.03604 12.666L6.14804 13.678L4.56504 15.121L5.58004 16.879L7.62004 16.229ZM11.996 16C9.7869 16 7.99604 14.2091 7.99604 12C7.99604 9.79086 9.7869 8 11.996 8C14.2052 8 15.996 9.79086 15.996 12C15.9933 14.208 14.204 15.9972 11.996 16ZM11.996 10C10.9034 10.0011 10.0139 10.8788 9.99827 11.9713C9.98262 13.0638 10.8466 13.9667 11.9387 13.9991C13.0309 14.0315 13.9469 13.1815 13.996 12.09V12.49V12C13.996 10.8954 13.1006 10 11.996 10Z'
                        fill='#6C757D'
                      />
                    </svg>
                    <p
                      className='my-auto .dont-break'
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 2,
                      }}
                    >
                      Settings
                    </p>
                  </div>
                </Link>
                <Link to='/logout' style={{ textDecoration: "none" }}>
                  <div className='mobile-link'>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon'
                    >
                      <path
                        d='M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z'
                        fill='#6C757D'
                      />
                    </svg>
                    <p
                      className='mr-1 my-auto .dont-break'
                      style={{
                        display: "inline",
                        position: "relative",
                        top: 2,
                      }}
                    >
                      Logout
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            <span className='version'>v1.0.0 beta</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileNav;
