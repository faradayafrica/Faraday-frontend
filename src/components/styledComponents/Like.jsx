import React, { Component } from 'react';
import dislike from '../../images/dislike.svg';
import disliked from '../../images/disliked.svg';
import like from '../../images/like.svg';
import liked from '../../images/liked.svg';

class Like extends Component {
  state = {
    isLiked: like,
    isDisliked: dislike,
    vote: 2,
  };

  render() {
    let vote = this.state.vote;

    const handleLikeClick = () => {
      console.log(this.state.isLiked);

      if (this.state.isLiked == like) {
        this.setState({
          isLiked: liked,
          isDisliked: dislike,
          vote: this.state.vote + 1,
        });
      }
    };

    const handleDislikeClick = () => {
      console.log('dislike clicked');
      let vote = this.state.vote;

      if (this.state.isDisliked == dislike) {
        this.setState({
          isDisliked: disliked,
          isLiked: like,
          vote: this.state.vote - 1,
        });
      }
    };

    return (
      <div className='like'>
        <img
          className='e-icon'
          onClick={handleLikeClick}
          src={this.state.isLiked}
          alt='like'
        />
        <p className='profile-name'>{this.state.vote}</p>
        <img
          className='e-icon'
          src={this.state.isDisliked}
          alt='disliked'
          onClick={handleDislikeClick}
        />
      </div>
    );
  }
}

export default Like;
