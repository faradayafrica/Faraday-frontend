import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DiscussionPage from "../components/qfeedComponents/DiscussionPage.jsx";
import PostPage from "../components/qfeedComponents/PostPage";
import TimeLine from "../components/qfeedComponents/Timeline.jsx";
import NotFound from "./NotFound.jsx";
import http from "../services/httpService";

import {
  PromiseToast,
  SuccessToast,
  ErrorToast,
} from "../components/common/CustomToast.js";
import { concat } from "joi-browser";

const Qfeed = (props) => {
  const [questions, setQuestions] = useState([]);
  const [loader, setLoader] = useState(true);

  const removeDuplicate = (arr) => {
    const arrWithUniqueItems = Array.from(new Set(arr.map((a) => a.id))).map(
      (id) => {
        return arr.find((a) => a.id === id);
      }
    );

    return arrWithUniqueItems;
  };

  const { online } = props;

  const apiEndpoint = process.env.REACT_APP_API_URL + "/qfeed/que/fetch/";

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
      // console.log("ques", questions);
      const { data } = await http.get(url);
      setQuestions((prevQuestions) => [...prevQuestions, ...data.results]);

      setLoader(false);
      nextQuestionPageUrl = data.next;

      // Save state to Local Storage
      window.localStorage.setItem(
        "questions",
        JSON.stringify({
          next: data.next,
          questions: questions.concat(...data.results),
        })
      );
    } catch (err) {
      setLoader(false);
      throw err;
    }
  };

  const handleScroll = (e) => {
    if (nextQuestionPageUrl && document.getElementById("timeline") !== null) {
      if (
        e.target.documentElement.scrollTop + window.innerHeight + 1000 >=
        e.target.documentElement.scrollHeight
      ) {
        if (!questionRequestQueue.includes(nextQuestionPageUrl)) {
          console.log("Request Q>", questionRequestQueue);
          fetchQuestions(nextQuestionPageUrl);
          setLoader(true);
        } else {
          console.warn("Duplicate request blocked");
        }
      }
    }
  };

  // Checks Local Storage and populates the Qfeed
  useEffect(() => {
    let storedQuestions;

    storedQuestions = JSON.parse(localStorage.getItem("questions"));

    if (storedQuestions) {
      SuccessToast(
        `We saved ${storedQuestions.questions.length} for offline mode`
      );
      setQuestions([...storedQuestions.questions]);
      nextQuestionPageUrl = storedQuestions.next
        ? storedQuestions.next
        : apiEndpoint;
    } else {
      fetchQuestions(apiEndpoint);
    }
    window.addEventListener("scroll", handleScroll);
  }, []);

  let lastScrollTop = 0;

  useEffect(() => {
    if (document.getElementById("timeline") !== null) {
      window.addEventListener(
        "scroll",
        (e) => {
          let st = e.target.documentElement.scrollTop;
          if (st > lastScrollTop) {
            // downscroll code
            document.getElementById("topnav").classList.add("hide-up");
            document.getElementById("bottomnav").classList.add("hide-down");
          } else {
            // upscroll code
            document.getElementById("topnav").classList.remove("hide-up");
            document.getElementById("bottomnav").classList.remove("hide-down");
          }
          lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        },
        false
      );
    }
  });

  return (
    <div className="relative w-full route-wrapper ">
      <div className="w-full bg-white ">
        <Switch>
          <Route
            path="/qfeed/post"
            render={(props) => (
              <PostPage
                online={online}
                questions={questions}
                handleUpdatedQuestions={updateQuestions}
                {...props}
              />
            )}
          />

          <Route
            path="/qfeed/:id"
            render={(props) => (
              <DiscussionPage
                online={online}
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
                online={online}
                questions={removeDuplicate(questions)}
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
    </div>
  );
};

export default Qfeed;
