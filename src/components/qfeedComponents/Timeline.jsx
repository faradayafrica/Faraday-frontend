import { useState, useEffect } from "react";
import http from "../../services/httpService";
import Question from "./Question";
import { Link } from "react-router-dom";
import ask from "../../images/qfeed/ask.svg";

import "../../styles/qfeed.css";
import data from "../../questions.json";

const TimeLine = () => {
  const [questions, setQuestions] = useState(data.results);
  console.log("Timeline", questions[0]);

  useEffect(() => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "qfeed/que/fetch/";
    const data = http.get(apiEndpoint);
    console.log("data", data);
  });

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px]"> </div>
      <div className="">
        <h1 className="text-2xl sm:text-2xl m-3 font-bold">Question Feed</h1>

        {/* The questions */}
        {questions.map((question) => (
          <Question question={question} key={question.id} />
        ))}

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
