import profile1 from "../../images/profile2.png";
import love from "../../images/qfeed/love.svg";
import arrow from "../../images/qfeed/arrow-right.svg";

const Question = ({ question }) => {
  console.log("question", question);

  return (
    <div className="question-component bg-brnd-highlight pl-3 pt-3 sm:pt-4  flex justify-start">
      <img src={profile1} className="w-12 h-12 rounded-full mr-2" alt="" />
      <section className=" p-0 w-full">
        <div className="pr-2">
          {/* Profile details */}
          <p className="flex m-0 text-night-secondary mb-1 text-sm sm:text-base">
            <span className="mr-2 font-semibold">Olive Ada</span>
            <span className="mr-2"> @olibaby</span> <span>2h</span>
          </p>
          {/* Question head */}
          <p className="text-base sm:text-lg leading-[120%] font-semibold m-0 mb-1">
            {question?.title}
          </p>
          {/* Question body --optional */}
          <p className="text-sm sm:text-base m-0 mb-2">{question?.content}</p>
        </div>

        {question.likes ? (
          <div className="mb-2 py-2 px-3 bg-background w-[70px] flex justify-around items-center rounded-full cursor-pointer hover:bg-danger-highlight">
            <img src={love} alt="" />{" "}
            <span className="ml-2 font-medium">{question?.likes}</span>
          </div>
        ) : (
          ""
        )}
        <div className="comment text-lg font-semibold text-brand py-[14px] bg-brnd-highlight flex justify-between">
          Leave a comment
          <img className="mr-2" src={arrow} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Question;
