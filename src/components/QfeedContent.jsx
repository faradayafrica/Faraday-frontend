import React, { Component } from 'react';
import Question from './styledComponents/Question';
import Questions from './Questions';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// import { Route } from 'react-router-dom';

// import questionData from '../questions.json';
import QuestionPage from './QuestionPage';

class Qfeed extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { data: questions } = await axios.get(
      'http://localhost:3002/questions'
    );

    this.setState({ questions });
  }

  render() {
    return (
      <div className='qfeed-container col '>
        <Switch>
          <Route
            path='/Qfeed/:id'
            render={props => (
              <QuestionPage questions={this.state.questions} {...props} />
            )}
          />
          <Route
            path='/'
            render={props => (
              <Questions renderQuestion={this.renderQuestion} {...props} />
            )}
          />

          {/* <Redirect push to='not-found' /> */}
        </Switch>
      </div>
    );
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  // This method renders the questions
  renderQuestion = () => {
    if (this.state.questions.length === 0) {
      return (
        <div className=' retry-container mt-3'>
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
      );
    } else {
      return (
        <React.Fragment>
          {this.state.questions.map(question => (
            <Question key={question.id} question={question} />
          ))}

          <div className='row justify-content-center my-4 '>
            <button
              className='navlink btn btn-sm mb-5'
              style={{ background: '#f8f9fa' }}
            >
              <div className='icon active-icon'></div>
              <p className='mx-2 mb-0' style={{ borderRadius: '8px' }}>
                Load more
              </p>
            </button>
          </div>
        </React.Fragment>
      );
    }
  };
}

export default Qfeed;
