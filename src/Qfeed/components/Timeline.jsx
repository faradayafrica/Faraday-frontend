import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { saveState, getState } from "../../common/components/StateSaver";
import Question from "./Question";
import SecondaryButton from "../../common/components/SecondaryButton";
import PrimaryButton from "../../common/components/PrimaryButton";
import { useSelector } from "react-redux";
import ask from "../assets/ask.svg";
import "../styles/qfeed.css";
import QuestionsLoader from "./QuestionsLoader";
import uuid from "react-uuid";

const TimeLine = (props) => {
  const [scrollPosition, setScrollPosition] = useState([]);

  // Redux biz starts here
  const { qfeed: questions } = useSelector((state) => state.qfeed.feed);
  // Redux biz ends here

  // Preserve Scroll position
  useEffect(() => {
    if (getState("QFeed")) {
      let { scrollY } = getState("QFeed");
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50);
    }
  }, []);

  // Save scroll position
  useEffect(() => {
    const save = () => {
      setScrollPosition(window.pageYOffset);
      saveState("QFeed", { scrollY: scrollPosition });
    };
    save();
    document.addEventListener("scroll", save);
    return () => document.removeEventListener("scroll", save);
  }, [window.pageYOffset]);

  // console.log(
  //   questions,
  //   questions.filter((ques) => ques.type === "pen"),
  //   "ANNNNNNI"
  // );

  return (
    <div className='relative'>
      <div className='bg-background ' id='timeline'>
        <div className='min-h-[70px] sm:min-h-[0px] bg-transparent'> </div>
        <h1 className='text-center md:!text-left text-2xl sm:text-2xl m-3 font-bold'>
          Question Feed
        </h1>
        {/* The questions */}

        <>
          {questions?.length ? (
            <div className='space-y-1 sm:space-y-0 bg-background'>
              {questions?.map((question) => (
                <Question
                  question={question}
                  key={question.id + uuid()}
                  refetch={props.refetch}
                  {...props}
                />
              ))}
            </div>
          ) : (
            <>
              {!props.loader && (
                <div className='p-3 bg-white'>
                  <div className='p-3 rounded-lg border bg-background  text-center'>
                    <p className='text-xs sm:text-base m-0  mb-2'>
                      {props.isError
                        ? props.error.message
                        : "No questions yet! Be the first to ask the first question"}
                    </p>

                    <Link to='/qfeed/post'>
                      <PrimaryButton cta='Ask a question' />
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}
        </>

        {/* Fixed CTA on the timeline for mobile */}
        <Link
          to='/qfeed/post'
          className='sm:hidden fixed right-6 bottom-20 h-16 w-16 z-50'
        >
          {" "}
          <img className='ask-shadow rounded-full' src={ask} alt='' />
        </Link>

        {props.isError ? (
          <div className='p-3  rounded-lg border bg-background m-3 text-center'>
            <>
              <p className='text-sm sm:text-base '>Something went wrong</p>
              <SecondaryButton cta='Retry' action={props.refetch} />
            </>
          </div>
        ) : (
          ""
        )}

        {props.loader ? (
          !questions?.length ? (
            <QuestionsLoader />
          ) : (
            <QuestionsLoader short='true' />
          )
        ) : (
          <>
            {questions?.length > 0 && !props.hasNextPage && (
              <>
                <div className='p-3 m-3 mr-1 rounded-lg border bg-background  text-center'>
                  <p className='text-xs sm:text-base m-0 mb-2 '>
                    No more questions to fetch
                  </p>

                  <Link to='/qfeed/post'>
                    <PrimaryButton cta='Ask a question' />
                  </Link>
                </div>
                <div className='h-[65px] w-full sm:hidden'></div>
              </>
            )}
          </>
        )}

        {props.loader && questions?.length <= 1 ? (
          <QuestionsLoader />
        ) : (
          // This is suppose to be the loader that shows when a user scrolls to the bottom after localStorage populates the Qfeed
          <>
            <div className='h-24'></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeLine;
