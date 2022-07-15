import React, { Component } from "react";
import QfeedContent from "../components/questions/QfeedContent.jsx";

import Trends from "../components/Trends";

class App extends Component {
  render() {
    return (
      <div className="w-full">
        <QfeedContent user={this.props.user} />
        <Trends />
      </div>
    );
  }
}

export default App;
