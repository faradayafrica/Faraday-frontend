import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ViewAnswers extends Component {
  render() {
    return (
      <div className='engagements horinzontal-align'>
        <div className='empty-bar'>
          <div style={{ width: '40px', height: 20 }} className=''></div>
        </div>

        <div className='col ml-2'>
          <Link to='/question' style={{ textDecoration: 'none' }}>
            <p className='view-answers'>View all answers</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default ViewAnswers;
