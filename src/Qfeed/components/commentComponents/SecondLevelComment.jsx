import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  createThirdLevelCommentThunk,
  deleteReplyThunk,
  fetchThirdLevelCommentThunk,
  hideThirdReply,
  optimisticReplyVote,
  QfeedStates,
  voteReplyThunk,
} from "../../../common/features/qfeed/qfeedSlice";
import ThirdLevelComment from "./ThirdLevelComment";
import moment from "moment";
import { Link } from "react-router-dom";

import ellipses from "../../assets/ellipses.svg";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import upvoteActive from "../../assets/upvote-active.svg";
import downvoteActive from "../../assets/downvote-active.svg";

import replyImg from "../../assets/reply.svg";

import hide from "../../assets/hide.svg";
import show from "../../assets/show.svg";
import ReplyMenu from "./ReplyMenu";
import { ErrorToast } from "../../../common/components/CustomToast";
import AddReply from "./AddReply";

export default function SecondLevelComment({ reply }) {
  const [replyMenu, setReplyMenu] = useState(false);

  const [hideReplies, setHideReplies] = useState();
  const [showAddReply, setShowAddReply] = useState(false);
  const [newReply, setNewReply] = useState("");

  const dispatch = useDispatch();
  const { check } = useSelector((state) => state.qfeed);
  const { reply2Status: status } = useSelector(
    (state) => state.qfeed.thisQuestion
  );

  const toggleReplyMenu = () => {
    setReplyMenu(!replyMenu);
  };

  const onDeleteReply = () => {
    dispatch(deleteReplyThunk({ replyid: reply.id }));
  };

  const postReply = (limit) => {
    if (newReply.length > limit || newReply.length === 0) {
      ErrorToast("Your comment is too long");
    } else {
      let content = newReply;
      console.log("Handle Add 2nd level reply", reply.id);
      dispatch(
        createThirdLevelCommentThunk({
          commentid: reply.id,
          content,
        })
      );
    }
  };

  const handleChange = (value) => {
    setNewReply(value);
  };

  console.log(reply, "REPLY OOOOOO");

  return (
    <div className="">
      <div className="content-wrapper">
        <Link
          to={`/me/${reply?.by_user?.username}`}
          style={{ textDecoration: "none" }}
          className="profile-img"
        >
          <img
            src={reply?.by_user?.profile_pic}
            style={{ objectFit: "cover" }}
            alt=""
          />
        </Link>

        <div className="offset">
          <div className="user">
            <p className="author">
              {reply.by_user.firstname} {reply.by_user.lastname}
            </p>
            <p className="username">@{reply.by_user.username}</p>
            <p className="time">{moment(reply?.created).fromNow()} </p>

            {/* Reply menu */}
            <div
              className=" cursor-pointer absolute right-[-6px] top-2 rounded-md"
              onClick={() => {
                toggleReplyMenu();
              }}
            >
              <img
                src={ellipses}
                className="w-6 h-6 rounded-full m-1 "
                style={{ objectFit: "cover" }}
                alt=""
              />
            </div>
            {replyMenu && (
              <ReplyMenu
                selectedComment={reply}
                onToggleReplyMenu={toggleReplyMenu}
                onDeleteComment={onDeleteReply}
              />
            )}
          </div>

          {/* Render the content */}
          <div dangerouslySetInnerHTML={{ __html: reply.content }} />

          <div className="action-bar">
            <div className="left">
              <div className="vote">
                <div
                  onClick={() => {
                    dispatch(
                      optimisticReplyVote({
                        replyid: reply.id,
                        value: {
                          rank:
                            reply.vote_status === null
                              ? reply.vote_rank + 1
                              : reply.vote_status === "upvote"
                              ? reply.vote_rank - 1
                              : reply.vote_status === "downvote" &&
                                reply.vote_rank + 2,
                          status:
                            reply.vote_status === "upvote" ? null : "upvote",
                        },
                      })
                    );
                    dispatch(voteReplyThunk({ replyid: reply.id }));
                  }}
                >
                  {reply.vote_status === "upvote" ? (
                    <img src={upvoteActive} alt="helpful" />
                  ) : (
                    <img src={upvote} alt="helpful" />
                  )}
                </div>
                <span className="count">{reply.vote_rank}</span>
                <div
                  onClick={() => {
                    dispatch(
                      optimisticReplyVote({
                        replyid: reply.id,
                        value: {
                          rank:
                            reply.vote_status === null
                              ? reply.vote_rank - 1
                              : reply.vote_status === "downvote"
                              ? reply.vote_rank + 1
                              : reply.vote_status === "upvote" &&
                                reply.vote_rank - 2,
                          status:
                            reply.vote_status === "downvote"
                              ? null
                              : "downvote",
                        },
                      })
                    );
                    dispatch(
                      voteReplyThunk({ replyid: reply.id, value: "downvote" })
                    );
                  }}
                >
                  {reply.vote_status === "downvote" ? (
                    <img src={downvoteActive} alt="not helpful" />
                  ) : (
                    <img src={downvote} alt="not helpful" />
                  )}
                </div>
              </div>
              {/* The add reply button */}
              <div
                className="reply"
                onClick={() => setShowAddReply(!showAddReply)}
              >
                <img src={replyImg} alt="reply" />
                <span>Reply</span>
              </div>
            </div>

            {/* Hide replies section */}
            {reply?.sub_count ? (
              <>
                {reply?.replies?.showReply ? (
                  <div
                    onClick={() => {
                      setHideReplies(false);
                      setTimeout(() => {
                        dispatch(hideThirdReply({ replyid: reply.id }));
                      }, 200);
                    }}
                    className="show-replies"
                  >
                    <img src={hide} alt="hide" />{" "}
                    <span className="desktop">
                      Hide replies ({reply.sub_count})
                    </span>
                    <span className="mobile">{reply.sub_count}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setHideReplies(true);
                      dispatch(
                        fetchThirdLevelCommentThunk({ commentid: reply?.id })
                      );
                    }}
                    className="show-replies"
                  >
                    <img src={show} alt="show" />{" "}
                    <span className="desktop">
                      Show replies ({reply.sub_count})
                    </span>
                    <span className="mobile">{reply.sub_count}</span>
                  </div>
                )}{" "}
              </>
            ) : (
              ""
            )}
          </div>

          {/* Input field to add a reply */}
          {showAddReply && (
            <AddReply
              parentComment={reply}
              reply={newReply}
              postReply={postReply}
              onChange={handleChange}
            />
          )}

          {console.log(status, reply.replies)}
          {/* Render replies here */}
          {status === QfeedStates.LOADING && reply.id ? (
            <div className="text-brand"> Loading... </div>
          ) : (
            <div className="children">
              {reply?.replies?.data.map((reply) => (
                <ThirdLevelComment key={uuid()} reply={reply} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* {check && console.log(check, "check")} */}
    </div>
  );
}
