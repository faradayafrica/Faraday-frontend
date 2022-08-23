import { useState, useEffect } from "react";
import Question from "./Question";
import { Link } from "react-router-dom";
import ask from "../../images/qfeed/ask.svg";
import Loader from "../styledComponents/Loader";
import "../../styles/qfeed.css";
import SecondaryButton from "../styledComponents/SecondaryButton";

const TimeLine = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(props.questions);
  }, [props.questions]);

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px] "> </div>
      <div className="">
        <h1 className="text-2xl sm:text-2xl m-3 font-bold">Question Feed</h1>
        {/* The questions */}
        {questions.length !== 0 ? (
          <>
            {questions.map((question) => (
              <Question
                question={question}
                questions={props.questions}
                handleUpdatedQuestions={props.handleUpdatedQuestions}
                onFollowUser={props.onFollowUser}
                onDeleteQuestion={props.onDeleteQuestion}
                key={question.id}
              />
            ))}
          </>
        ) : (
          <>
            {props.loader ? (
              <div className="m-3">
                <Loader msg="This might take a while..." />
              </div>
            ) : (
              <div className="p-3 border-brand-highlight rounded-lg border bg-background m-3 text-center">
                <>
                  <p className="text-sm sm:text-base ">
                    Make sure you are connected to the internet and try again
                  </p>
                  <SecondaryButton cta="Retry" action={props.retry} />
                </>
              </div>
            )}
          </>
        )}

        <Link
          to="/post"
          className="sm:hidden fixed right-6 bottom-20 h-16 w-16"
        >
          {" "}
          <img className="ask-shadow rounded-full" src={ask} alt="" />
        </Link>

        {props.nextPageLoader && (
          <div className="m-3">
            <Loader msg="fetching more questions" />
            <div className="h-[65px] w-full sm:hidden"></div>
          </div>
        )}

        {!props.nextPageUrl ? (
          <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
            <p className="text-xs sm:text-base m-0 ">
              No more question to fetch
            </p>
            <div className="h-[65px] w-full sm:hidden"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TimeLine;
