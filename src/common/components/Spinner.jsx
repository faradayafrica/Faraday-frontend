import React from "react";
import "../styles/loader.scss";

class Myspinner extends React.Component {
  render() {
    return (
      <div className="spinner-screen cursor-wait">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
        <p className="text-md spinner-text">Please wait...</p>
      </div>
    );
  }
}

export default Myspinner;
