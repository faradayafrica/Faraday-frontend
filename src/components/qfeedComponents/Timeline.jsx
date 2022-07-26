import { useState, useEffect } from "react";
import http from "../../services/httpService";
import Question from "./Question";
import { Link } from "react-router-dom";
import ask from "../../images/qfeed/ask.svg";
import Loader from "../styledComponents/Loader";

import "../../styles/qfeed.css";
import dummy from "../../questions.json";

const TimeLine = () => {
  const [questions, setQuestions] = useState([]);
  console.log("dummy", dummy.results);

  useEffect(async () => {
    const apiEndpoint = process.env.REACT_APP_API_URL + "/qfeed/que/fetch/";
    try {
      const { data } = await http.get(apiEndpoint);
      setQuestions(data.results);
    } catch (err) {
      console.warn(err.message);
    }
  }, []);

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px] "> </div>
      {(
        <div className="">
          <h1 className="text-2xl sm:text-2xl m-3 font-bold">Question Feed</h1>
          {/* The questions */}
          {questions.length === 0 ? (
            <Loader />
          ) : (
            <>
              {questions.map((question) => (
                <Question question={question} key={question.id} />
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
      ) || <div className="bg-red-900 h-32 w-full"></div>}
    </>
  );
};

export default TimeLine;
