import React, { Component } from 'react';
import QfeedContent from './QfeedContent.jsx';

import Trends from './Trends';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <QfeedContent />
        <Trends />
      </React.Fragment>
    );
  }
}

export default App;
