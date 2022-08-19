import { useState } from "react";
import { Link } from "react-router-dom";
import ellipses from "../../../images/qfeed/ellipses.svg";
import mark from "../../../images/qfeed/mark.svg";
import CommentMenu from "./CommentMenu";

const CommentComponent = ({
  match,
  comment,
  questionOwner,
  currentUser,
  onDeleteComment,
  onFollowUser,
  is_solution,
  onMarkSolution,
}) => {
  const [commentMenu, setCommentMenu] = useState(false);

  const toggleCommentMenu = () => {
    setCommentMenu(!commentMenu);
  };

  let commentClasses = "pt-3 pb-1 flex relative pl-3 pr-2";

  commentClasses += is_solution ? " bg-[#F1FBEF77] " : "";

  return (
    <div className={commentClasses}>
      <Link
        to={`/me/${comment?.user.username}`}
        style={{ textDecoration: "none" }}
        className="w-14 mr-2 cursor-pointer"
      >
        <img
          src={`https://api.faraday.africa${comment?.user.profile_pic}`}
          className="w-12 h-12 rounded-full mr-3 "
          style={{ objectFit: "cover" }}
          alt={`${comment?.user.firstname} ${comment?.user.lastname}`}
        />
      </Link>

      <div
        className=" hover:bg-brand-highlight cursor-pointer absolute right-1 top-2 rounded-md"
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

      {commentMenu ? (
        <CommentMenu
          questionOwner={questionOwner}
          currentUser={currentUser}
          selectedComment={comment}
          onToggleCommentMenu={toggleCommentMenu}
          onDeleteComment={onDeleteComment}
          onFollowUser={onFollowUser}
          match={match}
          onMarkSolution={onMarkSolution}
        />
      ) : (
        ""
      )}

      <div className=" w-full text-faraday-night">
        <p className="m-0  text-xs sm:text-base mr-2">
          <span className="mr-2 font-semibold">
            {comment?.user.firstname} {comment?.user.lastname}
          </span>
          <span className="mr-2 text-night-secondary">
            @{comment?.user.username}
          </span>
          <span className="mr-2 text-night-secondary">{comment?.created}</span>
        </p>
        <p className="text-sm sm:text-base m-0 mb-2 text-faraday-night">
          {comment?.content}
        </p>
        {is_solution ? (
          <p className="text-brand-dark font-bold text-xs outline outline-1 inline-flex justify-center items-center outline-brand py-1 pr-2 rounded-full">
            <img src={mark} className="h-5 w-5 mx-1" alt="mark" /> The author
            marked this as a solution
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
