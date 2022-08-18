import { useState } from "react";
import CommentComponent from "./CommentComponent";
import Loader from "../../styledComponents/Loader";
import { getCurrentUser } from "../../../services/authService";
import { SuccessToast, ErrorToast } from "../../common/CustomToast";

import http from "../../../services/httpService";
import AddComment from "./AddComment";
import CommentMenu from "./CommentMenu";

const Comments = ({
  comments,
  commentLoader,
  questionid,
  onUpdateComments,
  questionOwner,
  onFollowUser,
}) => {
  const [comment, setComment] = useState("");
  const [commentMenu, setCommentMenu] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const currentUser = getCurrentUser();

  console.log("Comments", comments);

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

  const toggleCommentMenu = (comment) => {
    setCommentMenu(!commentMenu);
    setSelectedComment(comment);
  };

  const deleteComment = async () => {
    const remainingComments = comments.filter((comment) => {
      return comment.id !== selectedComment.id;
    });

    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/qfeed/que/comments/delete/${questionid}/${selectedComment.id}/`;

    try {
      await http.delete(apiEndpoint);
      toggleCommentMenu(!commentMenu);
      SuccessToast("Comment deleted");
      onUpdateComments([...remainingComments]);
    } catch (e) {
      console.warn("Buttocks", e.message);
      ErrorToast("Couldn't delete comment");
    }
  };

  return (
    <div className="bg-white">
      {commentMenu ? (
        <CommentMenu
          questionOwner={questionOwner}
          currentUser={currentUser}
          selectedComment={selectedComment}
          onToggleCommentMenu={toggleCommentMenu}
          onDeleteComment={deleteComment}
          onFollowUser={onFollowUser}
        />
      ) : (
        ""
      )}

      <AddComment
        onChange={handleChange}
        currentUser={currentUser}
        questionOwner={questionOwner}
        postComment={postComment}
        questionId={questionid}
        comment={comment}
      />

      {comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}
              questionOwner={questionOwner}
              currentUser={currentUser}
              selectedComment={selectedComment}
              onToggleCommentMenu={toggleCommentMenu}
              onDeleteComment={deleteComment}
            />
          ))}
          <div className="h-32 w-full bg-white "></div>
        </>
      ) : (
        <>
          {commentLoader ? (
            <div className="mr-2">
              <Loader msg="Fetching comments..." />
            </div>
          ) : (
            <>
              <div className="p-3 mt-3 mr-1 rounded-lg border bg-background  text-center">
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
