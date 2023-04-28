import { Link } from "react-router-dom";
import moment from "moment";

import QuestionMenu from "./QuestionMenu";
import ellipses from "../assets/ellipses.svg";

import upvote from "../assets/upvote.svg";
import downvote from "../assets/downvote.svg";
import upvoteActive from "../assets/upvote-active.svg";
import downvoteActive from "../assets/downvote-active.svg";
import replyImg from "../assets/reply.svg";
import verify from "../assets/verify.svg";

import { ReactComponent as ShareIcon } from "../assets/share.svg";
import { ReactComponent as BroadCastIcon } from "../assets/broadcast.svg";
import { useState } from "react";

import {
  echoQuestionThunk,
  voteQuestionThunk,
} from "../../common/features/qfeed/qfeedSlice";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import QuestionComponent from "./QuestionComponent";

const DiscussionQuestion = ({
  question,
  handleQuestionDelete,
  history,
  handleCopyLinkModal,
  getShortLink,
  isCopyLinkModal,
  isCopied,
  shortLink,
  handleIsCopied,
  echoMenu,
  setEchoMenu,
}) => {
  const [questionMenu, setQuestionMenu] = useState(false);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const { type } = question;

  const toggleQuestionMenu = () => {
    setQuestionMenu(!setQuestionMenu);
  };

  const handleLike = async (postid, vote) => {
    if (token === null || token === undefined) {
      return history.push(`/login?redirect=${window.origin}/qfeed/${postid}`);
    }

    if (vote === "downvote") {
      dispatch(voteQuestionThunk({ postid, value: "downvote" }));
    } else {
      dispatch(voteQuestionThunk({ postid }));
    }
  };

  function handleEcho(ques_id) {
    dispatch(echoQuestionThunk({ ques_id }));
  }

  return (
    <>
      <QuestionComponent
        type={
          question.type === "echo"
            ? question.type
            : question.type === "pen"
            ? "pen"
            : question.type
        }
        user={
          question.type === "echo" || question.type === "pen"
            ? question.user
            : null
        }
        // question={
        //   question.type === "echo" || question.type === "pen"
        //     ? question.original
        //     : question
        // }
        question={question.type === "echo" ? question.original : question}
        setQuestionMenu={setQuestionMenu}
        handleLike={handleLike}
        handleEcho={handleEcho}
        handleCopyLinkModal={handleCopyLinkModal}
        getShortLink={getShortLink}
        isCopyLinkModal={isCopyLinkModal}
        isCopied={isCopied}
        shortLink={shortLink}
        handleIsCopied={handleIsCopied}
        questionMenu={questionMenu}
        toggleQuestionMenu={toggleQuestionMenu}
        handleQuestionDelete={handleQuestionDelete}
        echoMenu={echoMenu}
        setEchoMenu={setEchoMenu}
        discussionPage={true}
      />
    </>
  );
};

export default DiscussionQuestion;
