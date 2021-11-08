import React, { Component } from 'react';
import '../../loader.scss';

class Loader extends Component {
  state = {
    loading: true,
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    // this displays a retry btn after spinning for a while
    const loading = false;
    setTimeout(() => {
      this.setState({ loading });
    }, 5000);

    return (
      <React.Fragment>
        {this.state.loading === true ? (
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        ) : (
          <div className=' retry-container' style={{ marginTop: '3rem' }}>
            <p id='text'>Something went wrong. Please reload</p>
            <button onClick={this.props.onRefresh} className='btn btn-green '>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mr-1'
              >
                <path
                  d='M18.0011 4H16.0011V6.55709C14.8111 5.622 13.3105 5.0643 11.6797 5.0643C7.81369 5.0643 4.67969 8.19831 4.67969 12.0643C4.67969 15.9303 7.81369 19.0643 11.6797 19.0643C13.8302 19.0643 15.7542 18.0946 17.0382 16.5685L15.4189 15.3837C14.503 16.4147 13.1672 17.0643 11.6797 17.0643C8.91826 17.0643 6.67969 14.8257 6.67969 12.0643C6.67969 9.30288 8.91826 7.0643 11.6797 7.0643C12.7665 7.0643 13.7724 7.41107 14.5926 8L12.0011 8V10H18.0011V4Z'
                  fill='white'
                />
              </svg>
              Retry
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Loader;
