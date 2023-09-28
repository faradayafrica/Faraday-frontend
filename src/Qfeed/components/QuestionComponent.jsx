import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import CopyLink from "./CopyLink";
import QuestionMenu from "./QuestionMenu";
import upvote from "../assets/upvote.svg";
import downvote from "../assets/downvote.svg";
import upvoteActive from "../assets/upvote-active.svg";
import downvoteActive from "../assets/downvote-active.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import { ReactComponent as BroadCastIcon } from "../assets/broadcast.svg";
import { ReactComponent as EllipsesIcon } from "../assets/ellipses.svg";
import { ReactComponent as SolvedIcon } from "../assets/answered_mark.svg";
import verify from "../assets/verify.svg";
import replyImg from "../assets/reply.svg";
import EchoMenu from "./EchoMenu";
import uuid from "react-uuid";
import PennedModal from "./PennedModal";
import Helpers from "../utils/helpers";
import {
  echoQuestionThunk,
  optimisticQuestionVote,
  voteQuestionThunk,
} from "../../common/features/qfeed/qfeedSlice";
import { useDispatch } from "react-redux";

const token = localStorage.getItem("token");

function QuestionComponent({
  history,
  type,
  user,
  question,
  setQuestionMenu,
  handleCopyLinkModal,
  getShortLink,
  isCopyLinkModal,
  isCopied,
  shortLink,
  handleIsCopied,
  questionMenu,
  toggleQuestionMenu,
  handleQuestionDelete,
  echoMenu,
  setEchoMenu,
  discussionPage,
}) {
  // console.log(question)
  const [isPennedOpen, setIsPennedOpen] = React.useState(false);
  // console.log(type, question.type);

  const dispatch = useDispatch();

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

  const QuestionBodyComp = (
    <>
      {/* Question head */}
      <h3
        className={`${
          discussionPage
            ? "mt-4 text-lg sm:text-xl font-semibold m-0 "
            : "text-base font-semibold m-0 mb-1 md:text-lg"
        }`}
      >
        {question?.title}
      </h3>
      {discussionPage && (
        <p className="m-0 mb-4 mt-1 text-night-secondary text-xs">
          Published {moment(question?.created).fromNow()}
        </p>
      )}{" "}
      {/* {Boolean(question.has_solution) && (
        <div className="bg-[#F1FBEF] inline-block py-1 px-3 rounded-full text-[#2C974B] font-medium text-xs mb-2">
          Solved
        </div>
      )} */}
      {/* Question body without a selected solution --optional */}
      {question && question?.content && (
        <div
          className="mb-4 text-sm text-faraday-night render truncate-render"
          style={{ marginTop: 0 }}
          dangerouslySetInnerHTML={{ __html: question.content }}
        />
      )}
    </>
  );
  // console.log(question, type);
  return (
    <div className="question-card">
      <QuestionMenu
        questionMenu={questionMenu}
        question={question}
        toggleQuestionMenu={toggleQuestionMenu}
        onDeleteQuestion={handleQuestionDelete}
      />
      <EchoMenu
        question={question}
        echoMenu={echoMenu}
        setEchoMenu={setEchoMenu}
        handleEcho={() => handleEcho(question.id)}
        setIsPennedOpen={setIsPennedOpen}
      />
      <PennedModal
        question={question}
        isPennedOpen={isPennedOpen}
        setIsPennedOpen={setIsPennedOpen}
      />
      <div
        id="container__questions relative bg-danger"
        className=" bg-white"
        style={{ marginBottom: ".3rem" }}
      >
        {type === "echo" && discussionPage === false && (
          <div className="flex items-center gap-2 border-b-[1px] border-[#f5f5f5] py-1 px-3 text-xs">
            <BroadCastIcon className="w-3 h-3" />
            <span>
              echoed by{" "}
              <Link
                to={`/me/${user.username}`}
                style={{ textDecoration: "none" }}
                className="text-faraday-night hover:text-faraday-night "
              >
                @{user.username}
              </Link>
            </span>
          </div>
        )}
        <div
          className={`${
            discussionPage ? "" : "border-b border-b-[#ECECF0]"
          } px-3 py-3 sm:pt-4 relative `}
        >
          <div className={`flex justify-start items-start `}>
            {discussionPage === false && (
              <Link
                to={
                  token === null || token === undefined
                    ? `/login?redirect=${window.origin}/qfeed/${question.id}`
                    : `/me/${question?.user.username}`
                }
                style={{ textDecoration: "none" }}
                className="w-10 mr-2 cursor-pointer hidden md:block"
              >
                <img
                  src={question?.user.profile_pic}
                  className="w-10 h-10 rounded-full bg-background2"
                  style={{ objectFit: "cover", border: "1px solid #cfd9de" }}
                  alt=""
                />
              </Link>
            )}
            <section className=" p-0 w-full">
              <div className=" pr-2 relative">
                <div className="flex items-center">
                  {/* Profile details */}
                  {discussionPage === true && (
                    <Link
                      to={
                        token === null || token === undefined
                          ? `/login?redirect=${window.origin}/qfeed/${question.id}`
                          : `/me/${question?.user.username}`
                      }
                      style={{ textDecoration: "none" }}
                      className="mr-2 cursor-pointer"
                    >
                      <img
                        src={question?.user.profile_pic}
                        className="w-10 h-10 rounded-full bg-background2"
                        style={{
                          objectFit: "cover",
                          border: "1px solid #cfd9de",
                        }}
                        alt=""
                      />
                    </Link>
                  )}
                  <div>
                    <p className="flex m-0 text-night-secondary text-xs sm:text-sm justify-between">
                      {discussionPage === false && (
                        <Link
                          to={
                            token === null || token === undefined
                              ? `/login?redirect=${window.origin}/qfeed/${question.id}`
                              : `/me/${question?.user.username}`
                          }
                          style={{ textDecoration: "none" }}
                          className="min-w-[18px] h-auto mr-1 cursor-pointer  md:hidden"
                        >
                          <img
                            src={question?.user.profile_pic}
                            className="w-6 rounded-full bg-background2"
                            style={{
                              objectFit: "cover",
                              border: "1px solid #cfd9de",
                            }}
                            alt=""
                          />
                        </Link>
                      )}
                      <div className="">
                        <div className="flex ">
                          <span className=" font-semibold text-faraday-night shorten">
                            {question?.user.firstname} {question?.user.lastname}{" "}
                          </span>
                          <span className="mr-1">
                            {question?.user.account_verified && (
                              <img
                                src={verify}
                                className="h-[14px] w-[14px] sm:h-5 sm:w-5 ml-1"
                                alt=""
                              />
                            )}
                          </span>
                          <span className="mr-1 ">
                            @{question?.user.username}{" "}
                          </span>{" "}
                          {discussionPage === false && (
                            <span className="shorten-time">
                              {moment(question?.created).fromNow()}
                            </span>
                          )}
                        </div>
                        <p className="m-0 text-night-secondary text-xs  flex align-middle ">
                          {/* <img src={love} className="h-4 w-4 object-fill" alt="" /> */}
                          <span className="min-h-4">
                            {question?.user?.department}
                          </span>
                        </p>
                      </div>
                    </p>
                  </div>

                  <button
                    className=" hover:bg-brand-highlight cursor-pointer absolute right-1 top-[-8px] rounded-md"
                    onClick={() => {
                      setQuestionMenu(!questionMenu);
                    }}
                  >
                    <EllipsesIcon className="w-6 h-6 rounded-full m-1 " />
                  </button>
                </div>

                <div className="mt-4">
                  {discussionPage === true
                    ? question.tags && (
                        <ul id="tags">
                          {question.tags
                            .slice(0, question.tags.length)
                            .map((item) => (
                              <li
                                key={uuid()}
                                className="bg-[#ECECF0] mr-2 py-1 mb-2 px-2 rounded-md text-xs font-medium"
                              >
                                <span className="tag-title">{item.name}</span>
                              </li>
                            ))}
                        </ul>
                      )
                    : null}
                </div>

                {/* <Modal
              icon={info}
              visible={disclaimer}
              action={() => setDisclaimer(false)}
              title={`Disclaimer`}
              message={`Unless the account that created the question is the Faraday
                  official account, we can't take responsibility for the comment
                  marked as a solution.`}
            /> */}
                {question?.created !== "Just now" ? (
                  <>
                    {discussionPage === true ? (
                      QuestionBodyComp
                    ) : (
                      <Link
                        to={`/qfeed/${question.id}`}
                        style={{ textDecoration: "none" }}
                        className={`text-faraday-night hover:text-faraday-night `}
                      >
                        {QuestionBodyComp}
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-base font-semibold m-0 mb-1 md:text-lg">
                      {question?.title}
                    </h3>
                    {/* Question body --optional */}
                    {question && question?.content && (
                      <div
                        className="mb-4 text-sm text-faraday-night render"
                        style={{ marginTop: 0 }}
                        dangerouslySetInnerHTML={{ __html: question.content }}
                      />
                    )}
                  </>
                )}
              </div>

              {type === "pen" ? (
                <>
                  <PinnedQuestion question={question.original} />
                </>
              ) : null}

              <div className="action-bar mt-4 pt-2">
                <div
                  className={`flex justify-between items-center max-w-lg ${
                    discussionPage ? "mx-auto" : ""
                  }`}
                >
                  <button
                    disabled={type === "echo" || type === "pen" ? true : false}
                    className="flex items-center gap-2 disabled:text-gray-400 disabled:cursor-not-allowed"
                    onClick={() => setEchoMenu(true)}
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
                    <button
                      onClick={() => {
                        dispatch(
                          optimisticQuestionVote({
                            questionid: question.id,
                            value: {
                              rank:
                                question.vote_status === null
                                  ? question.vote_rank + 1
                                  : question.vote_status === "upvote"
                                  ? question.vote_rank - 1
                                  : question.vote_status === "downvote" &&
                                    question.vote_rank + 2,
                              status:
                                question.vote_status === "upvote"
                                  ? null
                                  : "upvote",
                            },
                          })
                        );
                        handleLike(question.id, "upvote");
                      }}
                    >
                      {question.vote_status === "upvote" ? (
                        <img src={upvoteActive} alt="helpful" />
                      ) : (
                        <img src={upvote} alt="helpful" />
                      )}
                    </button>
                    <span className="count">{question.vote_rank}</span>
                    <button
                      onClick={() => {
                        dispatch(
                          optimisticQuestionVote({
                            questionid: question.id,
                            value: {
                              rank:
                                question.vote_status === null
                                  ? question.vote_rank - 1
                                  : question.vote_status === "downvote"
                                  ? question.vote_rank + 1
                                  : question.vote_status === "upvote" &&
                                    question.vote_rank - 2,
                              status:
                                question.vote_status === "downvote"
                                  ? null
                                  : "downvote",
                            },
                          })
                        );
                        handleLike(question.id, "downvote");
                      }}
                    >
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
                    {Boolean(question.has_solution) ? (
                      <SolvedIcon />
                    ) : (
                      <img src={replyImg} alt="reply" />
                    )}
                    <span
                      className={`${
                        Boolean(question.has_solution) ? "text-green-600" : ""
                      }`}
                    >
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
                    className="flex gap-2 items-center mr-2 md:mr-0"
                  >
                    <ShareIcon />
                    <span className="hidden sm:block">Share</span>
                  </button>
                </div>
              </div>

              <CopyLink
                isCopyLinkModal={isCopyLinkModal}
                isCopied={isCopied}
                shortLink={shortLink}
                toggleCopyLinkModal={handleCopyLinkModal}
                handleIsCopied={handleIsCopied}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionComponent;

export function PinnedQuestion({ question }) {
  return (
    <div
      style={{ borderLeft: "3px solid #BFC9D2" }}
      className={`p-3 bg-background`}
    >
      <p className="flex m-0 text-night-secondary mb-1 text-xs sm:text-sm">
        <span className="mr-2 font-semibold text-night-secondary flex items-center text-xs">
          {question?.user.firstname} {question?.user.lastname}{" "}
          {question?.user.account_verified && (
            <img src={verify} className="h-3 w-3 ml-1" alt="" />
          )}
        </span>
        <span className="mr-2 ">@{question?.user.username} </span>{" "}
        <span>{moment(question?.created).fromNow()}</span>
      </p>
      <Link
        to={`/qfeed/${question?.id}`}
        style={{ textDecoration: "none" }}
        className={`text-night-secondary hover:text-faraday-night `}
      >
        <h3 className="text-base font-semibold m-0 mb-1 md:text-lg">
          {question?.title}
        </h3>
        {/* Question body --optional */}

        {question?.original && question?.content && (
          <div
            className="mb-4 text-sm text-faraday-night render truncate-render"
            style={{ marginTop: 0 }}
            dangerouslySetInnerHTML={{ __html: question?.content }}
          />
        )}
      </Link>
    </div>
  );
}
