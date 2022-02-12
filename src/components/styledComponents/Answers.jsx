import React, { Component } from "react";
import Answer from "./Answer";

class Answers extends Component {
  render() {
    return (
      <div>
        {this.props.answers.map((answer, i) => (
          <Answer key={i} answer={answer} {...this.props} />
        ))}
      </div>
    );
  }
}

export default Answers;
