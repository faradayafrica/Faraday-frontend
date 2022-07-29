import { useState } from "react";
import CommentComponent from "./CommentComponent";
import Loader from "../styledComponents/Loader";

const Comments = ({ comments }) => {
  const [loader, setLoader] = useState(true);

  return (
    <>
      {comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </>
      ) : (
        <Loader msg="fetching comments..." />
      )}
    </>
  );
};

export default Comments;
