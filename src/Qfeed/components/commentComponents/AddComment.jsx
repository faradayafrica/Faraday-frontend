import { Link } from "react-router-dom";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { useSelector } from "react-redux";

const AddComment = ({
  online,
  currentUser,
  questionOwner,
  onChange,
  postComment,
  questionId,
  comment,
}) => {
  const LIMIT = 450;

  const { question } = useSelector((state) => state.qfeed.thisQuestion);

  let inputClasses =
    "focus:bg-gradient-to-t from-background to-white mt-1 px-2 py-2 mb-2 placeholder-secondary-text border-outline border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-sm ";

  inputClasses +=
    comment.length > LIMIT
      ? "focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger"
      : "";

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
    <div className=" pt-3 flex justify-start border-background2 border-b-[1px] pr-2 bg-white">
      <Link
        to={`/me/${currentUser?.username}`}
        style={{ textDecoration: "none" }}
        className="w-14 mr-2 cursor-pointer"
      >
        <img
          src={currentUser?.profile_pic}
          alt=""
          className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <label className="block w-full m-0 relative bottom-2 ">
        <span className=" ml-2 text-xs text-brand">
          Replying @{question.user.username}
        </span>
        <textarea
          type="text"
          name="comment"
          rows="3"
          id="commentfield"
          className={inputClasses}
          placeholder="Contribute to this discussion"
          onChange={onChange}
        />

        {comment.length > LIMIT ? (
          <span className="text-danger text-xs ">
            Your comment cannot exceed {LIMIT} characters
          </span>
        ) : (
          ""
        )}
        {comment.length > 0 ? (
          <div className="m-0 ml-2 pb-2 float-right">
            <PrimaryButton
              cta="Post"
              action={() => postComment(questionId, LIMIT)}
            />
          </div>
        ) : (
          ""
        )}
      </label>
    </div>
  );
};

export default AddComment;