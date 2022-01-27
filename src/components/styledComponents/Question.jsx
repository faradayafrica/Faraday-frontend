import React, { Component } from "react";
import QuestionBody from "./QuestionBody";
import QuestionProfile from "./QuestionProfile";

class Question extends Component {
  render() {
    return (
      <div className='question '>
        <QuestionProfile question={this.props.question} />
        <QuestionBody question={this.props.question} />
        {/* <EngagementBtns
          question={this.props.question}
          onEcho={this.props.onEcho}
          onAnswer={this.props.onAnswer}
          onBookmark={this.props.onBookmark}
        /> */}
        {/* <ViewAnswers question ={this.props.question} /> */}
      </div>
    );
  }
}

export default Question;
