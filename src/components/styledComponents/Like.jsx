import React, { Component } from 'react';
import dislike from '../../images/dislike.svg';
import disliked from '../../images/disliked.svg';
import like from '../../images/like.svg';
import liked from '../../images/liked.svg';

class Like extends Component {
  state = {
    isLiked: like,
    isDisliked: dislike,
    vote: this.props.question.voteCount,
  };

  render() {
    return (
      <div className='like'>
        <img
          className='e-icon'
          onClick={this.handleLikeClick}
          src={this.state.isLiked}
          alt='like'
        />
        <p className='profile-name'>{this.state.vote}</p>
        <img
          className='e-icon'
          src={this.state.isDisliked}
          alt='disliked'
          onClick={this.handleDislikeClick}
        />
      </div>
    );
  }

  handleLikeClick = () => {
    console.log(this.state.isLiked);

    if (this.state.isLiked === like) {
      this.setState({
        isLiked: liked,
        isDisliked: dislike,
        vote: this.state.vote + 1,
      });
    }
  };

  handleDislikeClick = () => {
    console.log('dislike clicked');
    // let vote = this.state.vote;

    if (this.state.isDisliked === dislike) {
      this.setState({
        isDisliked: disliked,
        isLiked: like,
        vote: this.state.vote - 1,
      });
    }
  };
}

export default Like;
