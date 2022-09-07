import { useEffect, useState } from "react";
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

const Comments = ({
  match,
  online,
  comments,
  commentLoader,
  questionid,
  onUpdateComments,
  questionOwner,
  fetchThisQuestion,
  onMarkSolution,
}) => {
  const [comment, setComment] = useState("");
  const [pendingComments, setPendingComments] = useState([]);
  const currentUser = getCurrentUser();

  const uniqueComments = Array.from(new Set(comments.map((a) => a.id))).map(
    (id) => {
      return comments.find((a) => a.id === id);
    }
  );

  // var storedComments = JSON.parse(localStorage.getItem("pendingComments"));

  const pendingContents = pendingComments.map((item) => {
    return {
      content: item.content,
      created: "just now",
      id: `f90e060f-d689-4bbf-97e3-${item.content}-pending`,
      is_solution: false,
      user: {
        firstname: "User",
        followers: [2],
        followers_count: 1,
        following: 1,
        gender: "male",
        id: "8522889d-2805-46d2-bb94-38aea3ac2a85",
        is_following: false,
        lastname: "1",
        profile_pic: "iStock-476085198.jpg",
        username: "user1",
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

  const postComment = async (postid, limit) => {
    let content = comment;

    if (comment.length > limit || comment.length === 0) {
      console.warn("comment is too long or is empty");
      ErrorToast("Your comment is too long");
    } else {
      setComment("");
      document.getElementById("commentfield").value = "";

      try {
        const { data } = await http.post(apiEndpoint, {
          postid,
          content,
        });
        onUpdateComments([data, ...comments]);
        SuccessToast("Comment posted successfully");
      } catch (e) {
        console.warn(e.message);
        if (!online) {
          setPendingComments((prev) => [{ content, postid }, ...prev]);
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
  };

  const deleteComment = async (selectedComment) => {
    const oldComments = [...comments];
    const remainingComments = comments.filter((comment) => {
      return comment.id !== selectedComment.id;
    });

    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/qfeed/que/comments/delete/${questionid}/${selectedComment.id}/`;

    onUpdateComments([...remainingComments]);

    try {
      await http.delete(apiEndpoint);
      SuccessToast("Comment deleted");
    } catch (e) {
      ErrorToast("Couldn't delete comment");
      onUpdateComments([...oldComments]);
    }
  };

  // const syncPendingComments = async () => {
  //   var storedComments = JSON.parse(localStorage.getItem("pendingComments"));

  //   window.localStorage.setItem("pendingComments", JSON.stringify([]));
  //   console.log("!>", storedComments, "<!");

  //   storedComments.forEach(async (item) => {
  //     const { content, postid } = item;

  //     try {
  //       const { data } = await http.post(apiEndpoint, {
  //         postid,
  //         content,
  //       });

  //       console.log("newly synced comment", data);

  //       //Current problem, It shows all newly synced comment on the opened question.
  //       //How to fix, there should be a reference to the question where the comment is being created on the {data} response
  //       onUpdateComments((prev) => [data, ...prev]);

  //       SuccessToast("Offline comment synced");
  //     } catch (e) {
  //       console.warn(e.message);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (online) {
  //     syncPendingComments();
  //   }
  // }, [online]);

  return (
    <div className="bg-white">
      <div className=" pl-3 pr-2">
        <AddComment
          online={online}
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
                  No comments yet! Be the first to comment on this question
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {commentLoader ? (
        <div className="p-3">
          <Loader msg="fetching comments..." />
          <div className="h-[65px] w-full sm:hidden"></div>
        </div>
      ) : (
        <>
          {!comments.length == 0 && (
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
    </div>
  );
};

export default Comments;
