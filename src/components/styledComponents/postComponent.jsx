import React, { Component } from 'react';
import TagsInput from './tagsInput';

class PostComponent extends Component {
  state = {
    isTags: false,
    tags: ['faraday', 'help'],
  };

  render() {
    const selectedTags = tags => {
      // console.log(tags);
      this.setState({ tags });
      console.log(this.state.tags);
    };

    return (
      <div className='form-group post-form'>
        <label className='sr-only' htmlFor='newQuestion'>
          Question
        </label>
        <textarea
          className='form-control'
          id='newQuestion'
          rows='3'
          placeholder='Ask a question or share an idea'
        ></textarea>

        <div className='post-btn-area mt-2'>
          {this.state.isTags === false ? (
            <p
              className='link'
              datatoggle='tooltip'
              dataplacement='top'
              title='Help the right people find your question'
              onClick={this.handleTagClick}
            >
              add tags
            </p>
          ) : (
            <TagsInput selectedTags={selectedTags} tags={this.state.tags} />
          )}
          <button
            onClick={this.props.onPost}
            className='btn btn btn-green add-post-btn'
          >
            Post
          </button>
        </div>
      </div>
    );
  }

  handleTagClick = () => {
    let isTags = this.state.isTags;
    isTags = !isTags;
    this.setState({ isTags });
  };
}

export default PostComponent;
