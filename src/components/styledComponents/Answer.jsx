import React, { Component } from 'react';
import QuestionProfile from './QuestionProfile';

class Answer extends Component {
  render() {
    const { answer } = this.props;
    let classes = "answer-page "
    answer.answer? classes += "hl": classes += ""
    
    return (
      <div className={classes}>
        <QuestionProfile question={answer} />
        <p className='question-answer col ml-2' style={{ fontSize: '16px' }}>
          {answer.body}
        </p>

{answer.answer? <p className="m-0" style={{fontSize: "14px", fontStyle: 'italic', color: "#23933f"}}>This answer was selected as the best by the owner of the question</p>: <p></p>}
        </div>
   
    );
  }

}

export default Answer;
