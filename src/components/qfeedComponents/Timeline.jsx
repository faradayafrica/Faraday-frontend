import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import Question from "./Question";

import "../../styles/qfeed.css";
import data from "../../questions.json";

const TimeLine = () => {
  const [questions, setQuestions] = useState(data.results);
  //   const currentUser = getCurrentUser();
  console.log("Timeline", questions);

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px]"> </div>
      <div className="">
        <h1 className="text-2xl sm:text-2xl m-3 font-bold">Question Feed</h1>

        {/* The questions */}
        {questions.map((question) => (
          <Question question={question} key={question.id} />
        ))}

        <div className="h-[65px] w-full"></div>
      </div>
    </>
  );
};

export default TimeLine;
