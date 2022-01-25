import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as QuestionAnsweredIcon } from "../../images/question-answered.svg";
import { ReactComponent as BroadCastIcon } from "../../images/broadcast-icon.svg";
import { ReactComponent as BookmarkQuestion } from "../../images/bookmark-question.svg";
import {
  EngagementBtn,
  QuestionBodyContent,
} from "../styled/QuestionPageStyled";

function QuestionBody({ question }) {
  const { body, tags, answers } = question;
  // console.log(question);

  // const onBtnClick = (e) => {

  // };

  return (
    <>
      <QuestionBodyContent>
        <div className='question-body horinzontal-align'>
          <div>
            <Link
              to={`/Qfeed/${question.id}`}
              style={{ textDecoration: "none" }}
              className='question__title'
            >
              {body}
            </Link>

            <p className='question__tags'>
              {tags.map((tag) => (
                <span key={tag}>#{tag} </span>
              ))}
            </p>
          </div>
        </div>
      </QuestionBodyContent>
      <EngagementBtn>
        <div className='d-flex align-items-center'>
          <p className='mb-0'>10 Votes</p>
          <p className='mb-0'>{answers.length} Answers</p>
          <QuestionAnsweredIcon fill={answers.length ? "#23933f" : "#C4C4C4"} />
        </div>
        <div>
          <button className='btn' data-icon='broadcast'>
            <BroadCastIcon fill='#fff' stroke='#3F3F41' />
          </button>
          <button className='btn' data-icon='bookmark'>
            <BookmarkQuestion fill='#fff' />
          </button>
        </div>
      </EngagementBtn>
    </>
  );
}

export default QuestionBody;
