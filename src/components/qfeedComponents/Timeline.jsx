import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveState, getState } from "../common/StateSaver";
import Question from "./Question";
import SecondaryButton from "../styledComponents/SecondaryButton";
import Loader from "../styledComponents/Loader";

//icon import
import ask from "../../images/qfeed/ask.svg";

//style import
import "../../styles/qfeed.css";
import CommentsLoader from "./commentComponents/CommentsLoader";
import QuestionsLoader from "./QuestionsLoader";

const TimeLine = (props) => {
  const [questions, setQuestions] = useState([]);
  const [scrollPosition, setScrollPosition] = useState([]);

  // console.log(props.loader, "loader");

  useEffect(() => {
    setQuestions(props.questions);
  }, [props.questions]);

  // Preserve Scroll position
  useEffect(() => {
    if (getState("QFeed")) {
      let { scrollY } = getState("QFeed");
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50);
    }
  }, []);

  useEffect(() => {
    const save = () => {
      setScrollPosition(window.pageYOffset);
      saveState("QFeed", { scrollY: scrollPosition });
    };
    save();
    document.addEventListener("scroll", save);
    return () => document.removeEventListener("scroll", save);
  }, [window.pageYOffset]);

  return (
    <div className="relative">
      <div className="bg-white " id="timeline">
        <div className="min-h-[70px] sm:min-h-[0px] bg-transparent"> </div>
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
              {...props}
            />
          ))}
        </>

        <Link
          to="/qfeed/post"
          className="sm:hidden fixed right-6 bottom-20 h-16 w-16 z-50"
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

        {props.loader ? <QuestionsLoader /> : ""}

        {props.isFetchingNextPage && props.hasNextPage ? (
          <>
            <CommentsLoader short="true" />
            <div className="h-24"></div>
          </>
        ) : null}

        {!props.hasNextPage && props.data?.pages.length && (
          <>
            <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
              <p className="text-xs sm:text-base m-0 ">
                No more questions to fetch
              </p>
            </div>
            <div className="h-[65px] w-full sm:hidden"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeLine;
