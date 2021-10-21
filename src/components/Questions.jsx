import React, { Component } from 'react';
import Header from './styledComponents/Header';

class Questions extends Component {
  render() {
    return (
      <div className='' style={{ position: 'relative' }}>
        <div className='header sticky-nav '>
          <Header>Qfeed</Header>
        </div>
        {this.props.renderQuestion()}

        <div className='screen'></div>
      </div>
    );
  }
}

export default Questions;
