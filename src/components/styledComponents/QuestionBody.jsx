import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './Like';

class QuestionBody extends Component {
  render() {
    const { body } = this.props.question;
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
        </Link>
      </div>
    );
  }
}

export default QuestionBody;
