import { useState } from "react";
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
  QfeedStates,
  voteCommentThunk,
} from "../../../common/features/qfeed/qfeedSlice";
import uuid from "react-uuid";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import upvoteActive from "../../assets/upvote-active.svg";
import downvoteActive from "../../assets/downvote-active.svg";

import replyImg from "../../assets/reply.svg";

import hide from "../../assets/hide.svg";
import show from "../../assets/show.svg";
import "../../styles/comment.css";
import AddReply from "./AddReply";
import { ErrorToast } from "../../../common/components/CustomToast";
import "react-quill/dist/quill.snow.css";

const CommentComponent = ({ match, comment, onDeleteComment }) => {
  const [commentMenu, setCommentMenu] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  const [hideReplies, setHideReplies] = useState();
  const [a, setA] = useState();
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
      console.log("Handle Add 2nd level reply", comment.id);
      dispatch(
        createSecondLevelCommentThunk({
          commentid: comment.id,
          content,
        })
      );
    }

    // TODO: Clear the input after comment creation is successful
  };

  const handleChange = (value) => {
    setNewReply(value);
  };

  return (
    <div className={`comment-wrapper ${comment.is_solution && "solution"} `}>
      <div className="content-wrapper">
        <Link
          to={`/me/${comment?.user?.username}`}
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
            <p className="author">
              {comment.user.firstname} {comment.user.lastname}
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
                // currentUser={currentUser}
                selectedComment={comment}
                onToggleCommentMenu={toggleCommentMenu}
                onDeleteComment={onDeleteComment}
                is_solution={comment.is_solution}
              />
            )}
          </div>

          {/* Render the content */}
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />

          <div className="action-bar">
            <div className="left">
              <div className="vote">
                <div
                  onClick={() =>
                    dispatch(voteCommentThunk({ commentid: comment.id }))
                  }
                >
                  {comment.vote_status === "upvote" ? (
                    <img src={upvoteActive} alt="helpful" />
                  ) : (
                    <img src={upvote} alt="helpful" />
                  )}
                </div>
                <span className="count">{comment.vote_rank}</span>
                <div
                  onClick={() =>
                    dispatch(
                      voteCommentThunk({
                        commentid: comment.id,
                        value: "downvote",
                      })
                    )
                  }
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
                      dispatch(
                        hideSecondReply({
                          commentid: comment.id,
                        })
                      );
                      setHideReplies(false);
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
                      dispatch(
                        fetchSecondLevelCommentThunk({ commentid: comment?.id })
                      );
                      setHideReplies(true);
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
              parentComment={comment}
              reply={newReply}
              postReply={postReply}
              onChange={handleChange}
            />
          )}
          {/* {comment.replies?.showReply && ( */}
          {status === QfeedStates.LOADING && hideReplies ? (
            <div className="text-brand"> Loading... </div>
          ) : (
            <div className="children">
              {comment?.replies?.data?.map((reply) => (
                <SecondLevelComment
                  key={uuid()}
                  reply={reply}
                  match={match}
                  setHideReply={setA}
                  hideReply={a}
                />
              ))}
            </div>
          )}

          {/* )} */}
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

      {/* {console.log(check, "check")} */}
    </div>
  );
};

export default CommentComponent;
