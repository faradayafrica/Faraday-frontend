import Question from "../qfeedComponents/Question";
import { useHistory } from "react-router-dom";

const ProfileQuestion = ({ question, type }) => {
  const history = useHistory();

  return (
    <div
      className="question-container border rounded-xl p-2 mb-3 mr-3"
      onClick={() => history.push(`/qfeed/${question.id}`)}
    >
      <div className="profile-row text-[12px] text-night-secondary flex items-center justify-start">
        <img
          src={question?.user.profile_pic}
          alt=""
          className="h-3 w-3 rounded-full"
        />
        <span className="ml-1">
          {question?.user.firstname} {question.user.lastname}
        </span>{" "}
        {/* <span className="ml-1">{question?.user.username}</span>{" "} */}
        <span className="ml-1">
          {question?.user.username > 8
            ? question?.user.username.substring(0, 8) + "..."
            : question?.user.username}
        </span>
        <span className="ml-1">{question?.created}</span>
      </div>
      <h3 className="text-base sm:text-lg font-semibold m-0 mb-1">
        {question?.title}
      </h3>

      {type == "soln" && (
        <p className="bg-[#F1FBEF77] rounded-lg p-[8px] mb-2 relative text-sm">
          {question.solution?.content}
        </p>
      )}
    </div>
  );
};

export default ProfileQuestion;
