import React, { Component } from 'react';
import Question from './styledComponents/Question';
import Header from './styledComponents/Header';
class Qfeed extends Component {
  state = {
    questions: [
      {
        name: 'King Fisher',
        username: 'kingpin',
        time: '15h',
        department: 'Computer Science',
        image: '../images/profile1.png',
        body: 'So React or VueJs or Svelte or Angular for you?',
        voteCount: 15,
        comment: 14,
        echo: 5,
      },
      {
        name: 'Olive Ada',
        username: 'peace',
        time: '15h',
        department: 'geology',
        image: '../images/profile2.png',
        body: 'Hello',
        voteCount: 0,
        comment: 42,
        echo: 19,
      },
      {
        name: 'Elon Must',
        username: 'tesla',
        time: '15h',
        department: 'Space exploration',
        image: '../images/profile1.png',
        body: `You’re at a point where you lie to yourself that listening to a podcast is productive. Most podcasts transition quickly from productivity to simple entertainment. Why waste 1h and 30 minutes for just 1 or 2 good ideas..`,
        voteCount: -4,
        comment: 20,
        echo: 2,
      },
    ],
  };

  render() {
    return (
      <div className='qfeed-container col-md-6'>
        <div className='header sticky-nav'>
          <Header>Qfeed</Header>
        </div>

        {this.renderQuestion()}
      </div>
    );
  }

  renderQuestion = () => {
    if (this.state.questions.length === 0) {
      return <p>There are no questions at the moment</p>;
    } else {
      return (
        <React.Fragment>
          {this.state.questions.map(question => (
            <Question key={question.username} question={question} />
          ))}
        </React.Fragment>
      );
    }
  };
}

export default Qfeed;
