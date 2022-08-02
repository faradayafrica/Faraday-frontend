import { useState } from "react";
import CommentComponent from "./CommentComponent";
import Loader from "../styledComponents/Loader";
import { getCurrentUser } from "../../services/authService";

import http from "../../services/httpService";
import AddComment from "./AddComment";

const Comments = ({
  comments,
  commentLoader,
  questionid,
  updateComments,
  questionOwner,
}) => {
  const [comment, setComment] = useState("");
  const currentUser = getCurrentUser();

  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

  const handleChange = ({ currentTarget }) => {
    setComment(currentTarget.value);
  };

  const postComment = async (postid, limit) => {
    let content = comment;
    if (comment.length > limit) {
      console.warn("comment is too long");
    } else {
      try {
        const { data } = await http.post(apiEndpoint, {
          postid,
          content,
        });
        updateComments(data);
        setComment("");
        document.getElementById("commentfield").value = "";
      } catch (e) {
        console.warn(e.message);
      }
    }
  };

  return (
    <>
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
            <CommentComponent key={comment.id} comment={comment} />
          ))}
          <div className="h-32 w-full bg-white "></div>
        </>
      ) : (
        <>
          {commentLoader ? (
            <Loader msg="Fetching comments..." />
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
    </>
  );
};

export default Comments;
