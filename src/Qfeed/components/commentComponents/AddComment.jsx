import { Link } from "react-router-dom";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useSelector } from "react-redux";
import RTF from "../RTE";
import "../../styles/RTE.css";

const AddComment = ({
  currentUser,
  onChange,
  postComment,
  questionId,
  // comment,
}) => {
  const LIMIT = 1050;

  const { question } = useSelector((state) => state.qfeed.thisQuestion);
  const { newComment: comment } = useSelector(
    (state) => state.qfeed.thisQuestion
  );
  // const { online } = useSelector((state) => state.user.onlineStatus);

  if (!currentUser.username) {
    return (
      <div className=" py-2 border-b">
        <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
          <p className="text-xs sm:text-base m-0 ">
            Please log in to join the discussion
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-comment flex justify-start border-b-[1px] border-background2 ">
      <div className="RTE-wrapper">
        {!question.is_closed ? (
          <>
            <RTF
              value={comment}
              onChange={onChange}
              placeholder={`Reply to @${question.user.username}`}
              submit={() => postComment(questionId, LIMIT)}
            />
          </>
        ) : (
          <div className="h-[100%] flex py-3 ">
            <span className=" ml-2 text-xs text-danger">
              @{question.user.username} has closed this question
            </span>
          </div>
        )}

        {comment.length > LIMIT ? (
          <span className="text-danger text-xs ">
            Your comment cannot exceed {LIMIT} characters
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddComment;
