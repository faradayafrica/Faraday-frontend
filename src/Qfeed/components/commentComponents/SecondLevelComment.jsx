import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  fetchThirdLevelCommentThunk,
  hideSecondReply,
  hideThirdReply,
} from "../../../common/features/qfeed/qfeedSlice";
import ThirdLevelComment from "./ThirdLevelComment";
import moment from "moment";
import { Link } from "react-router-dom";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import upvoteActive from "../../assets/upvote-active.svg";
import downvoteActive from "../../assets/downvote-active.svg";

import replyImg from "../../assets/reply.svg";

import hide from "../../assets/hide.svg";
import show from "../../assets/show.svg";

export default function SecondLevelComment({ reply }) {
  const dispatch = useDispatch();
  const { check } = useSelector((state) => state.qfeed);

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
          </div>
          <p className="content"> {reply.content}</p>

          <div className="action-bar">
            <div className="left">
              <div className="vote">
                {reply.vote_status === "upvote" ? (
                  <img src={upvoteActive} alt="helpful" />
                ) : (
                  <img src={upvote} alt="helpful" />
                )}
                <span className="count">{reply.vote_rank}</span>
                {reply.vote_status === "downvote" ? (
                  <img src={downvoteActive} alt="not helpful" />
                ) : (
                  <img src={downvote} alt="not helpful" />
                )}
              </div>
              {/* The add reply button */}
              <div className="reply">
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
                      dispatch(hideThirdReply({ replyid: reply.id }));
                      console.log("Handle hide 3rd lvl reply");
                      // TODO: Handle hide 3rd lvl reply
                    }}
                    className="show-replies"
                  >
                    <img src={hide} alt="hide" />{" "}
                    <span>Hide replies ({reply.sub_count})</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      dispatch(
                        fetchThirdLevelCommentThunk({ commentid: reply?.id })
                      );
                    }}
                    className="show-replies"
                  >
                    <img src={show} alt="show" />{" "}
                    <span>Show replies ({reply.sub_count})</span>
                  </div>
                )}{" "}
              </>
            ) : (
              ""
            )}
          </div>

          {reply.replies?.showReply && (
            <div className="children">
              {reply.replies.data.map((reply) => (
                <ThirdLevelComment key={uuid()} reply={reply} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* {console.log(check, "check")} */}
    </div>
  );
}
