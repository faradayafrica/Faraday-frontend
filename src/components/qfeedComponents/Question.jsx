import { useState } from "react";
import profile1 from "../../images/profile2.png";
import arrow from "../../images/qfeed/arrow-right.svg";
import love from "../../images/qfeed/love.svg";
import smiley from "../../images/qfeed/smiley.svg";
import share from "../../images/qfeed/share.svg";
import link from "../../images/qfeed/link.svg";

const Question = ({ question }) => {
  const [isButtonPannel, setButtonPannel] = useState(false);
  //   console.log("question", question);

  let smileyClasses =
    "hover:bg-brand-highlight px-2  h-8 flex justify-around items-center rounded-lg";

  if (!isButtonPannel) {
    smileyClasses += " bg-background ";
  } else {
    smileyClasses += " bg-brand-highlight icon-brand";
  }

  const handleButtonPannel = () => {
    setButtonPannel(!isButtonPannel);
    // console.log("toggle");
  };

  const hideButtonPannel = () => {
    setButtonPannel(false);
  };

  const handleLike = () => {};

  return (
    <div className="question-component bg-brnd-highlight pl-3 pt-3 sm:pt-4  flex justify-start">
      <img src={profile1} className="w-12 h-12 rounded-full mr-2" alt="" />
      <section className=" p-0 w-full">
        <div className="pr-2" onClick={() => hideButtonPannel()}>
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
        <div className=" flex items-center h-12">
          {question.likes !== 0 ? (
            <button className="bg-background hover:bg-danger-highlight h-8 px-2 flex justify-around items-center rounded-lg mr-2">
              <img className="h-4 w-4" src={love} alt="react to question" />{" "}
              <span className="ml-1 font-medium text-sm">
                {question?.likes}
              </span>
            </button>
          ) : (
            ""
          )}

          <button
            onClick={() => handleButtonPannel()}
            className={smileyClasses}
          >
            <img className="h-4 w-4" src={smiley} alt="engage with question" />
          </button>
          {/* Hidden engagement buttons can be found here */}
          {isButtonPannel ? (
            <span className="ask-shadow bg-white relative right-8 bottom-10 p-[2px] rounded-full border border-brand-highlight">
              <button className=" p-2 rounded-full hover:bg-background">
                <img
                  className="h-[18px] w-[18px]"
                  src={love}
                  alt="react to question"
                />
              </button>
              <button className=" p-2 rounded-full hover:bg-background mx-2">
                <img
                  className="h-[18px] w-[18px]"
                  src={share}
                  alt="share this question"
                />
              </button>
              <button className=" p-2 rounded-full hover:bg-background">
                <img
                  className="h-[18px] w-[18px]"
                  src={link}
                  alt="copy question link"
                />
              </button>
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="comment text-base sm:text-lg font-semibold text-brand py-[14px] bg-brnd-highlight flex justify-between">
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
