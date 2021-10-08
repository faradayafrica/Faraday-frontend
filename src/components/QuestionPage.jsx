import React, { Component } from 'react';

class QuestionPage extends Component {
  render() {
    return (
      <div>
        <h2>Question Page</h2>
        <p>question body - {this.props.match.params.id}</p>
        <p>{this.props.questions[this.props.match.params.id - 1].name}</p>
      </div>
    );
  }
}

export default QuestionPage;
