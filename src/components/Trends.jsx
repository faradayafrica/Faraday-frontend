import React, { Component } from 'react';
import '../styles/Trends.css';

class Trends extends Component {
  render() {
    return (
      <div>
        <div className='TrendsContainer'>
          <div>
            <p className='badge badge-danger'>Trending</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Trends;
