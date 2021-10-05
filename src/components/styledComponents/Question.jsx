import React, { Component } from 'react';
import EngagementButtons from './EngagementButtons';
import QuestionBody from './QuestionBody';
import QuestionProfile from './QuestionProfile';

class Question extends Component {
  render() {
    return (
      <div className='question '>
        <QuestionProfile />
        <QuestionBody />
        <EngagementButtons />
      </div>
    );
  }
}

export default Question;
