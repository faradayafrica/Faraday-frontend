import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReplyMenu from "./ReplyMenu";

import ellipses from "../../assets/ellipses.svg";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import upvoteActive from "../../assets/upvote-active.svg";
import downvoteActive from "../../assets/downvote-active.svg";

import replyImg from "../../assets/reply.svg";
import { useState } from "react";

export default function ThirdLevelComment({ reply }) {
  const [replyMenu, setReplyMenu] = useState(false);
  const dispatch = useDispatch();

  const toggleReplyMenu = () => {
    setReplyMenu(!replyMenu);
  };

  const onDeleteReply = () => {
    console.log("Handle delete for 3rd level reply");
  };

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
              {/* <div className="reply">
                <img src={replyImg} alt="reply" />
                <span>Reply</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
