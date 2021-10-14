import React, { Component } from 'react';
import faraday from '../images/logo.svg';
import NavLink from './styledComponents/NavLink';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

class SideNav extends Component {
  state = {
    links: [
      {
        item: 'Courses',
        icon: (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM10 16.5V7.5L16 12L10 16.5Z' />
          </svg>
        ),
        focus: false,
      },
      {
        item: 'Qfeed',
        icon: (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2 6.57335V19.3593C2 20.1677 2.32335 20.976 2.92964 21.488C3.29341 21.7979 3.73802 22 4.29042 22H17.7635C18.262 22 18.7066 21.7979 18.9895 21.5823C19.7575 21.0165 20.0404 20.2889 20.0539 19.3458C20.0539 19.2784 20.0674 19.2515 20.0674 19.1841V19.0763C20.0539 16.6243 20.0674 14.1452 20.0674 11.6796C19.4341 11.8952 18.7335 12.1647 18.3428 12.3668C18.3024 12.3802 18.262 12.3937 18.2216 12.4207V16.6916C18.2216 16.9341 18.2081 17.1497 18.2081 17.3787C18.2081 17.8368 18.2081 18.3084 18.2081 18.7799C18.2081 19.6826 18.2755 20.1542 17.521 20.1946C17.3997 20.1946 17.2919 20.1811 17.1841 20.1946C16.9012 20.235 6.75599 20.2081 6.47305 20.2081C6.19012 20.2081 5.94761 20.1946 5.67814 20.1946C5.3009 20.1946 4.4521 20.235 4.15569 20.1003C3.96707 20.0195 3.85928 19.8308 3.85928 19.5749C3.85928 19.5075 3.84581 19.4805 3.84581 19.3997C3.84581 19.3323 3.84581 19.265 3.84581 19.1976C3.84581 19.0494 3.83234 18.9416 3.83234 18.8069L3.81886 14.6976C3.81886 14.1183 3.83234 13.5793 3.83234 13.0135V10.4805C3.83234 10.1841 3.84581 9.94162 3.84581 9.64521V7.11228C3.84581 6.8024 3.81886 6.20958 4.03443 6.02096C4.22305 5.84581 4.4521 5.84581 4.70808 5.84581C4.8024 5.84581 4.82934 5.83234 4.91018 5.83234C8.29192 5.79192 11.768 5.83234 15.1362 5.83234C15.5539 5.83234 17.3862 5.80539 17.7096 5.87275C17.9656 5.92665 18.1272 6.0479 18.1811 6.30389C18.2216 6.55988 18.1811 6.86976 18.2081 7.13922C18.235 7.40868 18.2216 7.73204 18.2216 8.01497C18.2216 8.32485 18.235 8.58084 18.235 8.87725V9.60479C18.8009 9.37575 19.3937 9.16018 19.9731 8.9985L20.0674 8.95808V7.07186C20.0674 6.38473 19.9865 5.65719 19.6228 5.10479C19.5823 5.02395 19.5284 4.97006 19.4746 4.88922C19.0704 4.37725 18.262 4 17.5883 4H4.50599C4.16916 4 3.77844 4.10778 3.46856 4.22904C2.53892 4.61976 2 5.5494 2 6.57335Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M11.7682 13.8734C11.6739 13.806 11.4179 13.5365 11.3236 13.4288C11.0946 13.2132 10.8655 12.9976 10.6095 12.8225L10.4748 12.7282C10.4344 12.7012 10.3805 12.6743 10.3401 12.6473C10.2997 12.6069 10.2458 12.58 10.2054 12.553C9.62601 12.2701 9.06015 12.068 8.39997 11.8928C7.82063 11.7581 7.16045 11.5964 6.54069 11.6638C6.47332 11.6773 6.40596 11.6907 6.33859 11.7042C6.33859 11.9332 6.32512 12.1084 6.32512 12.3374C6.32512 12.5395 6.29817 12.7686 6.29817 12.9707C6.29817 13.4018 6.25775 13.8195 6.25775 14.2506C6.31164 14.2506 6.31164 14.2371 6.37901 14.2371C7.20087 14.2371 7.55116 14.2506 8.29218 14.5335C8.75027 14.6952 9.16793 14.9647 9.5317 15.2746C9.55865 15.3015 9.57212 15.315 9.59907 15.3419C9.7338 15.4362 9.86853 15.5844 9.97631 15.7057L10.0976 15.8539C10.4209 16.2446 10.6634 16.5949 10.906 17.0395C11.1485 17.4976 11.3371 17.9692 11.4988 18.4542C11.5122 18.5216 11.5392 18.6159 11.5661 18.6698C11.647 18.6294 11.7682 18.6024 11.8625 18.5755L12.7787 18.2791C12.8865 18.2386 12.9808 18.2117 13.0751 18.1847L13.6949 17.9826C13.7892 17.9557 13.9239 17.9288 14.0048 17.8883C14.0048 17.8479 13.9913 17.794 13.9913 17.7401C13.9643 17.5111 13.9239 17.2551 13.9239 17.0126C13.9239 16.9452 13.9104 16.9317 13.9104 16.8644C13.8835 16.1099 13.9509 15.4497 14.1934 14.7356C14.3416 14.2776 14.5706 13.8734 14.8401 13.4826L15.0287 13.2267C15.1904 13.038 15.4868 12.7012 15.6754 12.553C15.864 12.3913 16.0527 12.2297 16.2548 12.068L16.5242 11.8794C16.7128 11.7446 16.9015 11.6234 17.1036 11.5156C17.3595 11.3539 17.7503 11.1249 18.0332 11.0171C18.0871 10.9901 18.1275 10.9632 18.1814 10.9362C18.2353 10.9093 18.2892 10.8958 18.3431 10.8689C18.9898 10.5455 20.4449 10.0335 21.1185 9.84492L21.8461 9.62935C21.9673 9.58893 22.0886 9.54851 22.2233 9.52157C22.1829 9.4542 21.9269 8.37636 21.9 8.26857L21.6575 7.33893C21.6305 7.24462 21.617 7.10989 21.5766 7.02905C21.4149 7.04253 20.1215 7.44672 19.9733 7.50061C19.2727 7.70271 18.5452 7.97217 17.8715 8.2551C17.8042 8.28205 17.7503 8.30899 17.6829 8.33594L17.144 8.56498C17.0901 8.6054 17.0362 8.63235 16.9688 8.65929C16.8476 8.69971 16.7263 8.76708 16.6185 8.82097C16.2817 9.00959 15.9449 9.18474 15.6215 9.40031C15.2039 9.66977 14.7997 9.95271 14.4089 10.2626C14.2742 10.3838 14.126 10.4916 13.9913 10.6264C13.9509 10.6802 13.9104 10.7072 13.8566 10.7476C13.641 10.9632 13.4119 11.1788 13.2233 11.4213L12.8865 11.8524C12.4958 12.3644 12.1724 12.9033 11.9164 13.4826C11.876 13.5635 11.7682 13.7791 11.7682 13.8734Z'
            />
          </svg>
        ),
        focus: false,
      },
      {
        item: 'Connect',
        icon: (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19.2 19.4H4.8C3.80589 19.4 3 18.5941 3 17.6V6.7217C3.04195 5.75829 3.83568 4.99909 4.8 5H19.2C20.1941 5 21 5.80589 21 6.8V17.6C21 18.5941 20.1941 19.4 19.2 19.4ZM4.8 8.4812V17.6H19.2V8.4812L12 13.28L4.8 8.4812ZM5.52 6.8L12 11.12L18.48 6.8H5.52Z' />
          </svg>
        ),
        focus: false,
      },
      {
        item: 'Notification',
        icon: (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H14V4.18C16.579 4.792 18 7.036 18 10.5V16L20 17V19ZM12 5.75C10.7797 5.6712 9.60278 6.21728 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16.0528 9.33639 15.7474 8.18458 15.125 7.2C14.3972 6.21728 13.2203 5.6712 12 5.75Z' />
          </svg>
        ),
        focus: false,
      },
    ],
  };

  render() {
    return (
      <div className='sidenav-container  px-2 col-3 order-md-first '>
        <div className='position-fixed'>
          <img
            className='my-4 ml-1 navlink-brand '
            src={faraday}
            alt='faraday'
          />
          <div className=' link-box p-2 position-fixed'>
            {this.state.links.map(link => (
              <NavLink
                key={link.item}
                link={link}
                links={this.state.links}
                handleLink={this.handleLink}
              />
            ))}
            {/* More btn */}
            <Dropdown>
              <Dropdown.Toggle
                className='navlink btn  nav-post-btn '
                variant=''
                id='dropdown-basic'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='#6c757d'
                >
                  <path d='M6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 12.5304 7.78929 13.0391 7.41421 13.4142C7.03914 13.7893 6.53043 14 6 14Z' />
                  <path d='M12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z' />
                  <path d='M18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12C20 12.5304 19.7893 13.0391 19.4142 13.4142C19.0391 13.7893 18.5304 14 18 14Z' />
                </svg>
                <p className='mx-2'>More</p>
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
                <Dropdown.Item className='dropdown-link' href='#/action-1'>
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
            {/* Ask question btn */}
            <Link to='/post' style={{ textDecoration: 'none' }}>
              <button className='navlink btn  btn-green nav-post-btn '>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM4 12.172C4.04732 16.5732 7.64111 20.1095 12.0425 20.086C16.444 20.0622 19.9995 16.4875 19.9995 12.086C19.9995 7.68451 16.444 4.10977 12.0425 4.086C7.64111 4.06246 4.04732 7.59876 4 12V12.172ZM13 17H11V13H7V11H11V7H13V11H17V13H13V17Z'
                    fill='#fff'
                  />
                </svg>
                <p className='mx-2 .dont-break'>Make a post</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  onLinkClick = () => {};

  handleLink = item => {
    // this.props.history.replace(`/${item}`);
    const links = this.state.links.map(link => {
      link.focus = false;
      return link;
    });

    // console.log(links);
    this.state.links
      .filter(link => {
        return link.item === item;
      })
      .map(link => {
        link.focus = true;
        return link;
      });

    // console.log(newLinks);

    this.setState({ links });
  };
}

export default SideNav;
