import { useState, useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DiscussionPage from "../components/qfeedComponents/DiscussionPage.jsx";
import TimeLine from "../components/qfeedComponents/Timeline.jsx";
import NotFound from "./NotFound.jsx";
import http from "../services/httpService";
import SideNav from "../components/styledComponents/SideNav.jsx";
import {
  PromiseToast,
  SuccessToast,
  ErrorToast,
} from "../components/common/CustomToast.js";

const Qfeed = (props) => {
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState(true);

  const apiEndpoint = process.env.REACT_APP_API_URL + "/qfeed/que/fetch/";

  const handleFollow = (username) => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/users/${username}/follow/`;

    try {
      const promise = http.post(apiEndpoint);
      PromiseToast(
        `${username} followed`,
        "An error occurred, Try again",
        promise
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteQuestion = async (selectedQuestion) => {
    const remainingQuestions = questions.filter((question) => {
      return question.id !== selectedQuestion.id;
    });

    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/qfeed/que/delete/${selectedQuestion.id}/`;

    try {
      await http.delete(apiEndpoint);
      SuccessToast("Question deleted");
      setQuestions([...remainingQuestions]);
    } catch (e) {
      console.warn("Buttocks", e.message);
      ErrorToast("Couldn't delete question");
    }
  };

  const updateQuestions = (updatedQuestions) => {
    setQuestions([...updatedQuestions]);
  };

  const retry = async () => {
    setLoader(true);
    fetchQuestions(apiEndpoint);
    window.addEventListener("scroll", handleScroll);
  };

  let nextQuestionPageUrl = "";
  const questionRequestQueue = [];

  console.log("NEW TOTAL", questions.length);

  const fetchQuestions = async (url) => {
    questionRequestQueue.push(url);
    try {
      const { data } = await http.get(url);
      setQuestions((prevQuestions) => [...prevQuestions, ...data.results]);
      setLoader(false);
      nextQuestionPageUrl = data.next;
    } catch (err) {
      setLoader(false);
      throw err;
    }
  };

  const handleScroll = (e) => {
    if (nextQuestionPageUrl) {
      if (
        e.target.documentElement.scrollTop + window.innerHeight + 1000 >=
        e.target.documentElement.scrollHeight
      ) {
        if (!questionRequestQueue.includes(nextQuestionPageUrl)) {
          console.log(">", questionRequestQueue);
          fetchQuestions(nextQuestionPageUrl);
          setLoader(true);
        } else {
          console.warn("Duplicate request blocked");
        }
      }
    }
  };

  useEffect(() => {
    fetchQuestions(apiEndpoint);
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* <div className="h-40 bg-[#D8000C] w-full"></div> */}
      <SideNav {...props} />

      <div className="w-full route-wrapper">
        <Switch>
          <Route
            path="/qfeed/:id"
            render={(props) => (
              <DiscussionPage
                questions={questions}
                handleUpdatedQuestions={updateQuestions}
                onFollowUser={handleFollow}
                onDeleteQuestion={deleteQuestion}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            render={(props) => (
              <TimeLine
                questions={questions}
                handleUpdatedQuestions={updateQuestions}
                onFollowUser={handleFollow}
                onDeleteQuestion={deleteQuestion}
                retry={retry}
                loader={loader}
                nextQuestionPageUrl={nextQuestionPageUrl}
                {...props}
              />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect push to="/not-found" />
        </Switch>
      </div>
    </>
  );
};

export default Qfeed;
