import { useState, useEffect } from "react";
import Question from "./Question";
import { Link } from "react-router-dom";
import ask from "../../images/qfeed/ask.svg";
import Loader from "../styledComponents/Loader";
import SecondaryButton from "../styledComponents/SecondaryButton";
import "../../styles/qfeed.css";

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

        <>
          {questions.map((question) => (
            <Question
              online={props.online}
              question={question}
              questions={props.questions}
              handleUpdatedQuestions={props.handleUpdatedQuestions}
              onFollowUser={props.onFollowUser}
              onDeleteQuestion={props.onDeleteQuestion}
              key={question.id}
            />
          ))}
        </>

        <Link
          to="/qfeed/post"
          className="sm:hidden fixed right-6 bottom-20 h-16 w-16"
        >
          {" "}
          <img className="ask-shadow rounded-full" src={ask} alt="" />
        </Link>

        {!props.loader && questions.length == 0 ? (
          <div className="p-3 border-brand-highlight rounded-lg border bg-background m-3 text-center">
            <>
              <p className="text-sm sm:text-base ">Something went wrong</p>
              <SecondaryButton cta="Retry" action={props.retry} />
            </>
          </div>
        ) : (
          ""
        )}

        {props.loader ? (
          <div className="m-3">
            <Loader msg="fetching questions" />
            <div className="h-[65px] w-full sm:hidden"></div>
          </div>
        ) : (
          <>
            {!questions.length == 0 && (
              <>
                <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
                  <p className="text-xs sm:text-base m-0 ">
                    No more question to fetch
                  </p>
                </div>
                <div className="h-[65px] w-full sm:hidden"></div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TimeLine;
