import React, { Component } from "react";
import { Link } from "react-router-dom";
import { QuestionBodyContent } from "../styled/QuestionBodyStyled";

// import Like from './Like';

class QuestionBody extends Component {
  render() {
    const { body, tags } = this.props.question;
    return (
      <QuestionBodyContent>
        <div className='question-body horinzontal-align'>
          {/* <Like
          onDislike={this.props.onDislike}
          onLike={this.props.onLike}
          question={this.props.question}
        /> */}
          <div>
            <Link
              to={`/Qfeed/${this.props.question.id}`}
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
    );
  }
}

export default QuestionBody;
