import { useState } from "react";
import { Link } from "react-router-dom";
import ellipses from "../../assets/ellipses.svg";
import mark from "../../assets/mark.svg";
import info from "../../assets/info.svg";
import CommentMenu from "./CommentMenu";
import Modal from "../../../common/components/Modal";

const CommentComponent = ({
  match,
  comment,
  questionOwner,
  currentUser,
  onDeleteComment,
  onFollowUser,
  onMarkSolution,
}) => {
  const [commentMenu, setCommentMenu] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  const toggleCommentMenu = () => {
    setCommentMenu(!commentMenu);
  };

  let commentClasses = "pt-3 pb-1 flex relative pl-3 pr-2 comment-item";

  commentClasses += comment.is_solution
    ? " bg-[#F1FBEF66] is_solution  mb-4"
    : "";

  return (
    <div className={commentClasses}>
      <Link
        to={`/me/${comment?.user?.username}`}
        style={{ textDecoration: "none" }}
        className="w-14 mr-2 cursor-pointer "
      >
        <img
          src={comment?.user?.profile_pic}
          className="w-12 h-12 rounded-full mr-3 bg-background2"
          style={{ objectFit: "cover" }}
          alt=""
        />
      </Link>

      <div
        className=" hover:bg-brand-highlight cursor-pointer absolute right-3 top-2 rounded-md"
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
          match={match}
          questionOwner={questionOwner}
          currentUser={currentUser}
          selectedComment={comment}
          onToggleCommentMenu={toggleCommentMenu}
          onDeleteComment={onDeleteComment}
          onFollowUser={onFollowUser}
          onMarkSolution={onMarkSolution}
          is_solution={comment.is_solution}
        />
      ) : (
        ""
      )}

      <div className=" w-full text-faraday-night ">
        <p className="m-0  text-xs sm:text-base mr-2">
          <span className="mr-2 font-semibold">
            {comment?.user?.firstname} {comment?.user?.lastname}
          </span>
          <span className="mr-2 text-night-secondary">
            @{comment?.user?.username}
          </span>
          <span className="mr-2 text-night-secondary">{comment?.created}</span>
        </p>
        <div className="text-sm sm:text-base m-0 mb-2 text-faraday-night">
          {comment?.content.split("\n").map((item, idx) => (
            <p className="mb-1" key={idx}>
              {item}
            </p>
          ))}
        </div>

        {comment.is_solution ? (
          <div className=" flex items-start pb-2">
            <div className="text-brand-dark bg-brand-highlight cursor-pointer font-bold text-xs outline outline-1 inline-flex justify-center items-center outline-brand py-1 pr-2 rounded-full">
              <img src={mark} className="h-[18px] w-[18px] mx-1" alt="mark" />
              Solution marked by @{questionOwner.username}
            </div>

            <div
              onClick={() => setDisclaimer(true)}
              className="ml-1 py-1 rounded-full opacity-80 inline-flex justify-center items-center cursor-pointer"
            >
              <img src={info} className="h-5 w-5 mx-1" alt="disclaimer" />
            </div>
          </div>
        ) : (
          ""
        )}

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
    </div>
  );
};

export default CommentComponent;
