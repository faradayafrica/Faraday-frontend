import React, { Component } from 'react';
import Header from './styledComponents/Header';
import Back from '../images/back.svg';
// import Question from './styledComponents/Question';
import Answers from './styledComponents/Answers';
import QuestionProfile from './styledComponents/QuestionProfile';
import QuestionPageButtons from './styledComponents/QuestionPageButtons';

class QuestionPage extends Component {
  render() {
    const question = this.props.questions.filter(
      q => q._id === this.props.match.params.id
    );
    const newQuestion = {
      ...question[0],
    };
    // console.log(newQuestion);

    return (
      <React.Fragment>
        <div className='header sticky-nav horinzontal-align '>
          <div
            className='icon-container mr-2'
            data-toggle='tooltip'
            title='Return'
            onClick={() => this.props.history.goBack()}
          >
            <img src={Back} alt='' className='e-icon' />
          </div>
          <Header>Qfeed</Header>
        </div>

        <div className='question-page'>
          <QuestionProfile question={newQuestion} />

          {/* question profile ends here */}
          <p className='question-page-content col'>{newQuestion.body}</p>
          <h6>
            <span className='badge badge-brand mr-2'>
              {newQuestion.comment} Answers
            </span>

            <span className='badge badge-info mr-2'>
              {newQuestion.echo} Echoes
            </span>

            <span className='badge badge-primary'>
              {newQuestion.voteCount} Votes
            </span>
          </h6>

          {/* Here comes the buttons */}
          <QuestionPageButtons question={newQuestion} />
        </div>

        <Answers answers={newQuestion.answers} />
      </React.Fragment>
    );
  }
}

export default QuestionPage;
