import React, { Component } from 'react';
import EngagementButtons from './EngagementButtons';
import QuestionBody from './QuestionBody';
import QuestionProfile from './QuestionProfile';
import ViewAnswers from './ViewAnswers';

import dislike from '../../images/dislike.svg';
import disliked from '../../images/disliked.svg';
import like from '../../images/like.svg';
import liked from '../../images/liked.svg';

class Question extends Component {
  state = {
    isLiked: like,
    isDisliked: dislike,
  };
  render() {
    return (
      <div className='question '>
        <QuestionProfile question={this.props.question} />
        <QuestionBody
          question={this.props.question}
          handleDislike={this.handleDislikeClick}
          handleLike={this.handleLikeClick}
          isLiked={this.state.isLiked}
          isDisliked={this.state.isDisliked}
        />
        <EngagementButtons question={this.props.question} />
        <ViewAnswers question={this.props.question} />
      </div>
    );
  }

  // Methods for the like component
  handleLikeClick = () => {
    const question = this.props.question;

    if (this.state.isLiked === like) {
      if (this.state.isDisliked === disliked) {
        this.setState({
          isLiked: liked,
          isDisliked: dislike,
        });
        question.voteCount = question.voteCount + 2;
      } else {
        this.setState({
          isLiked: liked,
        });
        question.voteCount = question.voteCount + 1;
      }
    } else {
      this.setState({
        isLiked: like,
      });
      question.voteCount = question.voteCount - 1;
    }
    console.log('like clicked', question.voteCount);
  };

  handleDislikeClick = () => {
    const question = this.props.question;

    if (this.state.isDisliked === dislike) {
      if (this.state.isLiked === liked) {
        this.setState({
          isDisliked: disliked,
          isLiked: like,
        });
        question.voteCount = question.voteCount - 2;
      } else {
        this.setState({
          isDisliked: disliked,
        });
        question.voteCount = question.voteCount - 1;
      }
    } else {
      this.setState({
        isDisliked: dislike,
      });
      question.voteCount = question.voteCount + 1;
    }
    console.log('dislike clicked', question.voteCount);
  };
}

export default Question;
