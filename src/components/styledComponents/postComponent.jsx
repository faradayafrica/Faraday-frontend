import React, { Component } from 'react';
import TagsInput from './tagsInput';

class PostComponent extends Component {
  state = {
    isTags: false,
    loading: true,
    tags: ['faraday', 'help'],
  };

  render() {
    const selectedTags = tags => {
      // console.log(tags);
      this.setState({ tags });
      console.log(this.state.tags);
    };

    // const {user} = this.props
   

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
            <div className='horinzontal-align icon-container icon-container-secondary'>
              <svg
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.8971 21.968C12.366 21.9696 11.8565 21.7586 11.4821 21.382L3.64805 13.547C3.23464 13.1348 3.02266 12.5621 3.06805 11.98L3.56805 5.41401C3.63935 4.4264 4.42625 3.64163 5.41405 3.57301L11.9801 3.07301C12.0311 3.06201 12.0831 3.06201 12.1341 3.06201C12.6639 3.06337 13.1718 3.27399 13.5471 3.64801L21.3821 11.482C21.7573 11.8571 21.9681 12.3659 21.9681 12.8965C21.9681 13.4271 21.7573 13.9359 21.3821 14.311L14.3111 21.382C13.9369 21.7583 13.4277 21.9693 12.8971 21.968ZM12.1331 5.06201L5.56205 5.56201L5.06205 12.133L12.8971 19.968L19.9671 12.898L12.1331 5.06201ZM8.65405 10.654C7.69989 10.6542 6.87847 9.98037 6.69213 9.04458C6.5058 8.10879 7.00646 7.17169 7.88792 6.80639C8.76939 6.44109 9.78615 6.74933 10.3164 7.54259C10.8466 8.33586 10.7426 9.39322 10.0681 10.068C9.69388 10.4443 9.18473 10.6553 8.65405 10.654Z'
                  fill='#212529'
                />
              </svg>
              <p
                className='link'
                datatoggle='tooltip'
                dataplacement='top'
                title='Help the right people find your question'
                onClick={this.handleTagClick}
              >
                Add tags
              </p>
            </div>
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
     
        {this.props.user && <p>Hello {this.props.user.first_name} {this.props.user.last_name}</p>}
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
