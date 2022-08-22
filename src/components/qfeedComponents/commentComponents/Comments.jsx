import { useState } from "react";
import CommentComponent from "./CommentComponent";
import Loader from "../../styledComponents/Loader";
import { getCurrentUser } from "../../../services/authService";
import { SuccessToast, ErrorToast } from "../../common/CustomToast";

import http from "../../../services/httpService";
import AddComment from "./AddComment";

const Comments = ({
  match,
  comments,
  commentLoader,
  questionid,
  onUpdateComments,
  questionOwner,
  onFollowUser,
  onMarkSolution,
}) => {
  const [comment, setComment] = useState("");
  const currentUser = getCurrentUser();

  const uniqueComments = Array.from(new Set(comments.map((a) => a.id))).map(
    (id) => {
      return comments.find((a) => a.id === id);
    }
  );

  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

  const handleChange = ({ currentTarget }) => {
    setComment(currentTarget.value);
  };

  const postComment = async (postid, limit) => {
    let content = comment;
    if (comment.length > limit || comment.length === 0) {
      console.warn("comment is too long or is empty");
      ErrorToast("Your comment is either too long");
    } else {
      try {
        const { data } = await http.post(apiEndpoint, {
          postid,
          content,
        });
        onUpdateComments([data, ...comments]);
        setComment("");
        document.getElementById("commentfield").value = "";
        SuccessToast("Comment posted successfully");
      } catch (e) {
        console.warn(e.message);
        ErrorToast("An error occurred while posting your comment, Try again");
      }
    }
  };

  const deleteComment = async (selectedComment) => {
    const remainingComments = comments.filter((comment) => {
      return comment.id !== selectedComment.id;
    });

    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/qfeed/que/comments/delete/${questionid}/${selectedComment.id}/`;

    try {
      await http.delete(apiEndpoint);
      SuccessToast("Comment deleted");
      onUpdateComments([...remainingComments]);
    } catch (e) {
      ErrorToast("Couldn't delete comment");
    }
  };

  return (
    <div className="bg-white">
      <div className=" pl-3 pr-2">
        <AddComment
          onChange={handleChange}
          currentUser={currentUser}
          questionOwner={questionOwner}
          postComment={postComment}
          questionId={questionid}
          comment={comment}
        />
      </div>

      {comments.length ? (
        <>
          {/* Solution here */}
          {uniqueComments
            .filter((comment) => comment.is_solution === true)
            .map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                match={match}
                questionOwner={questionOwner}
                currentUser={currentUser}
                onDeleteComment={deleteComment}
                onFollowUser={onFollowUser}
                is_solution={true}
                onMarkSolution={onMarkSolution}
              />
            ))}
          {/* The rest of the comments */}
          {uniqueComments
            .filter((comment) => comment.is_solution !== true)
            .map((comment) => (
              <CommentComponent
                key={comment.id}
                match={match}
                comment={comment}
                questionOwner={questionOwner}
                currentUser={currentUser}
                onDeleteComment={deleteComment}
                onFollowUser={onFollowUser}
                onMarkSolution={onMarkSolution}
              />
            ))}
          <div className="h-32 w-full bg-white "></div>
        </>
      ) : (
        <>
          {commentLoader ? (
            <div className="m-3">
              <Loader msg="Fetching comments..." />
            </div>
          ) : (
            <>
              <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
                <p className="text-xs sm:text-base m-0 ">
                  No comments yet! Be the first to comment on this question
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;
