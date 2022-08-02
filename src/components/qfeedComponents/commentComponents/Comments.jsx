import { useState } from "react";
import CommentComponent from "./CommentComponent";
import Loader from "../../styledComponents/Loader";
import { getCurrentUser } from "../../../services/authService";

import http from "../../../services/httpService";
import AddComment from "./AddComment";

const Comments = ({
  comments,
  commentLoader,
  questionid,
  updateComments,
  questionOwner,
}) => {
  const [comment, setComment] = useState("");
  const [commentMenu, setCommentMenu] = useState(false);
  const [selectedComment, setSelectedComment] = useState();
  const currentUser = getCurrentUser();

  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

  const handleChange = ({ currentTarget }) => {
    setComment(currentTarget.value);
  };

  const postComment = async (postid, limit) => {
    let content = comment;
    if (comment.length > limit || comment.length === 0) {
      console.warn("comment is too long or is empty");
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

  const toggleCommentMenu = (comment) => {
    setCommentMenu(!commentMenu);
    setSelectedComment(comment);
    console.log("Bribri", comment);
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

      {commentMenu ? (
        <div
          className="fixed bottom-0 left-0 z-10 bg-transparent h-screen  w-full sm:hidden"
          onClick={toggleCommentMenu}
        >
          <div className="absolute bottom-0 ask-shadow bg-white border  px-3 rounded-t-3xl">
            <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto bg-background2"></div>
            <button className="px-4 py-3 bg-background hover:bg-background2 rounded-lg w-full mb-2 text-left">
              Mark as a solution
            </button>
            <button className="px-4 py-3 bg-background hover:bg-background2 rounded-lg w-full mb-2 text-left">
              Follow @{selectedComment?.user.username}
            </button>
            <button
              className="px-4 py-3 bg-background text-danger hover:bg-danger-highlight rounded-lg w-full mb-8 text-left"
              onClick={() => {
                console.log("Delete", selectedComment?.content);
              }}
            >
              Delete {selectedComment?.content}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentComponent
              key={comment.id}
              comment={comment}
              toggleCommentMenu={toggleCommentMenu}
            />
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
