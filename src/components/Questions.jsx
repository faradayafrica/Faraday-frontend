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
        <div className='row justify-content-center my-4 '>
          <button className='navlink btn btn-sm mb-5'>
            <div className='icon active-icon'></div>
            <p className='mx-2 mb-0' style={{ borderRadius: '8px' }}>
              {' '}
              Load more
            </p>
          </button>
        </div>
      </div>
    );
  }
}

export default Questions;
