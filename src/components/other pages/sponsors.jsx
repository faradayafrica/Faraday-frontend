import React, { useState, useEffect } from 'react';
import '../../styles/sponsors.css';
import SubscriptionCard from './../sponsors/SubscriptionCard';

const Sponsors = props => {
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    setSubscription([
      {
        value: '__',
        key: 1,
        type: 'one time pay',
        description: `Choose a custom amount`,
        url: 'https://paystack.com/pay/supportfaraday',
      },
      {
        value: 2,
        key: 2,
        type: 'a month',
        description: `Buy our developers a cup of coffee`,
        url: 'https://paystack.com/pay/faraday',
      },
      {
        value: 30,
        key: 3,
        type: 'a month',
        description: `Your company logo(small) & link will be added to our landing
                  page. This is a manual process, please send us a mail with
                  your logo.`,
        url: 'https://paystack.com/pay/partnerwithfaraday',
      },
    ]);
    document.title = 'Sponsor Faraday';
  }, []);

  return (
    <div className='qfeed__container sponsors-container'>
      <div className='left-side'>
        {/* <div className='header-no-outline sticky-nav over-nav'>
          <div
          className='icon-container icon-container-secondary mr-2'
          data-toggle='tooltip'
          title='Return'
          onClick={() => props.history.goBack()}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              >
              <path
              d='M4.24705 7.20015L7.46905 3.75375L6.20005 2.40015L0.800049 8.16015L6.20005 13.9201L7.46905 12.5665L4.24705 9.12015H15.2V7.20015H4.24705Z'
                fill='#3F3F41'
              />
              </svg>
              </div>
            </div> */}
        <div className='px-3'>
          <h1 className=' section-header'>Sponsor</h1>
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
        </div>
      </div>
      <div className='right-side'>
        <div className='subscription-card-container mx-3'>
          {subscription.map(card => (
            <SubscriptionCard key={card.key} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
