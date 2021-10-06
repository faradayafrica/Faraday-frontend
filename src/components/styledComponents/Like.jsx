import React, { Component } from 'react';
import dislike from '../../images/dislike.svg';
import like from '../../images/like.svg';

class Like extends Component {
  render() {
    return (
      <div className='like'>
        <img className='e-icon' src={like} alt='' />
        <p className='profile-name'>23</p>
        <img className='e-icon' src={dislike} alt='' />
      </div>
    );
  }
}

export default Like;
