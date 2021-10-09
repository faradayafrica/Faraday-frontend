import React, { Component } from 'react';
import Header from './styledComponents/Header';

class Questions extends Component {
  render() {
    return (
      <div>
        <div className='header sticky-nav'>
          <Header>Qfeed</Header>
        </div>
        {this.props.renderQuestion()}
      </div>
    );
  }
}

export default Questions;
