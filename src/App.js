import './App.css';
import QfeedContent from './components/QfeedContent.jsx';
import Body from './components/styledComponents/Body';
import SideNav from './components/SideNav.jsx';
import Trends from './components/Trends';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Body className='row'>
          <SideNav />
          <QfeedContent />
          <Trends />
        </Body>
      </BrowserRouter>
    );
  }
}

export default App;
