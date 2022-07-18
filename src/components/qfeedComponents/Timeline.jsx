import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import Question from "./Question";

import "../../styles/qfeed.css";
import data from "../../questions.json";

const TimeLine = () => {
  const [questions, setQuestions] = useState(data.results);
  const currentUser = getCurrentUser();
  console.log("Timeline", questions);

  return (
    <>
      <div className="min-h-[70px] sm:min-h-[0px]"> </div>
      <div className="">
        <h1 className="text-2xl sm:text-2xl m-3 font-bold">Question Feed</h1>

        {/* The question component */}
        <Question />
        <Question />
        <Question />
        <Question />

        <div className="h-[3000px] w-full bg-red-100"></div>
      </div>
    </>
  );
};

export default TimeLine;
