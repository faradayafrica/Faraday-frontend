import profile1 from "../../images/profile2.png";
import love from "../../images/qfeed/love.svg";
import arrow from "../../images/qfeed/arrow-right.svg";

const Question = ({ question }) => {
  //   console.log("question", question);

  return (
    <div className="question-component bg-brnd-highlight pl-3 pt-3 sm:pt-4  flex justify-start">
      <img src={profile1} className="w-12 h-12 rounded-full mr-2" alt="" />
      <section className=" p-0 w-full">
        <div className="pr-2">
          {/* Profile details */}
          <p className="flex m-0 text-night-secondary mb-1 text-xs sm:text-sm">
            <span className="mr-2 font-semibold text-faraday-night">
              {question?.first_name} {question?.last_name} Ada Obi
            </span>
            <span className="mr-2">{question?.user.username}</span>{" "}
            <span>2h</span>
          </p>
          {/* Question head */}
          <p className="text-sm sm:text-lg leading-[120%] font-semibold m-0 mb-1">
            {question?.title}
          </p>
          {/* Question body --optional */}
          <p className="text-sm sm:text-base m-0 mb-2">{question?.content}</p>
        </div>

        {/* QUestion reaction */}
        {question.likes ? (
          <div className="mb-2 flex cursor-pointer ">
            <div className="bg-background hover:bg-danger-highlight px-2 flex justify-around items-center rounded-lg float-left">
              <img className="h-4 w-4" src={love} alt="" />{" "}
              <span className="ml-1 font-medium text-sm">
                {question?.likes}
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="comment text-lg font-semibold text-brand py-[14px] bg-brnd-highlight flex justify-between">
          {question.comments === 0 ? "Leave a comment" : ""}{" "}
          {question.comments === 1 ? `${question.comments} comment` : ""}{" "}
          {question.comments > 1 ? `${question.comments} comments` : ""}{" "}
          <img className="mr-2" src={arrow} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Question;
