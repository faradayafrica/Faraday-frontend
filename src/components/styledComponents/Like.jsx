import React, { Component } from 'react';
import dislike from '../../images/dislike.svg';
import like from '../../images/like.svg';

class Like extends Component {
  render() {
    return (
      <div className='like col-1'>
        <img src={like} alt='' />
        <p className='profile-name'>23</p>
        <img src={dislike} alt='' />
      </div>
    );
  }
}

export default Like;
