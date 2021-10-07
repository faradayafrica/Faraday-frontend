import React, { Component } from 'react';
import Question from './styledComponents/Question';
import Header from './styledComponents/Header';
class Qfeed extends Component {
  render() {
    return (
      <div className='qfeed-container col-md-6'>
        <div className='header sticky-nav'>
          <Header>Qfeed</Header>
        </div>
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
        <Question />
      </div>
    );
  }
}

export default Qfeed;
