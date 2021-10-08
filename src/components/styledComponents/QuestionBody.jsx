import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './Like';

class QuestionBody extends Component {
  render() {
    const { body, voteCount } = this.props.question;
    return (
      <div className='question-body horinzontal-align'>
        <Like
          voteCount={voteCount}
          handleDislike={this.props.handleDislike}
          handleLike={this.props.handleLike}
          isLiked={this.props.isLiked}
          isDisliked={this.props.isDisliked}
        />
        <Link
          to={`/questions/${this.props.question._id}`}
          style={{ textDecoration: 'none' }}
        >
          <p className='question-content col ml-2'>{body}</p>
        </Link>
      </div>
    );
  }
}

export default QuestionBody;
