import React, { Component } from "react";
import Header from "../styledComponents/Header";
import Back from "../../images/back.svg";

import Answers from "../styledComponents/Answers";
import QuestionProfile from "../styledComponents/QuestionProfile";

import Loader from "../styledComponents/Loader";
import ButtonBar from "../styledComponents/ButtonBar";
import Like from "../styledComponents/Like.jsx";
import {
  QuestionContent,
  QuestionTitle,
  QuestionTitleContainer,
} from "../styled/QuestionPageStyled";
import DropAnswer from "./DropAnswer";

class QuestionPage extends Component {
  render() {
    const { questions, match } = this.props;

    const question = questions.filter((q) => q.id === match.params.id);
    console.log(question);
    const newQuestion = {
      ...question[0],
    };

    // console.log(this.props.match.params.id);
    // console.log(newQuestion);

    return (
      <React.Fragment>
        {this.props.questions.length === 0 ? (
          <Loader onRefresh={this.props.onRefresh} />
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

              <QuestionTitleContainer>
                <Like
                  onDislike={this.props.onDislike}
                  onLike={this.props.onLike}
                  question={question}
                  handleDislike={this.props.handleDislikeClick}
                  handleLike={this.props.handleLikeClick}
                />
                <QuestionTitle>
                  <h2 className='question__title'>{newQuestion.body}</h2>
                  <p className='question__tags'>
                    {newQuestion.tags.map((tag) => (
                      <span key={tag} className=''>
                        #{tag}
                      </span>
                    ))}
                  </p>
                </QuestionTitle>
              </QuestionTitleContainer>
              <QuestionContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Porttitor laoreet convallis platea nec amet non maecenas.
                  Ipsum feugiat eu, ullamcorper odio. Feugiat nisl nibh quis
                  dignissim eget faucibus semper. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
                <p>
                  Porttitor laoreet convallis platea nec amet non maecenas.
                  Ipsum feugiat eu, ullamcorper odio. Feugiat nisl nibh quis
                  dignissim eget faucibus semper. This contains more information
                  about the question, what have been tried, parameter for the
                  equations, ...
                </p>
              </QuestionContent>

              <ButtonBar
                question={newQuestion}
                fluid={true}
                onAnswer={this.props.onAnswer}
                onEcho={this.props.onEcho}
                onBookmark={this.props.onBookmark}
              />
            </div>
            <DropAnswer />
            <Answers answers={newQuestion.answers} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default QuestionPage;
