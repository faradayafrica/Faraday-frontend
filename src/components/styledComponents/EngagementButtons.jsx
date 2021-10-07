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
  };

  render() {
    const handleCommentClick = () => {
      console.log('comment clicked');

      this.state.isCommented === comment
        ? this.setState({ isCommented: commented })
        : this.setState({ isCommented: comment });
    };

    const handleEchoClick = () => {
      console.log('echo clicked');

      this.state.isEchoed === echo
        ? this.setState({ isEchoed: echoed })
        : this.setState({ isEchoed: echo });
    };

    const handleBookmarkClick = () => {
      console.log('bookmark clicked');

      this.state.isBookmarked === bookmark
        ? this.setState({ isBookmarked: bookmarked })
        : this.setState({ isBookmarked: bookmark });
    };

    return (
      <div className='engagements horinzontal-align'>
        <div className='empty-bar'>
          <div style={{ width: '40px', height: 20 }} className=''></div>
        </div>

        <div className='col' style={{ padding: '0px' }}>
          <div className='engagement-bar col horinzontal-align'>
            <div className='col txt'>
              <div
                className='e-btn horinzontal-align'
                onClick={handleCommentClick}
              >
                <div className='icon-container'>
                  <img
                    className='e-icon'
                    src={this.state.isCommented}
                    alt='comment'
                  />
                </div>
                <p className='engagement-count'>114</p>
              </div>
            </div>

            <div className='col txt '>
              <div
                className='e-btn horinzontal-align '
                onClick={handleEchoClick}
              >
                <div className='icon-container'>
                  <img
                    className='e-icon'
                    src={this.state.isEchoed}
                    alt='echo'
                  />
                </div>
                <p className='engagement-count'>114</p>
              </div>
            </div>

            <div className='col txt '>
              <div
                className='e-btn horinzontal-align'
                onClick={handleBookmarkClick}
              >
                <div className='icon-container'>
                  <img
                    className='e-icon'
                    src={this.state.isBookmarked}
                    alt='bookmark'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EngagementButtons;
