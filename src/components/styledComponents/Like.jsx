import React, { Component } from 'react';

class Like extends Component {
  render() {
    const { voteCount } = this.props;
    return (
      <div className='like'>
        <img
          data-toggle='tooltip'
          title='like'
          className='e-icon'
          onClick={this.props.handleLike}
          src={this.props.isLiked}
          alt='like'
        />
        <p className='profile-name'>{voteCount}</p>
        <img
          data-toggle='tooltip'
          title='dislike'
          className='e-icon'
          src={this.props.isDisliked}
          alt='disliked'
          onClick={this.props.handleDislike}
        />
      </div>
    );
  }
}

export default Like;
