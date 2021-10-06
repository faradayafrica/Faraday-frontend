import React, { Component } from 'react';

class ViewAnswers extends Component {
  render() {
    return (
      <div className='engagements horinzontal-align'>
        <div className='empty-bar'>
          <div style={{ width: '40px', height: 20 }} className=''></div>
        </div>

        <div className='col'>
          <p className='view-answers'>View all answers</p>
        </div>
      </div>
    );
  }
}

export default ViewAnswers;
