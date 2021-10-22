import React, { Component } from 'react';

class PostComponent extends Component {
  render() {
    return (
      <div className='form-group post-form'>
        <label className='sr-only' for='newQuestion'>
          Question
        </label>
        <textarea
          className='form-control'
          id='newQuestion'
          rows='3'
          placeholder='Find solutions now'
        ></textarea>

        <div className='post-btn-area'>
          <p
            className='link mx-2'
            dataToggle='tooltip'
            dataPlacement='top'
            title='Help the right people find your question'
          >
            add tags
          </p>
          <button className='btn btn-green add-post-btn mt-2'>Post</button>
        </div>
      </div>
    );
  }
}

export default PostComponent;
