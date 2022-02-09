import React from 'react';

const SubscriptionCard = ({ card }) => {
  return (
    <div className='subscription-card'>
      <div className='subscription-info'>
        <div className='subscription-price'>
          <h4 className='sponsorship-value'>${card.value}</h4>
          <p className='mx-2'>{card.type}</p>
        </div>
        <div>
          <p className='text-md'>{card.description}</p>
        </div>
      </div>
      <div>
        <a href={card.url} rel='noreferrer' target='_blank'>
          <button className='btn btn-dark'>Select</button>
        </a>
      </div>
    </div>
  );
};

export default SubscriptionCard;
