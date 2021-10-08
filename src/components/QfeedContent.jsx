import React, { Component } from 'react';
import Question from './styledComponents/Question';
import Questions from './Questions';
import Header from './styledComponents/Header';
import { Route, Switch } from 'react-router-dom';

// import { Route } from 'react-router-dom';

import questionData from '../questions.json';
import QuestionPage from './QuestionPage';

class Qfeed extends Component {
  state = {
    questions: questionData,
  };

  render() {
    return (
      <div className='qfeed-container col-md-6'>
        <div className='header sticky-nav'>
          <Header>Qfeed</Header>
        </div>

        <Switch>
          <Route
            path='/questions/:id'
            render={props => (
              <QuestionPage {...props} questions={this.state.questions} />
            )}
          />
          <Route
            path='/questions'
            render={props => (
              <Questions renderQuestion={this.renderQuestion} {...props} />
            )}
          />
        </Switch>
      </div>
    );
  }

  // This method renders the questions
  renderQuestion = () => {
    if (this.state.questions.length === 0) {
      return <p>There are no questions at the moment</p>;
    } else {
      return (
        <React.Fragment>
          {this.state.questions.map(question => (
            <Question key={question._id} question={question} />
          ))}
        </React.Fragment>
      );
    }
  };
}

export default Qfeed;
