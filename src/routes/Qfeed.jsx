import React, { Component } from "react";
// import QfeedContent from "../components/questions/QfeedContent.jsx";
import TimeLine from "../components/qfeedComponents/Timeline.jsx";
class App extends Component {
  render() {
    return (
      <div className="w-full qfeed-wrapper">
        <TimeLine />
      </div>
    );
  }
}

export default App;
