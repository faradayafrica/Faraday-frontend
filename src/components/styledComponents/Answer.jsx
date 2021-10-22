import React, { Component } from 'react';
// import QuestionBody from './QuestionBody';
import QuestionProfile from './QuestionProfile';

class Answer extends Component {
  render() {
    const { answer } = this.props;
    return (
      <div className='answer-page'>
        <QuestionProfile question={answer} />
        <p className='question-answer col ml-2' style={{ fontSize: '16px' }}>
          {answer.body}
        </p>
      </div>
    );
  }
}

export default Answer;
