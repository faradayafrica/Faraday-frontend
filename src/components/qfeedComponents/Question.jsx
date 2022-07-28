import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import profile1 from "../../images/profile2.png";
import arrow from "../../images/qfeed/arrow-right.svg";
import love from "../../images/qfeed/love.svg";
import redLove from "../../images/qfeed/red-love.svg";
import smiley from "../../images/qfeed/smiley.svg";
import share from "../../images/qfeed/share.svg";
import link from "../../images/qfeed/link.svg";
import http from "../../services/httpService";

const Question = ({ question, questions }) => {
  const [isLiked, setLiked] = useState(question.liked);
  const [likes, setLikes] = useState(question.likes);
  const [isButtonPannel, setButtonPannel] = useState(false);
  // console.log("question", question);

  const apiEndpoint = process.env.REACT_APP_API_URL + "/qfeed/que/vote_que/";

  let smileyClasses =
    "hover:bg-brand-highlight px-2  h-8 flex justify-around items-center rounded-lg";

  let loveClasses =
    "hover:bg-danger-highlight h-8 px-2 flex justify-around items-center rounded-lg mr-2";

  if (!isButtonPannel) {
    smileyClasses += " bg-background ";
  } else {
    smileyClasses += " bg-brand-highlight icon-brand";
  }

  if (!isLiked) {
    loveClasses += " bg-background ";
  } else {
    loveClasses += " bg-danger-highlight text-danger";
  }

  const handleButtonPannel = () => {
    setButtonPannel(!isButtonPannel);
    // console.log("toggle");
  };

  const hideButtonPannel = () => {
    setButtonPannel(false);
  };

  const handleLike = async (postid) => {
    const oldValue = likes;
    const oldLiked = isLiked;
    hideButtonPannel();

    if (!isLiked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }

    try {
      const { data } = await http.post(apiEndpoint, {
        postid,
        value: "upvote",
      });

      console.log("data", data);
    } catch (err) {
      setLiked(oldLiked);
      setLikes(oldValue);
      console.warn("error", err.message);
    }
  };

  return (
    <div className="question-component pl-3 pt-3 sm:pt-4  flex justify-start">
      <img
        src={question?.user.profile_pic}
        className="w-12 h-12 rounded-full mr-2"
        alt=""
      />
      <section className=" p-0 w-full">
        <div className="pr-2" onClick={() => hideButtonPannel()}>
          {/* Profile details */}
          <p className="flex m-0 text-night-secondary mb-1 text-xs sm:text-sm">
            <span className="mr-2 font-semibold text-faraday-night">
              {question?.first_name} {question?.last_name} Ada Obi
            </span>
            <span className="mr-2">@{question?.user.username}</span>{" "}
            <span>{question?.created}</span>
          </p>
          {/* Question head */}
          <h3 className="text-sm sm:text-lg leading-[120%] font-semibold m-0 mb-1">
            {question?.title}
          </h3>
          {/* Question body --optional */}
          <p className="text-sm sm:text-base m-0 mb-2">{question?.content}</p>
        </div>

        {/* QUestion reaction */}
        <div className=" flex items-center h-12">
          {likes !== 0 ? (
            <button
              className={loveClasses}
              onClick={() => handleLike(question.id, likes)}
            >
              {isLiked ? (
                <img
                  className="h-4 w-4"
                  src={redLove}
                  alt="take back reaction"
                />
              ) : (
                <img className="h-4 w-4" src={love} alt="react to question" />
              )}
              <span className="ml-1 font-medium text-sm">{likes}</span>
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
            <span
              onClick={() => hideButtonPannel()}
              className="ask-shadow bg-white relative right-8 bottom-10 p-2 rounded-full border border-brand-highlight"
            >
              {isLiked ? (
                <button
                  className=" p-2 rounded-full hover:bg-danger-highlight"
                  onClick={() => handleLike(question.id)}
                >
                  <img
                    className="h-4 w-4"
                    src={redLove}
                    alt="take back reaction"
                  />
                </button>
              ) : (
                <button
                  className=" p-2 rounded-full icon-brand-hover hover:bg-brand-highlight"
                  onClick={() => handleLike(question.id)}
                >
                  <img
                    className="h-[18px] w-[18px]"
                    src={love}
                    alt="react to question"
                  />
                </button>
              )}
              <button className=" p-2 rounded-full icon-brand-hover hover:bg-brand-highlight mx-2">
                <img
                  className="h-[18px] w-[18px]"
                  src={share}
                  alt="share this question"
                />
              </button>
              <button className=" p-2 rounded-full icon-brand-hover hover:bg-brand-highlight">
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
        <Link to={`/qfeed/${question.id}`}>
          <div className="comment text-base sm:text-lg font-semibold text-brand py-[14px] bg-brnd-highlight flex justify-between">
            {question.comments === 0 ? "Leave a comment" : ""}{" "}
            {question.comments === 1 ? `${question.comments} comment` : ""}{" "}
            {question.comments > 1 ? `${question.comments} comments` : ""}{" "}
            <img className="mr-2" src={arrow} alt="" />
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Question;
