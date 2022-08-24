import { useState } from "react";
import { Link } from "react-router-dom";
import QuestionMenu from "./QuestionMenu";
import arrow from "../../images/qfeed/arrow-right.svg";
import love from "../../images/qfeed/love.svg";
import redLove from "../../images/qfeed/red-love.svg";
import smiley from "../../images/qfeed/smiley.svg";
import share from "../../images/qfeed/share.svg";
import link from "../../images/qfeed/link.svg";
import http from "../../services/httpService";
import ellipses from "../../images/qfeed/ellipses.svg";
import { SuccessToast } from "../common/CustomToast";

const Question = (props) => {
  const [question, setQuestion] = useState(props.question);
  const [isButtonPannel, setButtonPannel] = useState(false);
  const [questionMenu, setQuestionMenu] = useState(false);

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

  if (!question.liked) {
    loveClasses += " bg-background ";
  } else {
    loveClasses += " bg-danger-highlight text-danger";
  }

  const toggleQuestionMenu = () => {
    setQuestionMenu(!questionMenu);
  };

  const handleButtonPannel = () => {
    setButtonPannel(!isButtonPannel);
  };

  const hideButtonPannel = () => {
    setButtonPannel(false);
  };

  // This could go 2 levels up the family tree (@Qfeed) so that there's no need to recreate the function @DiscussionPage
  const handleLike = async (postid) => {
    const oldLikes = question.likes;
    const oldLiked = question.liked;
    const updatedQuestion = { ...question };

    const clonedQuestions = [...props.questions];
    var index = clonedQuestions.findIndex((q) => q.id === question.id);

    hideButtonPannel();

    if (!question.liked) {
      updatedQuestion.likes = oldLikes + 1;
      updatedQuestion.liked = !oldLiked;
      setQuestion({ ...updatedQuestion });
    } else {
      updatedQuestion.likes = oldLikes - 1;
      updatedQuestion.liked = !oldLiked;
      setQuestion({ ...updatedQuestion });
    }

    try {
      let likeData;

      if (oldLiked) {
        const { data } = await http.post(apiEndpoint, {
          postid,
          value: "downvote",
        });
        SuccessToast("Question unliked");
        likeData = data.data;
      } else {
        const { data } = await http.post(apiEndpoint, {
          postid,
          value: "upvote",
        });
        SuccessToast("Question liked");
        likeData = data.data;
      }

      if (index >= -1) {
        clonedQuestions[index] = { ...likeData };
      }
      props.handleUpdatedQuestions(clonedQuestions);
    } catch (err) {
      updatedQuestion.liked = oldLiked;
      updatedQuestion.likes = oldLikes;
      setQuestion({ ...updatedQuestion });
      console.warn("error", err.message);
    }
  };

  return (
    <div className="question-component pl-3 pr-2 pt-3 sm:pt-4 bg-white flex justify-start relative">
      <Link
        to={`/me/${question?.user.username}`}
        style={{ textDecoration: "none" }}
        className="w-14 mr-2 cursor-pointer"
      >
        <img
          src={`https://api.faraday.africa${question?.user.profile_pic}`}
          className="w-12 h-12 rounded-full "
          style={{ objectFit: "cover" }}
          alt={`${question?.user.firstname} ${question?.user.lastname}`}
        />
      </Link>
      <section className=" p-0 w-full">
        <div className="pr-2" onClick={() => hideButtonPannel()}>
          {/* Profile details */}
          <p className="flex m-0 text-night-secondary mb-1 text-xs sm:text-sm">
            <span className="mr-2 font-semibold text-faraday-night">
              {question?.user.firstname} {question?.user.lastname}
            </span>
            <span className="mr-2">@{question?.user.username}</span>{" "}
            <span>{question?.created}</span>
          </p>

          <div
            className=" hover:bg-brand-highlight cursor-pointer absolute right-4 top-2 rounded-md"
            onClick={() => {
              setQuestionMenu(!questionMenu);
            }}
          >
            <img
              src={ellipses}
              className="w-6 h-6 rounded-full m-1 "
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>

          <QuestionMenu
            questionMenu={questionMenu}
            question={question}
            toggleQuestionMenu={toggleQuestionMenu}
            onFollowUser={props.onFollowUser}
            onDeleteQuestion={props.onDeleteQuestion}
          />

          <Link
            to={`/qfeed/${question.id}`}
            style={{ textDecoration: "none" }}
            className=" text-faraday-night hover:text-faraday-night"
          >
            {/* Question head */}
            <h3 className="text-sm sm:text-lg leading-[120%] font-semibold m-0 mb-1">
              {question?.title}
            </h3>
            {/* Question body --optional */}
            <p className="text-sm sm:text-base m-0 mb-2">{question?.content}</p>
          </Link>
        </div>

        {/* QUestion reaction */}
        <div className=" flex items-center h-12">
          {question.likes !== 0 ? (
            <button
              className={loveClasses}
              onClick={() => handleLike(question.id)}
            >
              {question.liked ? (
                <img
                  className="h-4 w-4"
                  src={redLove}
                  alt="take back reaction"
                />
              ) : (
                <img className="h-4 w-4" src={love} alt="react to question" />
              )}
              <span className="ml-1 font-medium text-sm">{question.likes}</span>
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
              {question.liked ? (
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
        <Link to={`/qfeed/${question.id}`} style={{ textDecoration: "none" }}>
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
