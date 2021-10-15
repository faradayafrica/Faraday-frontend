import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

class NavDropdown extends Component {
  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle
          className='navlink btn  '
          variant=''
          id='dropdown-basic'
          bsPrefix='p-2'
        >
          <div className='nav-tooltip'>{this.props.name}</div>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fill='#6c757d'
            className='dropdown-svg'
          >
            <path d='M6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 12.5304 7.78929 13.0391 7.41421 13.4142C7.03914 13.7893 6.53043 14 6 14Z' />
            <path d='M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z' />
            <path d='M18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 12.5304 19.7893 13.0391 19.4142 13.4142C19.0391 13.7893 18.5304 14 18 14Z' />
          </svg>
          <p className='mx-2'>{this.props.name}</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className='dropdown-link'>
            <Link to='/profile' style={{ textDecoration: 'none' }}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='my-auto'
              >
                <path
                  d='M12 22C10.488 22.0043 8.9952 21.6622 7.63598 21C7.13853 20.758 6.66191 20.4754 6.21098 20.155L6.07398 20.055C4.8338 19.1396 3.81985 17.9522 3.10998 16.584C2.37571 15.1679 1.99489 13.5952 1.99993 12C1.99993 6.47715 6.47713 2 12 2C17.5228 2 22 6.47715 22 12C22.005 13.5944 21.6245 15.1664 20.891 16.582C20.1821 17.9494 19.1696 19.1364 17.931 20.052C17.4637 20.394 16.9679 20.6951 16.449 20.952L16.369 20.992C15.0089 21.6577 13.5142 22.0026 12 22ZM12 17C10.5015 16.9971 9.12764 17.834 8.44298 19.167C10.6844 20.2772 13.3156 20.2772 15.557 19.167V19.162C14.8715 17.8305 13.4976 16.9954 12 17ZM12 15C14.1661 15.0028 16.1634 16.1701 17.229 18.056L17.244 18.043L17.258 18.031L17.241 18.046L17.231 18.054C19.76 15.8691 20.6643 12.3423 19.4986 9.21011C18.333 6.07788 15.3431 4.00032 12.001 4.00032C8.65889 4.00032 5.66897 6.07788 4.50333 9.21011C3.33769 12.3423 4.24198 15.8691 6.77098 18.054C7.83724 16.169 9.83434 15.0026 12 15ZM12 14C9.79084 14 7.99998 12.2091 7.99998 10C7.99998 7.79086 9.79084 6 12 6C14.2091 6 16 7.79086 16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0608 14 12 14ZM12 8C10.8954 8 9.99998 8.89543 9.99998 10C9.99998 11.1046 10.8954 12 12 12C13.1045 12 14 11.1046 14 10C14 8.89543 13.1045 8 12 8Z'
                  fill='#6C757D'
                />
              </svg>

              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: 'inline',
                  position: 'relative',
                  top: 2,
                }}
              >
                Profile
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-link'>
            <Link to='/saved-courses' style={{ textDecoration: 'none' }}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 21.0001C11.355 20.4281 10.626 19.8331 9.85502 19.2001H9.84502C7.13002 16.9801 4.05302 14.4681 2.69402 11.4581C2.24754 10.4999 2.01093 9.45727 2.00001 8.40015C1.99703 6.94963 2.57879 5.55913 3.61383 4.54292C4.64887 3.5267 6.04981 2.97054 7.50002 3.00015C8.68065 3.00201 9.83586 3.34323 10.828 3.98315C11.264 4.26612 11.6584 4.6084 12 5.00015C12.3435 4.60994 12.7381 4.26786 13.173 3.98315C14.1648 3.3431 15.3197 3.00187 16.5 3.00015C17.9502 2.97054 19.3512 3.5267 20.3862 4.54292C21.4213 5.55913 22.003 6.94963 22 8.40015C21.9898 9.45896 21.7532 10.5033 21.306 11.4631C19.947 14.4731 16.871 16.9841 14.156 19.2001L14.146 19.2081C13.374 19.8371 12.646 20.4321 12.001 21.0081L12 21.0001ZM7.50002 5.00015C6.56853 4.98849 5.6701 5.34499 5.00002 5.99215C4.35441 6.62631 3.99358 7.49519 3.99994 8.40015C4.01135 9.17065 4.18585 9.93 4.51202 10.6281C5.15353 11.9269 6.01913 13.1022 7.06902 14.1001C8.06002 15.1001 9.20002 16.0681 10.186 16.8821C10.459 17.1071 10.737 17.3341 11.015 17.5611L11.19 17.7041C11.457 17.9221 11.733 18.1481 12 18.3701L12.013 18.3581L12.019 18.3531H12.025L12.034 18.3461H12.039H12.044L12.062 18.3311L12.103 18.2981L12.11 18.2921L12.121 18.2841H12.127L12.136 18.2761L12.8 17.7311L12.974 17.5881C13.255 17.3591 13.533 17.1321 13.806 16.9071C14.792 16.0931 15.933 15.1261 16.924 14.1211C17.9741 13.1237 18.8397 11.9487 19.481 10.6501C19.8131 9.94595 19.9901 9.17865 20.0001 8.40015C20.0042 7.49799 19.6435 6.63244 19 6.00015C18.3312 5.35007 17.4326 4.99063 16.5 5.00015C15.3619 4.99048 14.274 5.46752 13.51 6.31115L12 8.05115L10.49 6.31115C9.72609 5.46752 8.6381 4.99048 7.50002 5.00015Z'
                  fill='#6C757D'
                />
              </svg>

              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: 'inline',
                  position: 'relative',
                  top: 2,
                }}
              >
                Saved Courses
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-link'>
            <Link to='/bookmarks' style={{ textDecoration: 'none' }}>
              <svg
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.81355 10.6136L3.59995 15.8272V0.9H15.2999V15.8272L10.0863 10.6136C9.91756 10.4448 9.68865 10.35 9.44995 10.35C9.21126 10.35 8.98234 10.4448 8.81355 10.6136Z'
                  stroke='#6C757D'
                  strokeWidth='1.8'
                  strokeLinejoin='round'
                />
              </svg>

              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: 'inline',
                  position: 'relative',
                  top: 2,
                }}
              >
                Bookmarks
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-link'>
            <Link to='/explore' style={{ textDecoration: 'none' }}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M18.677 19.6069L12.962 13.8909C10.4196 15.6984 6.91642 15.2562 4.90285 12.8738C2.88929 10.4914 3.03714 6.96349 5.24298 4.7579C7.44824 2.55134 10.9765 2.40285 13.3594 4.41631C15.7422 6.42977 16.1846 9.93334 14.377 12.4759L20.092 18.1919L18.678 19.6059L18.677 19.6069ZM9.48498 4.99988C7.58868 4.99946 5.95267 6.33057 5.56745 8.18733C5.18224 10.0441 6.15369 11.9162 7.89366 12.6701C9.63362 13.4241 11.6639 12.8527 12.7552 11.3019C13.8466 9.75117 13.699 7.64721 12.402 6.2639L13.007 6.8639L12.325 6.1839L12.313 6.1719C11.5648 5.41907 10.5464 4.99702 9.48498 4.99988Z'
                  fill='#6C757D'
                />
              </svg>
              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: 'inline',
                  position: 'relative',
                  top: 2,
                }}
              >
                Explore
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-link'>
            <Link to='/sponsors' style={{ textDecoration: 'none' }}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5.12954 3.00772C5.48563 2.38457 6.14831 2 6.86603 2H17.134C17.8517 2 18.5144 2.38457 18.8704 3.00772L20.0133 5.00772C20.6612 6.14163 20.0618 7.51107 18.9235 7.89532C18.9276 7.97661 18.9269 8.0591 18.9209 8.14249L18.0638 20.1425C17.989 21.1891 17.1181 22 16.0689 22H7.9311C6.88182 22 6.01094 21.1891 5.93618 20.1425L5.07904 8.14249C5.07308 8.0591 5.07231 7.97661 5.07645 7.89531C3.93813 7.51105 3.33874 6.14162 3.98668 5.00772L5.12954 3.00772ZM7.07396 8L7.28824 11H16.7117L16.926 8H7.07396ZM7.71681 17L7.9311 20H16.0689L16.2831 17H7.71681ZM18.2768 6L17.134 4L6.86603 4L5.72317 6H18.2768Z'
                  fill='#5551FE'
                />
              </svg>

              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: 'inline',
                  position: 'relative',
                  top: 2,
                  color: '#5551FE',
                }}
              >
                Sponsors
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-link'>
            <Link to='/setting' style={{ textDecoration: 'none' }}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M13.82 22H10.18C9.71016 22 9.3036 21.673 9.20304 21.214L8.79604 19.33C8.25309 19.0921 7.73827 18.7946 7.26104 18.443L5.42404 19.028C4.97604 19.1709 4.48903 18.9823 4.25404 18.575L2.43004 15.424C2.19763 15.0165 2.2777 14.5025 2.62304 14.185L4.04804 12.885C3.98324 12.2961 3.98324 11.7019 4.04804 11.113L2.62304 9.816C2.27719 9.49837 2.19709 8.98372 2.43004 8.576L4.25004 5.423C4.48503 5.0157 4.97204 4.82714 5.42004 4.97L7.25704 5.555C7.5011 5.37416 7.75517 5.20722 8.01804 5.055C8.27038 4.91269 8.53008 4.78385 8.79604 4.669L9.20404 2.787C9.30411 2.32797 9.71023 2.00049 10.18 2H13.82C14.2899 2.00049 14.696 2.32797 14.796 2.787L15.208 4.67C15.4888 4.79352 15.7623 4.93308 16.027 5.088C16.274 5.23081 16.5127 5.38739 16.742 5.557L18.58 4.972C19.0277 4.82967 19.5142 5.01816 19.749 5.425L21.569 8.578C21.8015 8.98548 21.7214 9.49951 21.376 9.817L19.951 11.117C20.0158 11.7059 20.0158 12.3001 19.951 12.889L21.376 14.189C21.7214 14.5065 21.8015 15.0205 21.569 15.428L19.749 18.581C19.5142 18.9878 19.0277 19.1763 18.58 19.034L16.742 18.449C16.5095 18.6203 16.2678 18.7789 16.018 18.924C15.7559 19.0759 15.4854 19.2131 15.208 19.335L14.796 21.214C14.6956 21.6726 14.2896 21.9996 13.82 22ZM7.62004 16.229L8.44004 16.829C8.62489 16.9652 8.81755 17.0904 9.01704 17.204C9.20474 17.3127 9.39801 17.4115 9.59604 17.5L10.529 17.909L10.986 20H13.016L13.473 17.908L14.406 17.499C14.8133 17.3194 15.1999 17.0961 15.559 16.833L16.38 16.233L18.421 16.883L19.436 15.125L17.853 13.682L17.965 12.67C18.0142 12.2274 18.0142 11.7806 17.965 11.338L17.853 10.326L19.437 8.88L18.421 7.121L16.38 7.771L15.559 7.171C15.1998 6.90671 14.8133 6.68175 14.406 6.5L13.473 6.091L13.016 4H10.986L10.527 6.092L9.59604 6.5C9.39785 6.58704 9.20456 6.68486 9.01704 6.793C8.81878 6.90633 8.62713 7.03086 8.44304 7.166L7.62204 7.766L5.58204 7.116L4.56504 8.88L6.14804 10.321L6.03604 11.334C5.98684 11.7766 5.98684 12.2234 6.03604 12.666L6.14804 13.678L4.56504 15.121L5.58004 16.879L7.62004 16.229ZM11.996 16C9.7869 16 7.99604 14.2091 7.99604 12C7.99604 9.79086 9.7869 8 11.996 8C14.2052 8 15.996 9.79086 15.996 12C15.9933 14.208 14.204 15.9972 11.996 16ZM11.996 10C10.9034 10.0011 10.0139 10.8788 9.99827 11.9713C9.98262 13.0638 10.8466 13.9667 11.9387 13.9991C13.0309 14.0315 13.9469 13.1815 13.996 12.09V12.49V12C13.996 10.8954 13.1006 10 11.996 10Z'
                  fill='#6C757D'
                />
              </svg>

              <p
                className='mx-2 my-auto .dont-break'
                style={{
                  display: 'inline',
                  position: 'relative',
                  top: 2,
                }}
              >
                Settings
              </p>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item className='dropdown-link'>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z'
                fill='#6C757D'
              />
            </svg>

            <p
              className='mx-2 my-auto .dont-break'
              style={{ display: 'inline', position: 'relative', top: 2 }}
            >
              Logout
            </p>
          </Dropdown.Item>
        </Dropdown.Menu>
        {/* <button>
                <p className='mx-2'>More</p>
              </button> */}
      </Dropdown>
    );
  }
}

export default NavDropdown;
