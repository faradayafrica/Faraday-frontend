import { useState } from "react";
import CommentComponent from "./CommentComponent";
import { getCurrentUser } from "../../../common/services/authService";
import {
  SuccessToast,
  ErrorToast,
  PromiseToast,
} from "../../../common/components/CustomToast";

import http from "../../../common/services/httpService";
import AddComment from "./AddComment";
import CommentsLoader from "./CommentsLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  createCommentThunk,
  deleteCommentThunk,
  updateQuestion,
} from "../../../common/features/qfeed/qfeedSlice";

const Comments = ({
  match,
  online,
  comments,
  commentLoader,
  // thisQuestion,
  // onUpdateComments,
  // questionOwner,
  error,
  isError,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const [comment, setComment] = useState("");
  const [pendingComments, setPendingComments] = useState([]);
  const currentUser = getCurrentUser();

  // Redux biz starts here
  const { question } = useSelector((state) => state.qfeed.thisQuestion);
  const dispatch = useDispatch();

  const uniqueComments = Array.from(new Set(comments?.map((a) => a.id))).map(
    (id) => {
      return comments.find((a) => a.id === id);
    }
  );

  function updateComments(value) {
    dispatch(
      updateQuestion({
        name: "comments",
        value,
      })
    );
  }

  // console.log(questions);
  const pendingContents = pendingComments.map((item) => {
    return {
      content: item.content,
      created: "just now",
      id: `f90e060f-d689-4bbf-97e3-${item.content}-pending`,
      is_solution: false,
      user: {
        firstname: currentUser.first_name,
        followers: [2],
        followers_count: 1,
        following: 1,
        gender: "pending",
        id: currentUser.user_id,
        is_following: false,
        lastname: currentUser.last_name,
        profile_pic: currentUser.profile_pic,
        username: currentUser.username,
      },
    };
  });

  const allComments = [...pendingContents, ...uniqueComments];

  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

  const handleChange = ({ currentTarget }) => {
    setComment(currentTarget.value);
  };

  const postComment = (postid, limit) => {
    if (comment.length > limit || comment.length === 0) {
      ErrorToast("Your comment is too long");
    } else {
      let content = comment;
      console.log("Before", postid, content);
      dispatch(createCommentThunk({ postid, content }));
    }

    // TODO: Clear the input after comment creation is successful
  };

  const deleteComment = async (selectedComment) => {
    dispatch(
      deleteCommentThunk({
        ques_id: question.id,
        commentid: selectedComment.id,
      })
    );
  };

  return (
    <div className="bg-white">
      <div className=" pl-3 pr-2">
        <AddComment
          online={online}
          onChange={handleChange}
          currentUser={currentUser}
          postComment={postComment}
          questionId={question.id}
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
                currentUser={currentUser}
                onDeleteComment={deleteComment}
                is_solution={true}
              />
            ))}

          {/* The rest of the comments */}
          {allComments
            .filter((comment) => comment.is_solution !== true)
            .map((comment) => (
              <CommentComponent
                key={comment.id}
                match={match}
                comment={comment}
                currentUser={currentUser}
                onDeleteComment={deleteComment}
              />
            ))}
        </>
      ) : (
        <>
          {!commentLoader && (
            <div className="p-3 bg-white">
              <div className="p-3 rounded-lg border bg-background  text-center">
                <p className="text-xs sm:text-base m-0 ">
                  {isError
                    ? error.message
                    : "No comments yet! Be the first to comment on this question"}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {isFetchingNextPage && hasNextPage ? (
        <>
          <CommentsLoader short={true} />
        </>
      ) : null}

      {commentLoader ? (
        !comments.length ? (
          <CommentsLoader />
        ) : (
          <CommentsLoader short={true} />
        )
      ) : (
        <>
          {comments.length > 0 && !hasNextPage && (
            <>
              <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
                <p className="text-xs sm:text-base m-0 ">
                  No more comment to fetch
                </p>
              </div>
              <div className="h-[65px] w-full sm:hidden"></div>
            </>
          )}
        </>
      )}

      <div className="h-4"></div>
    </div>
  );
};

export default Comments;