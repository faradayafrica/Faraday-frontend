import React, { Component } from "react";
import QuestionProfile from "./QuestionProfile";
import { ReactComponent as QuestionAnsweredIcon } from "../../images/question-answered.svg";
import Like from "./Like";

class Answer extends Component {
  render() {
    const { answer } = this.props;

    return (
      <div className='answer-page'>
        <QuestionProfile question={answer} />

        <div className='d-flex'>
          <div className='d-flex flex-column align-items-center'>
            <Like
              onDislike={this.props.onDislike}
              onLike={this.props.onLike}
              question={{}}
            />
            <button className='btn'>
              <QuestionAnsweredIcon
                fill={answer.answer ? "#23933f" : "#C4C4C4"}
              />
            </button>
          </div>

          <p className='question-answer col ml-2' style={{ fontSize: "16px" }}>
            {answer.body}
          </p>
        </div>
      </div>
    );
  }
}

export default Answer;
