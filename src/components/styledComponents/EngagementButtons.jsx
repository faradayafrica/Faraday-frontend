import React, { Component } from 'react';
import comment from '../../images/comment.svg';
import echo from '../../images/echo.svg';
import bookmark from '../../images/bookmark.svg';

class EngagementButtons extends Component {
  render() {
    return (
      <div className=' horinzontal-align rol'>
        <div className='col-1 mr-15'></div>
        <div className='engagement-bar col row'>
          <div className='col txt'>
            <div className='e-btn horinzontal-align'>
              <div className='icon-container'>
                <img src={comment} alt='' />
              </div>
              <p className='engagement-count'>114</p>
            </div>
          </div>
          <div className='col txt'>
            <div className='e-btn horinzontal-align'>
              <div className='icon-container'>
                <img src={echo} alt='' />
              </div>
              <p className='engagement-count'>114</p>
            </div>
          </div>
          <div className='col txt'>
            <div className='e-btn horinzontal-align'>
              <div className='icon-container'>
                <img src={bookmark} alt='' />
              </div>
            </div>
          </div>
          <div className='col' style={{ opacity: 0 }}>
            Icon
          </div>
        </div>
      </div>
    );
  }
}

export default EngagementButtons;
