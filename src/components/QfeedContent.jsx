import React, { Component } from 'react';
import Question from './styledComponents/Question';
import Questions from './Questions';
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
      <div className='qfeed-container col-md-6 '>
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
