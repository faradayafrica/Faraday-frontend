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
        <div>
          <Link
            to={`/Qfeed/${this.props.question.id}`}
            style={{ textDecoration: 'none' }}
          >
            <p className='question-content col ml-2'>{body}</p>
          </Link>
            <p className='question-tag col'>{tags.map(tag => (
              <span key={tag} className="icon-container-secondary" style={{padding: "4px 6px"}}>#{tag} </span>
            ))}</p>
        </div>
      </div>
    );
  }
}

export default QuestionBody;
