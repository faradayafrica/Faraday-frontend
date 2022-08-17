import PrimaryButton from "../../styledComponents/PrimaryButton";

const AddComment = ({
  currentUser,
  questionOwner,
  onChange,
  postComment,
  questionId,
  comment,
}) => {
  const LIMIT = 328;

  let inputClasses =
    "focus:bg-gradient-to-t from-background to-white mt-1 px-2 py-2 mb-2 placeholder-secondary-text border-outline border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-sm ";

  inputClasses +=
    comment.length > LIMIT
      ? "focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger"
      : "";

  return (
    <div className=" pt-3 flex justify-start border-background2 border-b-[1px] mb-2 pr-2 bg-white">
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
