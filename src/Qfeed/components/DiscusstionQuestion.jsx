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

const DiscussionQuestion = ({
  question,
  handleQuestionDelete,
  history,
  handleCopyLinkModal,
  getShortLink,
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
    <div className="px-3 py-4">
      <Link
        to={
          token === null || token === undefined
            ? `/login?redirect=${window.origin}/qfeed/${question.id}`
            : `/me/${question?.user.username}`
        }
        style={{ textDecoration: "none" }}
        className="w-11 mr-2 cursor-pointer float-left"
      >
        <img
          src={question?.user.profile_pic}
          className="w-11 h-11 rounded-full mr-2 bg-background2"
          style={{ objectFit: "cover", border: "1px solid #cfd9de" }}
          alt=""
        />
      </Link>
      <p className="m-0 text-night-secondary text-sm flex flex-wrap">
        <span className=" text-faraday-night  author" style={{ margin: 0 }}>
          {question?.user.firstname} {question?.user.lastname}{" "}
        </span>
        <span className="mr-1 min-w-4">
          {question?.user.account_verified && (
            <img src={verify} className="h-5 w-5 ml-1" alt="" />
          )}
        </span>
        <span className="">@{question?.user.username}</span>
      </p>
      <p className="m-0 text-night-secondary text-sm  flex align-middle ">
        {/* <img src={love} className="h-4 w-4 object-fill" alt="" /> */}
        <span className="min-h-4">{question?.user?.department}</span>
      </p>

      <div
        className=" hover:bg-brand-highlight cursor-pointer absolute right-4 top-2 rounded-md"
        onClick={() => {
          setQuestionMenu(!questionMenu);
        }}
      >
        <img
          src={ellipses}
          className="w-6 h-6 rounded-full m-1 "
          style={{ objectFit: "cover" }}
          alt=""
        />
      </div>

      <QuestionMenu
        questionMenu={questionMenu}
        question={question}
        toggleQuestionMenu={toggleQuestionMenu}
        onDeleteQuestion={handleQuestionDelete}
      />

      <div className="mt-4">
        {question.tags && (
          <ul id="tags">
            {question.tags.slice(0, question.tags.length).map((item) => (
              <li
                key={uuid()}
                className="bg-[#ECECF0] mr-2 py-1 mb-2 px-2 rounded-md text-xs font-medium"
              >
                <span className="tag-title">{item.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3
        style={{ lineHeight: "125%" }}
        className=" mt-4 text-lg sm:text-xl font-semibold m-0 "
      >
        {question?.title}
      </h3>
      <p className="m-0 mb-4 mt-1 text-night-secondary text-xs">
        Published {moment(question?.created).fromNow()}
      </p>

      {question && question?.content && (
        <div
          className="mb-4 text-sm text-faraday-night render"
          dangerouslySetInnerHTML={{ __html: question.content }}
        />
      )}

      <div className="action-bar mt-4 pt-4">
        <div className="flex justify-between items-center max-w-lg mx-auto">
          <button
            disabled={type === "echo" || type === "pen" ? true : false}
            className="flex items-center gap-2 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => handleEcho(question.id)}
          >
            <BroadCastIcon
              stroke={
                type === "echo" || type === "pen"
                  ? "rgb(156 163 175 / 1)"
                  : "#6C757D"
              }
            />
            <span>{question.share_count}</span>
          </button>
          <div className="flex justify-between items-center min-w-[4rem]">
            <button onClick={() => handleLike(question.id, "upvote")}>
              {question.vote_status === "upvote" ? (
                <img src={upvoteActive} alt="helpful" />
              ) : (
                <img src={upvote} alt="helpful" />
              )}
            </button>
            <span className="count">{question.vote_rank}</span>
            <button onClick={() => handleLike(question.id, "downvote")}>
              {question.vote_status === "downvote" ? (
                <img src={downvoteActive} alt="not helpful" />
              ) : (
                <img src={downvote} alt="not helpful" />
              )}
            </button>
          </div>
          {/* The add comment button */}

          <Link
            to={`/qfeed/${question.id}`}
            style={{ textDecoration: "none " }}
            className="text-faraday-night hover:text-faraday-night flex items-center gap-2"
          >
            <img src={replyImg} alt="reply" />
            <span className="">
              {question.comment_count === 0
                ? "Reply"
                : `${question.comment_count}`}
            </span>
          </Link>

          <button
            onClick={() => {
              handleCopyLinkModal();
              getShortLink(question.id);
            }}
            className="flex gap-2 items-center"
          >
            <ShareIcon />
            <span className="hidden sm:block">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionQuestion;
