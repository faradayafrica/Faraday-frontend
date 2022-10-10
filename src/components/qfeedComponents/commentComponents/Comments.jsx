import { useState } from "react";
import CommentComponent from "./CommentComponent";
import Loader from "../../styledComponents/Loader";
import { getCurrentUser } from "../../../services/authService";
import {
  SuccessToast,
  ErrorToast,
  PromiseToast,
} from "../../common/CustomToast";

import http from "../../../services/httpService";
import AddComment from "./AddComment";
import CommentsLoader from "./CommentsLoader";

const Comments = ({
  match,
  online,
  comments,
  commentLoader,
  thisQuestion,
  onUpdateComments,
  questionOwner,
  fetchThisQuestion,
  onMarkSolution,
  questions,
  handleUpdatedQuestions,
  data,
  error,
  isError,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const [comment, setComment] = useState("");
  const [pendingComments, setPendingComments] = useState([]);
  const currentUser = getCurrentUser();

  // console.log("COMMENTS!!!1!", comments);

  const uniqueComments = Array.from(new Set(comments.map((a) => a.id))).map(
    (id) => {
      return comments.find((a) => a.id === id);
    }
  );

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

  const handleFollow = (user) => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/users/${user.username}/follow/`;

    const clonedQuestions = [...uniqueComments];
    const userComments = clonedQuestions.filter(
      (comment) => comment.user.id === user.id
    );

    try {
      const promise = http.post(apiEndpoint).then((resp) => {
        fetchThisQuestion();
        userComments.map(
          (question) =>
            (question.user.is_following = !question.user.is_following)
        );
      });
      const msg = user.is_following ? `Unfollowed` : "Followed";

      PromiseToast(
        `${msg} ${user.username}`,
        "An error occurred, Try again",
        promise
      );
    } catch (e) {
      console.log(e);
    }
  };

  const apiEndpoint =
    process.env.REACT_APP_API_URL + "/qfeed/que/create_comment/";

  const handleChange = ({ currentTarget }) => {
    setComment(currentTarget.value);
  };

  //Sync all action to the Qfeed to eliminate the need to reload the Qfeed
  const syncToQfeed = (questions, modifiedQ) => {
    const targetIndex = questions.findIndex((q) => q.id === thisQuestion.id);

    let clonedQuestions = [...questions];
    clonedQuestions[targetIndex] = { ...modifiedQ };
    handleUpdatedQuestions([...clonedQuestions]);
  };

  const postComment = (postid, limit) => {
    const myQuestion = { ...thisQuestion };

    let content = comment;

    if (comment.length > limit || comment.length === 0) {
      ErrorToast("Your comment is too long");
    } else {
      setComment("");
      document.getElementById("commentfield").value = "";

      try {
        const promise = http
          .post(apiEndpoint, {
            postid,
            content,
          })
          .then((resp) => {
            onUpdateComments((prevComments) => [resp.data, ...prevComments]);
          });

        PromiseToast("comment sent", "An error occurred, Try again", promise);
        myQuestion.comments += 1;
      } catch (e) {
        console.warn(e.message);
        if (!online) {
          setPendingComments((prev) => [{ content, postid }, ...prev]);
          myQuestion.comments += 1;
          SuccessToast("Comment will be sent when connection is restored");

          var storedComments = JSON.parse(
            localStorage.getItem("pendingComments")
          );

          window.localStorage.setItem(
            "pendingComments",
            JSON.stringify([...storedComments, { content, postid }])
          );

          setComment("");
          document.getElementById("commentfield").value = "";
        } else {
          setComment(content);
          document.getElementById("commentfield").value = content;
        }
      }
    }

    syncToQfeed(questions, myQuestion);
  };

  const deleteComment = async (selectedComment) => {
    const myQuestion = { ...thisQuestion };

    const oldComments = [...comments];
    const remainingComments = comments.filter((comment) => {
      return comment.id !== selectedComment.id;
    });

    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/qfeed/que/comments/delete/${thisQuestion.id}/${selectedComment.id}/`;

    onUpdateComments([...remainingComments]);

    try {
      await http.delete(apiEndpoint);
      SuccessToast("Comment deleted");
      myQuestion.comments -= 1;
    } catch (e) {
      ErrorToast("Couldn't delete comment");
      onUpdateComments([...oldComments]);
    }
    syncToQfeed(questions, myQuestion);
  };

  return (
    <div className="bg-white">
      <div className=" pl-3 pr-2">
        <AddComment
          online={online}
          onChange={handleChange}
          currentUser={currentUser}
          questionOwner={questionOwner}
          postComment={postComment}
          questionId={thisQuestion.id}
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
                onFollowUser={handleFollow}
                is_solution={true}
                onMarkSolution={onMarkSolution}
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
                questionOwner={questionOwner}
                currentUser={currentUser}
                onDeleteComment={deleteComment}
                onFollowUser={handleFollow}
                onMarkSolution={onMarkSolution}
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

      {!hasNextPage && data?.pages.length && (
        <>
          <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
            <p className="text-xs sm:text-base m-0 ">
              No more comments to fetch
            </p>
          </div>
          <div className="h-[65px] w-full sm:hidden"></div>
        </>
      )}

      {commentLoader ? (
        !comments.length ? (
          <CommentsLoader />
        ) : (
          <CommentsLoader short={true} />
        )
      ) : (
        <>
          {!comments.length === 0 && (
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
