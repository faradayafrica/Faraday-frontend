import React, { Component } from 'react';
import '../../loader.scss';

class Loader extends Component {
  render() {
    return (
      <div className='loader-container'>
        {/* <div className='push-pop loader'>
          <div />
          <div />
        </div> */}
        <div className='push-out loader'>
          <div />
          <div />
        </div>{' '}
      </div>
    );
  }
}

export default Loader;
