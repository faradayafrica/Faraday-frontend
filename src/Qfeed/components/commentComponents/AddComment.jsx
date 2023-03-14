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
  comment,
}) => {
  const LIMIT = 450;

  const { question } = useSelector((state) => state.qfeed.thisQuestion);
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
      <Link
        to={`/me/${currentUser?.username}`}
        style={{ textDecoration: "none" }}
        className="profile-img"
      >
        <img
          src={currentUser?.profile_pic}
          alt=""
          className="w-12 h-12 rounded-full mr-2 bg-background2 float-left"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <div className="RTE-wrapper">
        {!question.is_closed ? (
          <div>
            <RTF value={comment} onChange={onChange} />
            {comment.length > 0 && (
              <div className="m-0 mt-2 ml-2 pb-2 float-right">
                <PrimaryButton
                  cta="Submit"
                  action={() => postComment(questionId, LIMIT)}
                  variant="small"
                />
              </div>
            )}

            <span className=" text-xs text-night-secondary">
              Replying @{question.user.username}
            </span>
          </div>
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
