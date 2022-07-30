import { useState } from "react";
import CommentComponent from "./CommentComponent";
import PrimaryButton from "../styledComponents/PrimaryButton";
import Loader from "../styledComponents/Loader";
import { getCurrentUser } from "../../services/authService";

import http from "../../services/httpService";

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

  const postComment = async (postid, content) => {
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
  };

  return (
    <>
      <div className=" pt-3 pb-2 flex justify-start border-background2 border-b-[1px] mb-2">
        <img
          src={`https://api.faraday.africa${currentUser?.profile_pic}`}
          alt={`${currentUser?.first_name} ${currentUser?.last_name}`}
          className="w-12 h-12 rounded-full mr-2 float-left"
          style={{ objectFit: "cover" }}
        />
        <label className="block w-full m-0 relative bottom-2 ">
          <span className=" ml-2 text-xs text-brand">
            Replying @{questionOwner.username}
          </span>
          <textarea
            type="text"
            name="comment"
            row="4"
            multiline="true"
            id="commentfield"
            className="mt-1 px-2 py-2 mb-2 placeholder-slate-400 focus:outline-none block w-full text-sm "
            placeholder="Contribute to this discussion"
            onChange={handleChange}
          />
          <PrimaryButton
            cta="Post"
            action={() => postComment(questionid, comment)}
          />
        </label>
      </div>

      {comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
          <div className="h-[65px] w-full "></div>
        </>
      ) : (
        <>
          {commentLoader ? (
            <Loader msg="Fetching comments..." />
          ) : (
            <div className="p-3  rounded-lg border bg-background  text-center">
              <>
                <p className="text-sm sm:text-base m-0">
                  No comments yet! Be the first to comment on this question
                </p>
              </>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Comments;
