import React, { Component } from 'react';
import Header from './styledComponents/Header';
import Back from '../images/back.svg';

import Answers from './styledComponents/Answers';
import QuestionProfile from './styledComponents/QuestionProfile';

import Loader from './styledComponents/loader';
import ButtonBar from './styledComponents/buttonBar';

class QuestionPage extends Component {
  render() {
    const { questions, match } = this.props;

    const question = questions.filter(q => q.id === match.params.id);
    const newQuestion = {
      ...question[0],
    };

    // console.log(this.props.match.params.id);
    // console.log(newQuestion);

    return (
      <React.Fragment>
        {this.props.questions.length === 0 ? (
          <Loader onRefresh={this.props.onRefresh}/>
        ) : (
          <React.Fragment>
            <div className=' header-questionpage sticky-nav horinzontal-align '>
              <div
                className='icon-container icon-container-secondary mr-2'
                data-toggle='tooltip'
                title='Return'
                onClick={() => this.props.history.goBack()}
              >
                <img src={Back} alt='' className='e-icon' />
              </div>
              <Header>Question by {newQuestion.fname}</Header>
            </div>
            <div className='question-page'>
              <QuestionProfile question={newQuestion} />

              {/* question profile ends here */}
              <p className='question-page-content'>{newQuestion.body}</p>
              <p className='question-tag ' style={{fontSize: "18px"}}>{newQuestion.tags.map(tag => (
            <span key={tag} className="icon-container-secondary" style={{padding: "4px 6px"}}>#{tag} </span>
          ))}</p>
              
              <h6>
                <span className='badge badge-brand mr-2'>
                  {newQuestion.answers.length} Answers
                </span>

                <span className='badge badge-brand mr-2'>
                  {newQuestion.echo} Echoes
                </span>

                <span className='badge badge-brand'>
                  {newQuestion.voteCount} Votes
                </span>
              </h6>

              {/* Here comes the buttons */}
              {/* <QuestionPageButtons question={newQuestion} /> */}
              <ButtonBar
                question={newQuestion}
                fluid={true}
                onAnswer={this.props.onAnswer}
                onEcho={this.props.onEcho}
                onBookmark={this.props.onBookmark}
              />
            </div>
            <Answers answers={newQuestion.answers} />
            <div style={{ marginBottom: '3.5rem' }}></div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QuestionPage;
