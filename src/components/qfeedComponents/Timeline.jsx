import { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import profile1 from "../../images/profile2.png";
import profile2 from "../../images/profile3.png";
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
        <h1 className="text-3xl m-3 font-bold">Question Feed</h1>

        {/* The question component */}
        <div className="question-component bg-brnd-highlight p-4 flex justify-start">
          <img src={profile1} className="w-12 h-12 rounded-full mr-3" alt="" />
          <section>
            {/* Profile details */}
            <p className="flex m-0 text-night-secondary mb-1">
              <span className="mr-2">
                {currentUser?.first_name} {currentUser?.last_name}
              </span>
              <span className="mr-2"> @{currentUser?.username}</span>{" "}
              <span>2h</span>
            </p>
            {/* Question head */}
            <p className="text-xl leading-[120%] font-semibold m-0 mb-2">
              Lorem ipsum dolor sit amet, co no sectetur adipiscing elit. Ultr
              icies risus laoreet enim tristi?
            </p>
            {/* Question body --optional */}
            <p className="m-0 leading-[120%]">
              Lorem ipsum dolor sit amet, co no sectetur adipiscing elit. Ultr
              icies risus laoreet enim tristi?
            </p>
          </section>
        </div>

        <div className="h-[3000px] w-full bg-red-100"></div>
      </div>
    </>
  );
};

export default TimeLine;
