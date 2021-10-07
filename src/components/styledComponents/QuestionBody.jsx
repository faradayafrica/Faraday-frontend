import React, { Component } from 'react';
import Like from './Like';

class QuestionBody extends Component {
  render() {
    const { body } = this.props.question;
    return (
      <div className='question-body horinzontal-align'>
        {/* the question body */}
        <Like question={this.props.question} />
        <p className='question-content col ml-2'>{body}</p>
      </div>
    );
  }
}

export default QuestionBody;
