import React, { Component } from 'react';

class ButtonBar extends Component {
  render() {
    const { isEchoed, isAnswered, isBookmarked, id } = this.props.question;

    return (
      <div className='engagement-bar mt-3'>
        <div className={this.renderClasses()}>
          <div className='icon-container p-2'>
            {isAnswered ? (
              <svg
                width='18'
                height='18'
                viewBox='0 0 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.8 0C10.5732 0 11.2 0.626801 11.2 1.4L1.4 1.4L1.4 9.22353C0.626802 9.22353 0 8.59673 0 7.82353V1.4C0 0.6268 0.626801 0 1.4 0H9.8Z'
                  fill='#05B851'
                />
                <path
                  d='M8.4 14L6.53333 12.0235H4.2C3.4268 12.0235 2.8 11.3967 2.8 10.6235V4.2C2.8 3.4268 3.4268 2.8 4.2 2.8H12.6C13.3732 2.8 14 3.4268 14 4.2V10.6235C14 11.3967 13.3732 12.0235 12.6 12.0235H10.2667L8.4 14ZM9.6632 10.6235L12.6 10.6235V4.2L4.2 4.2V10.6235H7.1368L8.4 11.961L9.6632 10.6235Z'
                  fill='#05B851'
                />
                <path
                  d='M3.5 3.5V11H7L8.5 12.5L10 11H13V3.5H3.5Z'
                  fill='#05B851'
                />
              </svg>
            ) : (
              <svg
                width='18'
                height='18'
                viewBox='0 0 14 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.8 0C10.5732 0 11.2 0.626801 11.2 1.4L1.4 1.4L1.4 9.22353C0.626802 9.22353 0 8.59673 0 7.82353V1.4C0 0.6268 0.626801 0 1.4 0H9.8Z'
                  fill='#595959'
                />
                <path
                  d='M8.4 14L6.53333 12.0235H4.2C3.4268 12.0235 2.8 11.3967 2.8 10.6235V4.2C2.8 3.4268 3.4268 2.8 4.2 2.8H12.6C13.3732 2.8 14 3.4268 14 4.2V10.6235C14 11.3967 13.3732 12.0235 12.6 12.0235H10.2667L8.4 14ZM9.6632 10.6235L12.6 10.6235V4.2L4.2 4.2V10.6235H7.1368L8.4 11.961L9.6632 10.6235Z'
                  fill='#595959'
                />
              </svg>
            )}
          </div>
          <div className='icon-container' onClick={() => this.props.onEcho(id)}>
            {isEchoed ? (
              <svg
                width='20'
                height='20'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.77967 8.81327H3V5.2876H8.78055L13 1V13L8.77967 8.81327Z'
                  stroke='#05B851'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5.61792 13.8652V8.84399'
                  stroke='#05B851'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 8.5V5.5H8.5L13 1V13L8.5 8.5H3Z'
                  fill='#05B851'
                  stroke='#05B851'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg
                width='20'
                height='20'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.77967 8.81327H3V5.2876H8.78055L13 1V13L8.77967 8.81327Z'
                  stroke='#595959'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5.61792 13.8652V8.84399'
                  stroke='#595959'
                  strokeWidth='1.3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </div>
          <div
            className='icon-container'
            onClick={() => this.props.onBookmark(id)}
          >
            {isBookmarked ? (
              <svg
                width='20'
                height='20'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 2V13.5V14L8 9.5L12.5 14V2H3Z'
                  fill='#05B851'
                  stroke='#05B851'
                />
              </svg>
            ) : (
              <svg
                width='19'
                height='18'
                viewBox='0 0 15 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8 0H3.4001H2.1001V1.3V12.1615V14L3.4001 12.7L6.43086 9.66924L7.3501 8.75L8.26934 9.66924L11.3001 12.7L12.6001 14V12.1615V6H11.3001V10.8615L8.26934 7.83076C8.02554 7.58696 7.69488 7.45 7.3501 7.45C7.00532 7.45 6.67465 7.58696 6.43086 7.83076L3.4001 10.8615V1.3H8V0Z'
                  fill='#595959'
                />
                <path
                  d='M12.6842 4.89474H11.2105V3.05921H9V1.83553H11.2105V0H12.6842V1.83553H14.8947V3.05921H12.6842V4.89474Z'
                  fill='#595959'
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderClasses = () => {
    let classes = 'engagement-container';
    if (!this.props.fluid) {
      classes += ' container-fluid ';
    }

    return classes;
  };
}

export default ButtonBar;
