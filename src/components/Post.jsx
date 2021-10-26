import React, { Component } from 'react';
import PostComponent from './styledComponents/postComponent';
import Header from './styledComponents/Header';

class Post extends Component {
  render() {
    return (
      <div className='col-md-9 post-page' style={{ position: 'relative' }}>
        <div className='header sticky-nav '>
          <Header>Make a post</Header>
        </div>
        <PostComponent />
      </div>
    );
  }
}

export default Post;
