import React, { Component } from "react";
// import QfeedContent from "../components/questions/QfeedContent.jsx";
import TimeLine from "../components/qfeedComponents/Timeline.jsx";

import Trends from "../components/Trends";

class App extends Component {
  render() {
    return (
      <div className="w-full">
        <TimeLine />
      </div>
    );
  }
}

export default App;
