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

  const main = async () => {
    // Check if service workers are supported
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      // Check if periodicSync is supported
      if ("periodicSync" in registration) {
        // Request permission
        const status = await navigator.permissions.query({
          name: "periodic-background-sync",
        });
        if (status.state === "granted") {
          try {
            // Register new sync every 24 hours
            await registration.periodicSync.register("news", {
              minInterval: 24 * 60 * 60 * 1000,
              // 1 day
            });
            console.log("Periodic background sync registered!");
          } catch (e) {
            console.error(`Periodic background sync failed:\n${e}`);
          }
        }
      }
    }
  };

  main();

  const handleFollow = (user) => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/users/${user.username}/follow/`;

    const clonedQuestions = [...questions];
    const userQuestions = clonedQuestions.filter((q) => q.user.id === user.id);

    try {
      const promise = http.post(apiEndpoint).then((resp) => {
        userQuestions.map(
          (question) =>
            (question.user.is_following = !question.user.is_following)
        );
      });
      const msg = user.is_following ? `Unfollowed` : "Followed";

      PromiseToast(
        `${msg} ${user.username}`,
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
        e.target.documentElement.scrollTop + window.innerHeight + 500 >=
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
