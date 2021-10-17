import React, { Component } from 'react';
// import QuestionBody from './QuestionBody';
import QuestionProfile from './QuestionProfile';

class Answer extends Component {
  render() {
    console.log(this.props.answer);
    return (
      <div className='answer-page'>
        <QuestionProfile question={this.props.answer} />
        <p className='question-answer col ml-2' style={{ fontSize: '16px' }}>
          {this.props.answer.body}
        </p>
      </div>
    );
  }
}

export default Answer;
