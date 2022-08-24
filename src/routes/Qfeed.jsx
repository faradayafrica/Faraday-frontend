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
import axios from "axios";

const Qfeed = (props) => {
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState(true);

  const uniqueQuestions = Array.from(new Set(questions.map((a) => a.id))).map(
    (id) => {
      return questions.find((a) => a.id === id);
    }
  );

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
    try {
      const { data } = await http.get(apiEndpoint);
      setQuestions(data.results);
    } catch (err) {
      console.warn(err.message);
      setLoader(false);
    }
  };

  let nextQuestionPageUrl = ""; //This is a placeholder value to keep the value truthy
  console.log("NEW TOTAL", questions.length);

  const fetchQuestions = async (url) => {
    let source = axios.CancelToken.source();

    try {
      // console.log("Its:", url);
      const { data } = await http.get(url, {
        cancelToken: source.token,
      });
      setQuestions((prevQuestions) => [...prevQuestions, ...data.results]);
      setLoader(false);
      nextQuestionPageUrl = data.next;
    } catch (err) {
      setLoader(false);
      throw err;
    }

    return () => {
      // source.cancel();
      source.current.cancel();
    };
  };

  const handleScroll = (e) => {
    if (nextQuestionPageUrl) {
      if (
        e.target.documentElement.scrollTop + window.innerHeight + 20 >=
        e.target.documentElement.scrollHeight
      ) {
        fetchQuestions(nextQuestionPageUrl);
        setLoader(true);
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
                questions={uniqueQuestions}
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
                questions={uniqueQuestions}
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
