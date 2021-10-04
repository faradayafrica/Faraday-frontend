import React, { Component } from 'react';
import '../styles/SideNav.css';

class SideNav extends Component {
  render() {
    return (
      <div>
        <div className='SideNavContainer'>
          <div>
            <p className='badge badge-primary'>Side nav</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNav;
