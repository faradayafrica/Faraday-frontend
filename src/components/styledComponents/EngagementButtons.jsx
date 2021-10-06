import React, { Component } from 'react';
import comment from '../../images/comment.svg';
import echo from '../../images/echo.svg';
import bookmark from '../../images/bookmark.svg';

class EngagementButtons extends Component {
  render() {
    return (
      <div className='engagements horinzontal-align'>
        <div className='empty-bar'>
          <div style={{ width: '40px', height: 20 }} className=''></div>
        </div>

        <div className='col' style={{ padding: '0px' }}>
          <div className='engagement-bar col horinzontal-align'>
            <div className='col txt'>
              <div className='e-btn horinzontal-align'>
                <div className='icon-container'>
                  <img className='e-icon' src={comment} alt='' />
                </div>
                <p className='engagement-count'>114</p>
              </div>
            </div>
            <div className='col txt '>
              <div className='e-btn horinzontal-align'>
                <div className='icon-container'>
                  <img className='e-icon' src={echo} alt='' />
                </div>
                <p className='engagement-count'>114</p>
              </div>
            </div>
            <div className='col txt'>
              <div className='e-btn horinzontal-align'>
                <div className='icon-container'>
                  <img className='e-icon' src={bookmark} alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EngagementButtons;
