import React, { Component } from 'react';
import Answer from './Answer';

class Answers extends Component {
  render() {
    return (
      <div>
        {this.props.answers.map(answer => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </div>
    );
  }
}

export default Answers;
