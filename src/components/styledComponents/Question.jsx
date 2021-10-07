import React, { Component } from 'react';
import EngagementButtons from './EngagementButtons';
import QuestionBody from './QuestionBody';
import QuestionProfile from './QuestionProfile';
import ViewAnswers from './ViewAnswers';

class Question extends Component {
  state = {
    question: this.props.question,
  };
  render() {
    return (
      <div className='question '>
        <QuestionProfile question={this.props.question} />
        <QuestionBody question={this.props.question} />
        <EngagementButtons question={this.props.question} />
        <ViewAnswers />
      </div>
    );
  }
}

export default Question;
