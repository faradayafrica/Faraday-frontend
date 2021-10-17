import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MobileSidenav extends Component {
  render() {
    return (
      <div className='mobile-sidenav'>
        <div
          className='icon-container icon-container-secondary hanger-menu mr-2'
          id='sidenav-btn'
          data-toggle='tooltip'
          title='mobile-sidenav'
          onClick={this.handleMobileMenuClick}
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

        <div className='side' onClick={this.handleMobileMenuClick}>
          <div className='side-header'>
            <div
              className='icon-container icon-container-secondary mx-2 '
              data-toggle='tooltip'
              title='logo'
            >
              <svg
                width='97'
                height='24'
                viewBox='0 0 97 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.97475 7.81026H4.73452V17.9491H1.455V7.81026H0V5.15431H1.455V4.50764C1.455 2.93717 1.90151 1.78241 2.79452 1.04336C3.68754 0.304313 5.03476 -0.0421151 6.83618 0.00407568V2.72931C6.05095 2.71391 5.50436 2.84479 5.19642 3.12193C4.88849 3.39907 4.73452 3.89947 4.73452 4.62312V5.15431H6.97475V7.81026Z'
                  fill='#05B851'
                />
                <path
                  d='M7.77677 11.5055C7.77677 10.2122 8.03082 9.0651 8.53891 8.0643C9.0624 7.06351 9.76296 6.29367 10.6406 5.75478C11.5336 5.2159 12.5267 4.94645 13.6199 4.94645C14.5745 4.94645 15.4059 5.13891 16.1141 5.52383C16.8378 5.90875 17.4152 6.39375 17.8463 6.97883V5.15431H21.1027V17.9491H17.8463V16.0783C17.4306 16.6788 16.8532 17.1792 16.1141 17.5795C15.3905 17.9645 14.5514 18.1569 13.5968 18.1569C12.519 18.1569 11.5336 17.8798 10.6406 17.3255C9.76296 16.7712 9.0624 15.9937 8.53891 14.9929C8.03082 13.9767 7.77677 12.8142 7.77677 11.5055ZM17.8463 11.5517C17.8463 10.7664 17.6923 10.0967 17.3844 9.5424C17.0764 8.97272 16.6607 8.54161 16.1372 8.24907C15.6137 7.94113 15.0518 7.78716 14.4513 7.78716C13.8508 7.78716 13.2965 7.93343 12.7884 8.22597C12.2803 8.51851 11.8646 8.94962 11.5413 9.5193C11.2334 10.0736 11.0794 10.7357 11.0794 11.5055C11.0794 12.2753 11.2334 12.9528 11.5413 13.5379C11.8646 14.1076 12.2803 14.5464 12.7884 14.8543C13.3119 15.1622 13.8662 15.3162 14.4513 15.3162C15.0518 15.3162 15.6137 15.1699 16.1372 14.8774C16.6607 14.5695 17.0764 14.1383 17.3844 13.5841C17.6923 13.0144 17.8463 12.3369 17.8463 11.5517Z'
                  fill='#05B851'
                />
                <path
                  d='M38.091 11.5055C38.091 10.2122 38.3451 9.0651 38.8532 8.0643C39.3767 7.06351 40.0772 6.29367 40.9548 5.75478C41.8479 5.2159 42.841 4.94645 43.9341 4.94645C44.8887 4.94645 45.7202 5.13891 46.4284 5.52383C47.1521 5.90875 47.7294 6.39375 48.1605 6.97883V5.15431H51.417V17.9491H48.1605V16.0783C47.7448 16.6788 47.1675 17.1792 46.4284 17.5795C45.7048 17.9645 44.8656 18.1569 43.911 18.1569C42.8333 18.1569 41.8479 17.8798 40.9548 17.3255C40.0772 16.7712 39.3767 15.9937 38.8532 14.9929C38.3451 13.9767 38.091 12.8142 38.091 11.5055ZM48.1605 11.5517C48.1605 10.7664 48.0066 10.0967 47.6986 9.5424C47.3907 8.97272 46.975 8.54161 46.4515 8.24907C45.928 7.94113 45.366 7.78716 44.7656 7.78716C44.1651 7.78716 43.6108 7.93343 43.1027 8.22597C42.5946 8.51851 42.1789 8.94962 41.8556 9.5193C41.5476 10.0736 41.3937 10.7357 41.3937 11.5055C41.3937 12.2753 41.5476 12.9528 41.8556 13.5379C42.1789 14.1076 42.5946 14.5464 43.1027 14.8543C43.6262 15.1622 44.1805 15.3162 44.7656 15.3162C45.366 15.3162 45.928 15.1699 46.4515 14.8774C46.975 14.5695 47.3907 14.1383 47.6986 13.5841C48.0066 13.0144 48.1605 12.3369 48.1605 11.5517Z'
                  fill='#05B851'
                />
                <path
                  d='M53.2815 11.5055C53.2815 10.2122 53.5356 9.0651 54.0437 8.0643C54.5672 7.06351 55.2754 6.29367 56.1685 5.75478C57.0615 5.2159 58.0546 4.94645 59.1477 4.94645C59.9792 4.94645 60.7721 5.13121 61.5265 5.50074C62.281 5.85486 62.8815 6.33216 63.328 6.93264V0.858599H66.6075V17.9491H63.328V16.0552C62.9276 16.6865 62.3657 17.1946 61.642 17.5795C60.9184 17.9645 60.0792 18.1569 59.1246 18.1569C58.0469 18.1569 57.0615 17.8798 56.1685 17.3255C55.2754 16.7712 54.5672 15.9937 54.0437 14.9929C53.5356 13.9767 53.2815 12.8142 53.2815 11.5055ZM63.3511 11.5517C63.3511 10.7664 63.1971 10.0967 62.8892 9.5424C62.5812 8.97272 62.1655 8.54161 61.642 8.24907C61.1185 7.94113 60.5565 7.78716 59.9561 7.78716C59.3556 7.78716 58.8013 7.93343 58.2932 8.22597C57.7851 8.51851 57.3694 8.94962 57.0461 9.5193C56.7381 10.0736 56.5842 10.7357 56.5842 11.5055C56.5842 12.2753 56.7381 12.9528 57.0461 13.5379C57.3694 14.1076 57.7851 14.5464 58.2932 14.8543C58.8167 15.1622 59.371 15.3162 59.9561 15.3162C60.5565 15.3162 61.1185 15.1699 61.642 14.8774C62.1655 14.5695 62.5812 14.1383 62.8892 13.5841C63.1971 13.0144 63.3511 12.3369 63.3511 11.5517Z'
                  fill='#05B851'
                />
                <path
                  d='M68.4721 11.5055C68.4721 10.2122 68.7261 9.0651 69.2342 8.0643C69.7577 7.06351 70.4583 6.29367 71.3359 5.75478C72.2289 5.2159 73.222 4.94645 74.3152 4.94645C75.2698 4.94645 76.1012 5.13891 76.8094 5.52383C77.5331 5.90875 78.1105 6.39375 78.5416 6.97883V5.15431H81.798V17.9491H78.5416V16.0783C78.1259 16.6788 77.5485 17.1792 76.8094 17.5795C76.0858 17.9645 75.2467 18.1569 74.2921 18.1569C73.2143 18.1569 72.2289 17.8798 71.3359 17.3255C70.4583 16.7712 69.7577 15.9937 69.2342 14.9929C68.7261 13.9767 68.4721 12.8142 68.4721 11.5055ZM78.5416 11.5517C78.5416 10.7664 78.3876 10.0967 78.0797 9.5424C77.7717 8.97272 77.356 8.54161 76.8325 8.24907C76.309 7.94113 75.7471 7.78716 75.1466 7.78716C74.5461 7.78716 73.9918 7.93343 73.4837 8.22597C72.9756 8.51851 72.5599 8.94962 72.2366 9.5193C71.9286 10.0736 71.7747 10.7357 71.7747 11.5055C71.7747 12.2753 71.9286 12.9528 72.2366 13.5379C72.5599 14.1076 72.9756 14.5464 73.4837 14.8543C74.0072 15.1622 74.5615 15.3162 75.1466 15.3162C75.7471 15.3162 76.309 15.1699 76.8325 14.8774C77.356 14.5695 77.7717 14.1383 78.0797 13.5841C78.3876 13.0144 78.5416 12.3369 78.5416 11.5517Z'
                  fill='#05B851'
                />
                <path
                  d='M96.7345 5.15431L88.8128 24H85.3716L88.1431 17.6257L83.0159 5.15431H86.6419L89.9445 14.0922L93.2933 5.15431H96.7345Z'
                  fill='#05B851'
                />
                <g clipPath='url(#clip0)'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M22.9556 7.0618V16.1822C22.9556 16.7588 23.1863 17.3354 23.6188 17.7006C23.8783 17.9217 24.1954 18.0658 24.5894 18.0658H34.1999C34.5555 18.0658 34.8727 17.9217 35.0745 17.7679C35.6223 17.3643 35.8241 16.8453 35.8337 16.1726C35.8337 16.1245 35.8433 16.1053 35.8433 16.0572V15.9803C35.8337 14.2312 35.8433 12.4629 35.8433 10.7042C35.3916 10.8579 34.8919 11.0502 34.6132 11.1943C34.5843 11.2039 34.5555 11.2135 34.5267 11.2328V14.2793C34.5267 14.4523 34.5171 14.606 34.5171 14.7694C34.5171 15.0962 34.5171 15.4325 34.5171 15.7689C34.5171 16.4128 34.5651 16.7492 34.0269 16.778C33.9404 16.778 33.8636 16.7684 33.7867 16.778C33.5849 16.8068 26.3481 16.7876 26.1463 16.7876C25.9445 16.7876 25.7715 16.778 25.5793 16.778C25.3102 16.778 24.7048 16.8068 24.4933 16.7107C24.3588 16.6531 24.2819 16.5185 24.2819 16.3359C24.2819 16.2879 24.2723 16.2687 24.2723 16.211C24.2723 16.1629 24.2723 16.1149 24.2723 16.0668C24.2723 15.9611 24.2627 15.8842 24.2627 15.7881L24.2531 12.8569C24.2531 12.4437 24.2627 12.0593 24.2627 11.6556V9.84885C24.2627 9.63741 24.2723 9.46443 24.2723 9.253V7.44622C24.2723 7.22518 24.2531 6.80232 24.4068 6.66777C24.5414 6.54283 24.7048 6.54283 24.8874 6.54283C24.9546 6.54283 24.9738 6.53322 25.0315 6.53322C27.4437 6.50439 29.9233 6.53322 32.3259 6.53322C32.6238 6.53322 33.9308 6.514 34.1615 6.56206C34.3441 6.6005 34.4594 6.68699 34.4979 6.86959C34.5267 7.05219 34.4979 7.27323 34.5171 7.46544C34.5363 7.65765 34.5267 7.8883 34.5267 8.09012C34.5267 8.31117 34.5363 8.49377 34.5363 8.7052V9.22416C34.9399 9.06079 35.3628 8.90702 35.776 8.79169L35.8433 8.76286V7.41739C35.8433 6.92725 35.7857 6.40829 35.5262 6.01426C35.4973 5.95659 35.4589 5.91815 35.4205 5.86049C35.1321 5.49529 34.5555 5.2262 34.075 5.2262H24.7432C24.5029 5.2262 24.2242 5.30308 24.0032 5.38957C23.3401 5.66828 22.9556 6.3314 22.9556 7.0618Z'
                    fill='#05B851'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M29.9235 12.269C29.8562 12.221 29.6736 12.0288 29.6063 11.9519C29.4429 11.7981 29.2796 11.6444 29.097 11.5194L29.0009 11.4521C28.972 11.4329 28.9336 11.4137 28.9047 11.3945C28.8759 11.3656 28.8375 11.3464 28.8086 11.3272C28.3954 11.1254 27.9918 10.9812 27.5208 10.8563C27.1076 10.7602 26.6367 10.6449 26.1946 10.6929C26.1465 10.7025 26.0985 10.7121 26.0504 10.7217C26.0504 10.8851 26.0408 11.0101 26.0408 11.1734C26.0408 11.3176 26.0216 11.481 26.0216 11.6251C26.0216 11.9327 25.9928 12.2306 25.9928 12.5381C26.0312 12.5381 26.0312 12.5285 26.0793 12.5285C26.6655 12.5285 26.9154 12.5381 27.444 12.7399C27.7707 12.8553 28.0686 13.0475 28.3281 13.2685C28.3473 13.2877 28.357 13.2974 28.3762 13.3166C28.4723 13.3839 28.5684 13.4896 28.6453 13.5761L28.7318 13.6818C28.9624 13.9605 29.1354 14.2104 29.3084 14.5275C29.4814 14.8543 29.6159 15.1906 29.7313 15.5366C29.7409 15.5847 29.7601 15.6519 29.7793 15.6904C29.837 15.6615 29.9235 15.6423 29.9907 15.6231L30.6442 15.4117C30.7211 15.3828 30.7884 15.3636 30.8557 15.3444L31.2978 15.2002C31.365 15.181 31.4611 15.1618 31.5188 15.133C31.5188 15.1041 31.5092 15.0657 31.5092 15.0272C31.49 14.8639 31.4611 14.6813 31.4611 14.5083C31.4611 14.4602 31.4515 14.4506 31.4515 14.4026C31.4323 13.8644 31.4804 13.3935 31.6534 12.8841C31.7591 12.5574 31.9224 12.269 32.1147 11.9903L32.2492 11.8077C32.3645 11.6732 32.576 11.4329 32.7105 11.3272C32.8451 11.2119 32.9796 11.0966 33.1238 10.9812L33.316 10.8467C33.4505 10.7506 33.5851 10.6641 33.7292 10.5872C33.9118 10.4719 34.1905 10.3085 34.3923 10.2316C34.4308 10.2124 34.4596 10.1932 34.4981 10.1739C34.5365 10.1547 34.5749 10.1451 34.6134 10.1259C35.0747 9.89524 36.1126 9.53004 36.5931 9.3955L37.1121 9.24173C37.1986 9.2129 37.2851 9.18406 37.3812 9.16484C37.3524 9.11679 37.1698 8.34795 37.1506 8.27107L36.9776 7.60794C36.9583 7.54067 36.9487 7.44456 36.9199 7.3869C36.8046 7.39651 35.882 7.68483 35.7763 7.72327C35.2765 7.86743 34.7575 8.05964 34.277 8.26146C34.229 8.28068 34.1905 8.2999 34.1425 8.31912L33.7581 8.4825C33.7196 8.51133 33.6812 8.53055 33.6331 8.54977C33.5466 8.5786 33.4601 8.62666 33.3832 8.6651C33.143 8.79965 32.9027 8.92458 32.6721 9.07835C32.3741 9.27056 32.0858 9.47238 31.8071 9.69342C31.711 9.77992 31.6053 9.8568 31.5092 9.9529C31.4804 9.99135 31.4515 10.0106 31.4131 10.0394C31.2593 10.1932 31.0959 10.3469 30.9614 10.5199L30.7211 10.8275C30.4424 11.1927 30.2118 11.5771 30.0292 11.9903C30.0003 12.048 29.9235 12.2018 29.9235 12.269Z'
                    fill='#05B851'
                  />
                </g>
                <defs>
                  <clipPath id='clip0'>
                    <rect
                      width='14.4254'
                      height='12.8414'
                      fill='white'
                      transform='translate(22.9556 5.22363)'
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

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
          <Link
            to='/profile'
            style={{
              textDecoration: 'none',
              background: 'brown',
            }}
          >
            <div className='mobile-link'>
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
            </div>
          </Link>

          <Link to='/saved-courses' style={{ textDecoration: 'none' }}>
            <div className='mobile-link'>
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
            </div>
          </Link>

          <Link to='/bookmarks' style={{ textDecoration: 'none' }}>
            <div className='mobile-link'>
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
            </div>
          </Link>

          <Link to='/explore' style={{ textDecoration: 'none' }}>
            <div className='mobile-link'>
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
            </div>
          </Link>

          <Link to='/sponsors' style={{ textDecoration: 'none' }}>
            <div className='mobile-link'>
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
            </div>
          </Link>

          <Link to='/setting' style={{ textDecoration: 'none' }}>
            <div className='mobile-link'>
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
            </div>
          </Link>

          <div className='mobile-link'>
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
          </div>
        </div>
      </div>
    );
  }

  handleMobileMenuClick = () => {
    let mobileSidenav = document.querySelector('.side');

    mobileSidenav.classList.toggle('side-active');
    console.log('Who you wan impress');
  };

  onMenuClick = () => {
    console.log('hello');
  };
}

export default MobileSidenav;
