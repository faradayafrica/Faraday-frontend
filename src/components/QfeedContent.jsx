import React, { Component } from 'react';
import Question from './styledComponents/Question';
import Questions from './Questions';

import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// import { Route } from 'react-router-dom';

// import questionData from '../questions.json';
import QuestionPage from './QuestionPage';
import Loader from './styledComponents/loader';

const apiEndpoint = 'http://localhost:3002/questions';
class Qfeed extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    //this fetch data from the back end
    const { data: questions } = await axios.get(apiEndpoint);

    this.setState({ questions });
  }

  render() {
    return (
      <div className='qfeed-container col '>
        <Switch>
          <Route
            path='/Qfeed/:id'
            render={props => (
              <QuestionPage
                questions={this.state.questions}
                onEcho={this.handleEcho}
                onAnswe={this.handleAnswer}
                onBookmark={this.handleBookmark}
                {...props}
              />
            )}
          />

          <Route
            path='/'
            render={props => (
              <Questions
                renderQuestion={this.renderQuestion}
                onPost={this.handlePost}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  handleAnswer = id => {
    console.log(`I want to answer the question with id of ${id}`);
  };

  handleEcho = id => {
    const questions = [...this.state.questions];
    const newQuestion = questions.filter(q => q.id === id);
    const questionIndex = this.state.questions.indexOf(newQuestion[0]);

    questions[questionIndex].isEchoed = !questions[questionIndex].isEchoed;
    if (!questions[questionIndex].isEchoed) {
      questions[questionIndex].echo--;
    } else {
      questions[questionIndex].echo++;
    }

    this.setState({ questions });
  };

  handleBookmark = id => {
    const questions = [...this.state.questions];
    const newQuestion = questions.filter(q => q.id === id);
    const questionIndex = this.state.questions.indexOf(newQuestion[0]);

    questions[questionIndex].isBookmarked =
      !questions[questionIndex].isBookmarked;

    this.setState({ questions });
  };

  //this method adds a questions
  handlePost = async () => {
    const obj = {
      time: '15h',

      body: 'Just here coding',
    };

    const { data: post } = await axios.post(apiEndpoint, obj);
    const questions = [post, ...this.state.questions];
    this.setState({ questions });
    console.log('post', post);

    // console.log('post');
  };

  // This method renders the questions
  renderQuestion = () => {
    if (this.state.questions.length === 0) {
      return <Loader />;
    } else {
      return (
        <React.Fragment>
          {this.state.questions.map(question => (
            <Question
              key={question.id}
              question={question}
              onAnswer={this.handleAnswer}
              onEcho={this.handleEcho}
              onBookmark={this.handleBookmark}
            />
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
