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
import verify from "../assets/verify.svg";
import replyImg from "../assets/reply.svg";

const token = localStorage.getItem("token");

function QuestionComponent({
  type,
  user,
  question,
  setQuestionMenu,
  handleLike,
  handleEcho,
  handleCopyLinkModal,
  getShortLink,
  isCopyLinkModal,
  isCopied,
  shortLink,
  handleIsCopied,
  questionMenu,
  toggleQuestionMenu,
  handleQuestionDelete,
}) {
  return (
    <div id='container__questions' className=' bg-white'>
      {type === "echo" && (
        <div className='flex items-center gap-2 text-sm border-b-2 border-[#f5f5f5] py-1 px-3'>
          <BroadCastIcon />{" "}
          <span>
            echoed by{" "}
            <Link
              to={`/me/${user.username}`}
              style={{ textDecoration: "none" }}
              className='text-faraday-night hover:text-faraday-night '
            >
              @{user.username}
            </Link>
          </span>
        </div>
      )}
      <div
        className={`question-component px-3 py-3 sm:pt-4 relative ${
          Boolean(question.has_solution) ? "border-r-4 border-green-600" : ""
        }`}
      >
        <div className='flex justify-start items-start '>
          <Link
            to={
              token === null || token === undefined
                ? `/login?redirect=${window.origin}/qfeed/${question.id}`
                : `/me/${question?.user.username}`
            }
            style={{ textDecoration: "none" }}
            className='w-14 mr-2 cursor-pointer hidden md:block'
          >
            <img
              src={question?.user.profile_pic}
              className='w-12 h-12 rounded-full bg-background2'
              style={{ objectFit: "cover" }}
              alt=''
            />
          </Link>
          <section className=' p-0 w-full'>
            <div className=' pr-2 relative'>
              <div className='flex items-center justify-between'>
                {/* Profile details */}
                <p className='flex m-0 text-night-secondary mb-1 text-xs sm:text-sm'>
                  <span className='mr-2 font-semibold text-faraday-night flex items-center text-sm'>
                    {question?.user.firstname} {question?.user.lastname}{" "}
                    {question?.user.account_verified && (
                      <img src={verify} className='h-5 w-5 ml-1' alt='' />
                    )}
                  </span>
                  <span className='mr-2 '>@{question?.user.username} </span>{" "}
                  <span>{moment(question?.created, "YYYYMMDD").fromNow()}</span>
                </p>

                <button
                  className=' hover:bg-brand-highlight cursor-pointer absolute right-1 top-[-8px] rounded-md'
                  onClick={() => {
                    setQuestionMenu(!questionMenu);
                  }}
                >
                  <EllipsesIcon className='w-6 h-6 rounded-full m-1 ' />
                </button>

                <QuestionMenu
                  questionMenu={questionMenu}
                  question={question}
                  toggleQuestionMenu={toggleQuestionMenu}
                  onDeleteQuestion={handleQuestionDelete}
                />
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
                <Link
                  to={`/qfeed/${question.id}`}
                  style={{ textDecoration: "none" }}
                  className={`text-faraday-night hover:text-faraday-night `}
                >
                  {/* Question head */}
                  <h3 className='text-lg font-semibold m-0 mb-1 md:text-xl'>
                    {question?.title}
                  </h3>

                  {/* Question body without a selected solution --optional */}
                  {question && question?.content && (
                    <div className='text-sm sm:text-base m-0 mb-2'>
                      {question?.content?.split("\n").map((item, idx) => (
                        <p className='mb-1' key={idx}>
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                </Link>
              ) : (
                <>
                  <h3 className='text-lg font-semibold m-0 mb-1 md:text-xl'>
                    {question?.title}
                  </h3>
                  {/* Question body --optional */}
                  <p className='text-sm sm:text-base m-0 mb-2'>
                    {question?.content}
                  </p>
                </>
              )}
            </div>

            {question.type === "pen" ? (
              <>
                <PinnedQuestion question={question.original} />
              </>
            ) : null}

            <div className='action-bar mt-3'>
              <div className='flex justify-between items-center max-w-lg mx-auto'>
                <button
                  disabled={type === "echo" || type === "pen" ? true : false}
                  className='flex items-center gap-2 disabled:text-gray-400 disabled:cursor-not-allowed'
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
                <div className='flex justify-between items-center min-w-[4rem]'>
                  <button onClick={() => handleLike(question.id, "upvote")}>
                    {question.vote_status === "upvote" ? (
                      <img src={upvoteActive} alt='helpful' />
                    ) : (
                      <img src={upvote} alt='helpful' />
                    )}
                  </button>
                  <span className='count'>{question.vote_rank}</span>
                  <button onClick={() => handleLike(question.id, "downvote")}>
                    {question.vote_status === "downvote" ? (
                      <img src={downvoteActive} alt='not helpful' />
                    ) : (
                      <img src={downvote} alt='not helpful' />
                    )}
                  </button>
                </div>
                {/* The add comment button */}

                <Link
                  to={`/qfeed/${question.id}`}
                  style={{ textDecoration: "none " }}
                  className='text-faraday-night hover:text-faraday-night flex items-center gap-2'
                >
                  <img src={replyImg} alt='reply' />
                  <span className=''>
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
                  className='flex gap-2 items-center'
                >
                  <ShareIcon />
                  <span className='hidden sm:block'>Share</span>
                </button>
              </div>

              {/* Hide replies section
        {comment?.reply_count ? (
          <>
            {comment?.replies?.showReply ? (
              <div
                onClick={() => {
                  dispatch(
                    hideSecondReply({
                      commentid: comment.id,
                    })
                  );
                  setHideReplies(false);
                }}
                className='show-replies'
              >
                <img src={hide} alt='hide' />{" "}
                <span className='desktop'>
                  Hide replies ({comment.reply_count})
                </span>
                <span className='mobile'>{comment.reply_count}</span>
              </div>
            ) : (
              <div
                onClick={() => {
                  dispatch(
                    fetchSecondLevelCommentThunk({ commentid: comment?.id })
                  );
                  setHideReplies(true);
                }}
                className='show-replies'
              >
                <img src={show} alt='show' />
                <span className='desktop'>
                  Show replies ({comment.reply_count})
                </span>
                <span className='mobile'>{comment.reply_count}</span>
              </div>
            )}{" "}
          </>
        ) : (
          ""
        )} */}
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
  );
}

export default QuestionComponent;

function PinnedQuestion({ question }) {
  return (
    <div
      className={`border border- rounded-md p-3  ${
        Boolean(question.has_solution) ? "border-r-4 border-green-600" : ""
      }`}
    >
      <p className='flex m-0 text-night-secondary mb-1 text-xs sm:text-sm'>
        <span className='mr-2 font-semibold text-faraday-night flex items-center text-sm'>
          {question?.user.firstname} {question?.user.lastname}{" "}
          {question?.user.account_verified && (
            <img src={verify} className='h-5 w-5 ml-1' alt='' />
          )}
        </span>
        <span className='mr-2 '>@{question?.user.username} </span>{" "}
        <span>{moment(question?.created, "YYYYMMDD").fromNow()}</span>
      </p>
      <Link
        to={`/qfeed/${question.id}`}
        style={{ textDecoration: "none" }}
        className={`text-faraday-night hover:text-faraday-night `}
      >
        <h3 className='text-lg font-semibold m-0 mb-1 md:text-xl'>
          {question?.title}
        </h3>
        {/* Question body --optional */}
        <p className='text-sm sm:text-base m-0 mb-2'>{question?.content}</p>
      </Link>
    </div>
  );
}
