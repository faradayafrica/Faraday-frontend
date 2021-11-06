import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './Like';

class QuestionBody extends Component {
  render() {
    const { body, tags } = this.props.question;
    return (
      <div className='question-body horinzontal-align'>
        <Like
          onDislike={this.props.onDislike}
          onLike={this.props.onLike}
          question={this.props.question}
        />
        <Link
          to={`/Qfeed/${this.props.question.id}`}
          style={{ textDecoration: 'none' }}
        >
          <p className='question-content col ml-2'>{body}</p>

          <p className='question-tag col ml-2'>{tags.map(tag => (
            <span key={tag}>#{tag} </span>
          ))}</p>


        </Link>
      </div>
    );
  }
}

export default QuestionBody;
