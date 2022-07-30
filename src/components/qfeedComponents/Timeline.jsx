import { useState, useEffect } from "react";
import Question from "./Question";
import { Link } from "react-router-dom";
import ask from "../../images/qfeed/ask.svg";
import Loader from "../styledComponents/Loader";
import "../../styles/qfeed.css";

const TimeLine = (props) => {
  const [questions, setQuestions] = useState([]);
  // console.log("Q1", props.questions);

  useEffect(() => {
    setQuestions(props.questions);
  }, [props.questions]);

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px] "> </div>
      <div className="">
        <h1 className="text-2xl sm:text-2xl m-3 font-bold">Question Feed</h1>
        {/* The questions */}
        {questions.length === 0 ? (
          <div className="m-3">
            <Loader msg="This might take a while..." />
          </div>
        ) : (
          <>
            {questions.map((question) => (
              <Question
                question={question}
                questions={props.questions}
                handleUpdatedQuestions={props.handleUpdatedQuestions}
                key={question.id}
              />
            ))}
          </>
        )}

        <Link
          to="/post"
          className="sm:hidden fixed right-6 bottom-20 h-16 w-16"
        >
          {" "}
          <img className="ask-shadow rounded-full" src={ask} alt="" />
        </Link>
        <div className="h-[65px] w-full "></div>
      </div>
    </>
  );
};

export default TimeLine;
