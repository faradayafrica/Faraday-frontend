import { useState } from "react";
import { Link } from "react-router-dom";
import ellipses from "../../assets/ellipses.svg";
import mark from "../../assets/mark.svg";
import info from "../../assets/info.svg";
import CommentMenu from "./CommentMenu";
import Modal from "../../../common/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import SecondLevelComment from "./SecondLevelComment";
import {
  fetchSecondLevelCommentThunk,
  hideSecondReply,
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

const CommentComponent = ({ match, comment, currentUser, onDeleteComment }) => {
  const [commentMenu, setCommentMenu] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  const { question, check } = useSelector((state) => state.qfeed.thisQuestion);
  const dispatch = useDispatch();

  const toggleCommentMenu = () => {
    setCommentMenu(!commentMenu);
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
                currentUser={currentUser}
                selectedComment={comment}
                onToggleCommentMenu={toggleCommentMenu}
                onDeleteComment={onDeleteComment}
                is_solution={comment.is_solution}
              />
            )}
          </div>
          <p className="content"> {comment.content}</p>

          <div className="action-bar">
            <div className="left">
              <div className="vote">
                {comment.vote_status === "upvote" ? (
                  <img src={upvoteActive} alt="helpful" />
                ) : (
                  <img src={upvote} alt="helpful" />
                )}
                <span className="count">{comment.vote_rank}</span>
                {comment.vote_status === "downvote" ? (
                  <img src={downvoteActive} alt="not helpful" />
                ) : (
                  <img src={downvote} alt="not helpful" />
                )}
              </div>
              {/* The add comment button */}
              <div className="reply">
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
                    }}
                    className="show-replies"
                  >
                    <img src={hide} alt="hide" />{" "}
                    <span>Hide replies ({comment.reply_count})</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      dispatch(
                        fetchSecondLevelCommentThunk({ commentid: comment?.id })
                      );
                    }}
                    className="show-replies"
                  >
                    <img src={show} alt="show" />{" "}
                    <span>Show replies ({comment.reply_count})</span>
                  </div>
                )}{" "}
              </>
            ) : (
              ""
            )}
          </div>

          {comment.replies?.showReply && (
            <div className="children">
              {comment.replies.data.map((reply) => (
                <SecondLevelComment key={uuid()} reply={reply} />
              ))}
            </div>
          )}
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
