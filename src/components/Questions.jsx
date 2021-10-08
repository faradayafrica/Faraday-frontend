import React, { Component } from 'react';

class Questions extends Component {
  render() {
    return <div>{this.props.renderQuestion()}</div>;
  }
}

export default Questions;
