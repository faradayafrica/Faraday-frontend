import React from "react";
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
import { useEffect } from "react";
import { useState } from "react";

function QuestionPage({
  questions,
  match,
  onRefresh,
  handleLike,
  handleDislike,
  history,
  onAnswer,
  onEcho,
  onBookmark,
}) {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    const question = questions.filter((q) => q.id === match.params.id);
    setQuestion([...question]);
  }, [match.params.id, questions]);

  // console.log(this.props.match.params.id);
  // console.log(question);

  return (
    <React.Fragment>
      {this.props.questions.length === 0 ? (
        <Loader onRefresh={this.props.onRefresh} />
      ) : (
        <React.Fragment>
          {/* <div className=' header-questionpage sticky-nav horinzontal-align '>
              <div
                className='icon-container icon-container-secondary mr-2'
                data-toggle='tooltip'
                title='Return'
                onClick={() => this.props.history.goBack()}
              >
                <img src={Back} alt='' className='e-icon' />
              </div>
              <Header>Question by {question.fname}</Header>
            </div> */}

          <h1 className="section-header mx-3">Question by {question.fname}</h1>
          <div className="question-page">
            <QuestionProfile question={question} />

            <QuestionTitleContainer>
              <Like
                question={question[0]}
                handleDislike={handleDislike}
                handleLike={handleLike}
              />
              <QuestionTitle>
                <h2 className="question__title">{question[0]?.body}</h2>
                <p className="question__tags">
                  {question[0]?.tags.map((tag) => (
                    <span key={tag} className="">
                      #{tag}
                    </span>
                  ))}
                </p>
              </QuestionTitle>
            </QuestionTitleContainer>
            <QuestionContent>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Porttitor laoreet convallis platea nec amet non maecenas. Ipsum
                feugiat eu, ullamcorper odio. Feugiat nisl nibh quis dignissim
                eget faucibus semper. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
              <p>
                Porttitor laoreet convallis platea nec amet non maecenas. Ipsum
                feugiat eu, ullamcorper odio. Feugiat nisl nibh quis dignissim
                eget faucibus semper. This contains more information about the
                question, what have been tried, parameter for the equations, ...
              </p>
            </QuestionContent>

            <ButtonBar
              question={question[0]}
              fluid={true}
              onAnswer={onAnswer}
              onEcho={onEcho}
              onBookmark={onBookmark}
            />
          </div>
          <DropAnswer />
          <Answers
            answers={question[0]?.answers}
            question={question[0]}
            handleDislike={handleDislike}
            handleLike={handleLike}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default QuestionPage;
