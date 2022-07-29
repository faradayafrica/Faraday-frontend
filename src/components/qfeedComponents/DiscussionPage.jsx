import { useState, useEffect } from "react";
import Loader from "../styledComponents/Loader";

import love from "../../images/qfeed/love.svg";
import redLove from "../../images/qfeed/red-love.svg";
import share from "../../images/qfeed/share.svg";
import link from "../../images/qfeed/link.svg";
import http from "../../services/httpService";

const DiscussionPage = ({ match, questions, handleUpdatedQuestions }) => {
  const thisQuestion = questions.filter((q) => q.id === match.params.id)[0];

  const [question, setQuestion] = useState(thisQuestion);
  const [loader, setloader] = useState(false);

  const handleLike = async (postid) => {
    const oldLikes = question.likes;
    const oldLiked = question.liked;
    const updatedQuestion = { ...question };

    const clonedQuestions = [...questions];
    var index = clonedQuestions.findIndex((q) => q.id === question.id);

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
      const apiEndpoint =
        process.env.REACT_APP_API_URL + "/qfeed/que/vote_que/";
      const { data } = await http.post(apiEndpoint, {
        postid,
        value: "upvote",
      });

      if (index !== -1) {
        clonedQuestions[index] = { ...data };
      }
      handleUpdatedQuestions(clonedQuestions);

      console.log("index", index);
      console.log("new", clonedQuestions[index]);
      console.log("data", data);
    } catch (err) {
      updatedQuestion.liked = oldLiked;
      setQuestion({ ...updatedQuestion });
      console.warn("error", err.message);
    }
  };

  const retry = async () => {
    setloader(true);
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/qfeed/que/fetch/${match.params.id}/`;
    try {
      const { data } = await http.get(apiEndpoint);
      console.log("a particular ques", data);
      setQuestion(data);
      setloader(false);
    } catch (err) {
      console.warn(err.message);
    }
  };

  //   console.log("QPage", question);
  useEffect(async () => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/qfeed/que/fetch/${match.params.id}/`;
    try {
      const { data } = await http.get(apiEndpoint);
      console.log("a particular ques", data);
      setQuestion(data);
      // console.log("Q", data);
    } catch (err) {
      console.warn(err.message);
    }
  }, []);

  let loveClasses =
    "hover:bg-danger-highlight h-12 px-4 flex justify-around items-center rounded-xl mr-4";

  if (!question?.liked) {
    loveClasses += " bg-background ";
  } else {
    loveClasses += " bg-danger-highlight text-danger";
  }

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px] "> </div>
      <div>
        <h1 className="text-2xl sm:text-2xl m-3 font-bold">Discussion</h1>
        {question ? (
          <div className="pl-3 pr-2 py-3">
            <img
              src={question?.user.profile_pic}
              className="w-12 h-12 rounded-full mr-3 float-left"
              alt=""
            />
            <p className="m-0 text-night-secondary text-sm sm:text-base">
              <span className="font-semibold text-faraday-night mr-2">
                {question?.user.firstname} {question?.user.lastname}
              </span>{" "}
              <span className="">@{question?.user.username}</span>
            </p>
            <p className="m-0 text-night-secondary text-sm sm:text-base">
              Published {question?.created}
            </p>

            <h3 className=" mt-3 text-lg sm:text-xl font-semibold m-0 mb-2">
              {question?.title}
            </h3>

            <p className="text-sm sm:text-base m-0 mb-2 ">
              {question?.content}
            </p>

            {/* Engagement buttons  */}
            <div className="flex items-center h-12 ">
              <button
                className={loveClasses}
                onClick={() => handleLike(match.params.id)}
              >
                {question?.liked ? (
                  <img
                    className="h-5 w-5"
                    src={redLove}
                    alt="take back reaction"
                  />
                ) : (
                  <img className="h-5 w-5" src={love} alt="react to question" />
                )}
                <span className="ml-1 font-medium text-lg">
                  {question?.likes}
                </span>
              </button>
              <button className="icon-brand-hover hover:bg-brand-highlight px-4 h-12 flex justify-around items-center rounded-lg bg-background mr-4">
                <img
                  className="h-5 w-5"
                  src={share}
                  alt="share this question"
                />
              </button>
              <button className="icon-brand-hover hover:bg-brand-highlight px-4 h-12 flex justify-around items-center rounded-lg bg-background">
                <img className="h-5 w-5" src={link} alt="copy question link" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {!loader ? (
              <div className="p-3 border-brand-highlight rounded-xl border bg-background m-3">
                <>
                  <p>Question currently unavailable</p>
                  <button
                    onClick={() => retry()}
                    className="px-4 py-[10px] rounded-xl text-semibold text-white bg-brand hover:bg-brand-dark"
                  >
                    Retry
                  </button>
                </>
              </div>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DiscussionPage;
