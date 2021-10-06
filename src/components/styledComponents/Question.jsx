import React, { Component } from 'react';
import EngagementButtons from './EngagementButtons';
import QuestionBody from './QuestionBody';
import QuestionProfile from './QuestionProfile';
import ViewAnswers from './ViewAnswers';

class Question extends Component {
  render() {
    return (
      <div className='question '>
        <QuestionProfile />
        <QuestionBody />
        <EngagementButtons />
        <ViewAnswers />
      </div>
    );
  }
}

export default Question;
