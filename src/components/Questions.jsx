import React, { Component } from 'react';
import Header from './styledComponents/Header';
import PostComponent from './styledComponents/postComponent';

class Questions extends Component {
  render() {
    return (
      <div className='' style={{ position: 'relative' }}>
        <div className='header sticky-nav '>
          <Header>Qfeed</Header>
        </div>
        <PostComponent onPost={this.props.onPost} />
        {this.props.renderQuestion()}
      </div>
    );
  }
}

export default Questions;
