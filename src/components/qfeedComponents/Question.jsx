import { useState } from "react";
import profile1 from "../../images/profile2.png";
import love from "../../images/qfeed/love.svg";
import arrow from "../../images/qfeed/arrow-right.svg";
import link from "../../images/qfeed/link.svg";
import share from "../../images/qfeed/share.svg";
import comment from "../../images/qfeed/comment.svg";

const Question = ({ question }) => {
  const [overlay, setOverlay] = useState(false);

  const toggleOverlay = () => {
    setOverlay(!overlay);
    console.log("reveal", overlay);
  };

  return (
    <div className="question-component bg-brnd-highlight pl-3 pt-3 sm:pt-4  flex justify-start relative">
      <img src={profile1} className="w-12 h-12 rounded-full mr-2" alt="" />
      <section className=" p-0 w-full">
        <div className="pr-2" onClick={toggleOverlay}>
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

          {/* Here's the Overlay */}
          {overlay ? (
            <div
              className="question-overlay absolute top-0 left-0 w-100 h-100 "
              //   onClick={toggleOverlay}
            >
              <div className=" z-20 rounded-full absolute bottom-8 right-4">
                <div className="flex bg-white p-2 rounded-full ask-shadow">
                  <img className="p-2 cursor-pointer" src={love} alt="" />
                  <img className="p-2 cursor-pointer" src={share} alt="" />
                  <img className="p-2 cursor-pointer" src={link} alt="" />
                </div>
                <button className="bg-brand mt-2 py-[10px] px-4 flex text-brand-highlight rounded-full ask-shadow">
                  <img className="mr-1" src={comment} alt="" /> Comment
                </button>
              </div>
              <div className="bg-white opacity-70 absolute top-0 left-0 w-100 h-100 z-10"></div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* QUestion reaction */}
        {question.likes ? (
          <div className="mb-2 flex cursor-pointer">
            <span className="bg-background hover:bg-danger-highlight px-2 py-1 flex justify-around items-center rounded-lg">
              <img className="h-4 w-4" src={love} alt="" />{" "}
              <span className="ml-1 font-medium text-sm">
                {question?.likes}
              </span>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="comment text-sm sm:text-lg font-semibold text-brand py-[14px] bg-brnd-highlight flex justify-between">
          {question.comments === 0 ? "Leave a comment" : ""}{" "}
          {question.comments === 1 ? `${question.comments} comment` : ""}{" "}
          {question.comments > 1 ? `${question.comments} comments` : ""}{" "}
          <img className="mr-2" src={arrow} alt="" />
        </div>
      </section>
    </div>
  );
  nd;
};

export default Question;
