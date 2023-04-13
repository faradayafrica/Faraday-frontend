import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ellipses from "../../assets/ellipses.svg";
import info from "../../assets/info.svg";
import CommentMenu from "./CommentMenu";
import Modal from "../../../common/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import SecondLevelComment from "./SecondLevelComment";
import {
  createSecondLevelCommentThunk,
  fetchSecondLevelCommentThunk,
  hideSecondReply,
  optimisticCommentVote,
  QfeedStates,
  voteCommentThunk,
} from "../../../common/features/qfeed/qfeedSlice";
import uuid from "react-uuid";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import upvoteActive from "../../assets/upvote-active.svg";
import downvoteActive from "../../assets/downvote-active.svg";
import verify from "../../assets/verify.svg";

import replyImg from "../../assets/reply.svg";

import hide from "../../assets/hide.svg";
import show from "../../assets/show.svg";
import "../../styles/comment.css";
import AddReply from "./AddReply";
import { ErrorToast } from "../../../common/components/CustomToast";
import "react-quill/dist/quill.snow.css";
import LazyReply from "./LazyReply";

const CommentComponent = ({ match, comment, onDeleteComment }) => {
  const [commentMenu, setCommentMenu] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const [newReply, setNewReply] = useState("");

  const { question, check } = useSelector((state) => state.qfeed.thisQuestion);
  const { replyStatus: status } = useSelector(
    (state) => state.qfeed.thisQuestion
  );
  const dispatch = useDispatch();

  const toggleCommentMenu = () => {
    setCommentMenu(!commentMenu);
  };

  const postReply = (limit) => {
    if (newReply.length > limit || newReply.length === 0) {
      ErrorToast("Your comment is too long");
    } else {
      let content = newReply;
      dispatch(
        createSecondLevelCommentThunk({
          commentid: comment.id,
          content,
        })
      );
    }
  };

  const handleChange = (value) => {
    setNewReply(value);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (status === QfeedStates.SUCCESSFUL) {
      // this prevents multiple comments showing the loading state
      setShowReplies(false);
    }
    if (status === QfeedStates.SENT) {
      setNewReply("");
      setShowAddReply(false);
    }
  }, [status]);

  return (
    <div className={`comment-wrapper ${comment.is_solution && "solution"} `}>
      <div className="content-wrapper">
        <Link
          to={
            token === null || token === undefined
              ? `/login?redirect=${window.origin}/qfeed/${comment.id}`
              : `/me/${comment?.user.username}`
          }
          style={{ textDecoration: "none" }}
          className="profile-img"
        >
          <img
            src={comment?.user?.profile_pic}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </Link>

        <div className="offset">
          <div className="user">
            <p className="author" style={{ margin: 0 }}>
              {comment.user.firstname} {comment.user.lastname}{" "}
            </p>
            <p className="author">
              {question?.user.account_verified && (
                <img src={verify} className="h-5 w-5 ml-1" alt="" />
              )}
            </p>
            <p className="username">@{comment.user.username}</p>
            <p className="time">{moment(comment?.created).fromNow()} </p>

            <div
              className=" cursor-pointer absolute right-[-6px] top-2 rounded-md"
              onClick={() => {
                toggleCommentMenu(comment);
              }}
            >
              <img
                src={ellipses}
                className="w-6 h-6 rounded-full m-1 "
                style={{ objectFit: "cover" }}
                alt=""
              />
            </div>
            {commentMenu && (
              <CommentMenu
                match={match}
                questionOwner={question.user}
                selectedComment={comment}
                onToggleCommentMenu={toggleCommentMenu}
                onDeleteComment={onDeleteComment}
                is_solution={comment.is_solution}
              />
            )}
          </div>

          {/* Render the content */}
          <div
            className="mb-4 render"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />

          <div className="action-bar">
            <div className="left">
              <div className="vote">
                <div
                  onClick={() => {
                    dispatch(
                      optimisticCommentVote({
                        commentid: comment.id,
                        value: {
                          rank:
                            comment.vote_status === null
                              ? comment.vote_rank + 1
                              : comment.vote_status === "upvote"
                              ? comment.vote_rank - 1
                              : comment.vote_status === "downvote" &&
                                comment.vote_rank + 2,
                          status:
                            comment.vote_status === "upvote" ? null : "upvote",
                        },
                      })
                    );
                    dispatch(voteCommentThunk({ commentid: comment.id }));
                  }}
                >
                  {comment.vote_status === "upvote" ? (
                    <img src={upvoteActive} alt="helpful" />
                  ) : (
                    <img src={upvote} alt="helpful" />
                  )}
                </div>
                <span className="count">{comment.vote_rank}</span>
                <div
                  onClick={() => {
                    dispatch(
                      optimisticCommentVote({
                        commentid: comment.id,
                        value: {
                          rank:
                            comment.vote_status === null
                              ? comment.vote_rank - 1
                              : comment.vote_status === "downvote"
                              ? comment.vote_rank + 1
                              : comment.vote_status === "upvote" &&
                                comment.vote_rank - 2,
                          status:
                            comment.vote_status === "downvote"
                              ? null
                              : "downvote",
                        },
                      })
                    );
                    dispatch(
                      voteCommentThunk({
                        commentid: comment.id,
                        value: "downvote",
                      })
                    );
                  }}
                >
                  {comment.vote_status === "downvote" ? (
                    <img src={downvoteActive} alt="not helpful" />
                  ) : (
                    <img src={downvote} alt="not helpful" />
                  )}
                </div>
              </div>
              {/* The add comment button */}
              <div
                className="reply"
                onClick={() => setShowAddReply(!showAddReply)}
              >
                <img src={replyImg} alt="reply" />
                <span>Reply</span>
              </div>
            </div>

            {/* Hide replies section */}
            {comment?.reply_count ? (
              <>
                {comment?.replies?.showReply ? (
                  <div
                    onClick={() => {
                      setShowReplies(false);

                      dispatch(
                        hideSecondReply({
                          commentid: comment.id,
                          value: false,
                        })
                      );
                    }}
                    className="show-replies"
                  >
                    <img src={hide} alt="hide" />{" "}
                    <span className="desktop">
                      Hide replies ({comment.reply_count})
                    </span>
                    <span className="mobile">{comment.reply_count}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      // check if data exists, if it does don't do another fetch, just set showReply to true
                      if (comment?.replies?.data?.length > 0) {
                        dispatch(
                          hideSecondReply({
                            commentid: comment.id,
                            value: true,
                          })
                        );
                      } else {
                        dispatch(
                          fetchSecondLevelCommentThunk({
                            commentid: comment?.id,
                          })
                        );
                      }
                      setShowReplies(true);
                    }}
                    className="show-replies"
                  >
                    <img src={show} alt="show" />
                    <span className="desktop">
                      Show replies ({comment.reply_count})
                    </span>
                    <span className="mobile">{comment.reply_count}</span>
                  </div>
                )}{" "}
              </>
            ) : (
              ""
            )}
          </div>

          {showAddReply && (
            <AddReply
              parentCommentAuthor={comment?.user?.username}
              reply={newReply}
              postReply={postReply}
              onChange={handleChange}
              close={() => setShowAddReply(false)}
            />
          )}

          {comment?.replies?.showReply && (
            <div className="children">
              {comment?.replies?.data?.map((reply) => (
                <SecondLevelComment key={uuid()} reply={reply} match={match} />
              ))}

              {comment?.replies?.next && (
                <>
                  {status === QfeedStates.LOADING ? (
                    ""
                  ) : (
                    <div
                      className="text-faraday-night my-2 py-2 font-semibold cursor-pointer"
                      onClick={() => {
                        setShowReplies(true);
                        dispatch(
                          fetchSecondLevelCommentThunk({
                            url: comment?.replies?.next,
                          })
                        );
                      }}
                    >
                      Load more
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {status === QfeedStates.LOADING && showReplies ? <LazyReply /> : ""}
        </div>
      </div>

      <Modal
        icon={info}
        visible={disclaimer}
        action={() => setDisclaimer(false)}
        title={`Disclaimer`}
        message={`Unless the account that created the question is the Faraday
          official account, we can't take responsibility for the comment
          marked as a solution.`}
      />
    </div>
  );
};

export default CommentComponent;
