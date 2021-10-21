import React, { Component } from 'react';
import Header from './styledComponents/Header';
import Back from '../images/back.svg';
// import Question from './styledComponents/Question';
import Answers from './styledComponents/Answers';
import QuestionProfile from './styledComponents/QuestionProfile';
import QuestionPageButtons from './styledComponents/QuestionPageButtons';

class QuestionPage extends Component {
  refreshPage = () => {
    window.location.reload(false);
  };

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
        {this.props.questions.length === 0 ? (
          <div className=' retry-container' style={{ marginTop: '3rem' }}>
            <p id='text'>Something went wrong. Please reload</p>
            <button onClick={this.refreshPage} className='btn btn-green '>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mr-1'
              >
                <path
                  d='M18.0011 4H16.0011V6.55709C14.8111 5.622 13.3105 5.0643 11.6797 5.0643C7.81369 5.0643 4.67969 8.19831 4.67969 12.0643C4.67969 15.9303 7.81369 19.0643 11.6797 19.0643C13.8302 19.0643 15.7542 18.0946 17.0382 16.5685L15.4189 15.3837C14.503 16.4147 13.1672 17.0643 11.6797 17.0643C8.91826 17.0643 6.67969 14.8257 6.67969 12.0643C6.67969 9.30288 8.91826 7.0643 11.6797 7.0643C12.7665 7.0643 13.7724 7.41107 14.5926 8L12.0011 8V10H18.0011V4Z'
                  fill='white'
                />
              </svg>
              Retry
            </button>
          </div>
        ) : (
          <React.Fragment>
            <div className=' header-questionpage sticky-nav horinzontal-align '>
              <div
                className='icon-container icon-container-secondary mr-2'
                data-toggle='tooltip'
                title='Return'
                onClick={() => this.props.history.goBack()}
              >
                <img src={Back} alt='' className='e-icon' />
              </div>
              <Header>Question by {newQuestion.fname}</Header>
            </div>
            <div className='question-page'>
              <QuestionProfile question={newQuestion} />

              {/* question profile ends here */}
              <p className='question-page-content'>{newQuestion.body}</p>
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
            <div style={{ marginBottom: '3.5rem' }}></div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QuestionPage;
