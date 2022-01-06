import React, { Component } from "react";
import QfeedContent from "../components/questions/QfeedContent.jsx";

import Trends from "../components/Trends";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <QfeedContent user={this.props.user} />
        <Trends />
      </React.Fragment>
    );
  }
}

export default App;
