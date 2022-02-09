import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionCard = () => {
  return (
    <div className='subscription-ad p-3'>
      <svg
        width='50'
        height='50'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='mt-4'
      >
        <path
          d='M5.12954 3.00772C5.48563 2.38457 6.14831 2 6.86603 2H17.134C17.8517 2 18.5144 2.38457 18.8704 3.00772L20.0133 5.00772C20.6612 6.14163 20.0618 7.51107 18.9235 7.89532C18.9276 7.97661 18.9269 8.0591 18.9209 8.14249L18.0638 20.1425C17.989 21.1891 17.1181 22 16.0689 22H7.9311C6.88182 22 6.01094 21.1891 5.93618 20.1425L5.07904 8.14249C5.07308 8.0591 5.07231 7.97661 5.07645 7.89531C3.93813 7.51105 3.33874 6.14162 3.98668 5.00772L5.12954 3.00772ZM7.07396 8L7.28824 11H16.7117L16.926 8H7.07396ZM7.71681 17L7.9311 20H16.0689L16.2831 17H7.71681ZM18.2768 6L17.134 4L6.86603 4L5.72317 6H18.2768Z'
          fill='#5551FE'
        />
      </svg>
      <h3 className='mt-2' style={{ maxWidth: '300px' }}>
        Help us keep faraday free for everyone.
      </h3>

      <div className='my-3'>
        <Link to='/sponsors'>
          <button className='btn btn-outline-dark'>Learn more </button>
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionCard;
