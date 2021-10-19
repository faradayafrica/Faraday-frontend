import React, { Component } from 'react';
import comment from '../../images/comment.svg';
import commented from '../../images/commented.svg';
import echo from '../../images/echo.svg';
import echoed from '../../images/echoed.svg';
import bookmark from '../../images/bookmark.svg';
import bookmarked from '../../images/bookmarked.svg';

class EngagementButtons extends Component {
  state = {
    isCommented: comment,
    isEchoed: echo,
    isBookmarked: bookmark,

    commentCount: this.props.question.comment,
    echoCount: this.props.question.echo,
  };

  render() {
    const { isCommented, isEchoed, isBookmarked } = this.state;

    return (
      <div className='' style={{ padding: '0px' }}>
        <div className='engagement-bar col horinzontal-align ml-2'>
          <div className='col txt'>
            <div
              className='e-btn horinzontal-align'
              onClick={this.handleCommentClick}
              data-toggle='tooltip'
              title='Answer'
            >
              <div className='icon-container'>
                <img className='e-icon' src={isCommented} alt='' />
              </div>
            </div>
          </div>

          <div className='col txt '>
            <div
              className='e-btn horinzontal-align '
              onClick={this.handleEchoClick}
              data-toggle='tooltip'
              title='Echo'
            >
              <div className='icon-container'>
                <img className='e-icon' src={isEchoed} alt='' />
              </div>
            </div>
          </div>

          <div className='col txt '>
            <div
              className='e-btn horinzontal-align'
              onClick={this.handleBookmarkClick}
              data-toggle='tooltip'
              title='Bookmark'
            >
              <div className='icon-container'>
                <img className='e-icon' src={isBookmarked} alt='bookmark' />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // This handles the Comment click event
  handleCommentClick = () => {
    const { commentCount } = this.state;
    // console.log('comment clicked');

    this.state.isCommented === comment
      ? this.setState({
          isCommented: commented,
          commentCount: commentCount + 1,
        })
      : this.setState({ isCommented: comment, commentCount: commentCount - 1 });
  };

  // This handles the Echo click event
  handleEchoClick = () => {
    const { echoCount } = this.state;
    // console.log('echo clicked');

    this.state.isEchoed === echo
      ? this.setState({ isEchoed: echoed, echoCount: echoCount + 1 })
      : this.setState({ isEchoed: echo, echoCount: echoCount - 1 });
  };

  // This handles the bookmark click event
  handleBookmarkClick = () => {
    // console.log('bookmark clicked');

    this.state.isBookmarked === bookmark
      ? this.setState({ isBookmarked: bookmarked })
      : this.setState({ isBookmarked: bookmark });
  };

  // This displays the echo and comment count
  renderCount = count => {
    return count === 0 ? ' ' : count;
  };
}

export default EngagementButtons;
