import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
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

const Qfeed = (props) => {
  const [questions, setQuestions] = useState([]);
  const { online } = props;

  const fetchQuestions = async (pageParam) => {
    const resp = await http.get(
      process.env.REACT_APP_API_URL + `/qfeed/que/fetch/?page=${pageParam}`
    );
    return resp;
  };

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(
    ["questions"],
    ({ pageParam = 1 }) => fetchQuestions(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) {
          await fetchNextPage();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

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

  // Checks Local Storage and populates the Qfeed
  useEffect(() => {
    let storedQuestions;

    storedQuestions = JSON.parse(localStorage.getItem("questions"));

    if (storedQuestions) {
      setQuestions([...storedQuestions.questions]);
    }
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;

    if (document.getElementById("timeline") !== null) {
      window.addEventListener(
        "scroll",
        (e) => {
          let st = e.target.documentElement.scrollTop;
          if (st > lastScrollTop) {
            document.getElementById("topnav").classList.add("hide-up"); // downscroll code
          } else {
            document.getElementById("topnav").classList.remove("hide-up"); // upscroll code
          }
          lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        },
        false
      );
    }
  });

  // Update state with the data data from React Query
  useEffect(() => {
    const newQuestions = [];

    isSuccess &&
      data?.pages.map((page) =>
        page.data.results.map((item) => newQuestions.push(item))
      );
    setQuestions(newQuestions);

    // Save state to Local Storage
    window.localStorage.setItem(
      "questions",
      JSON.stringify({
        questions: newQuestions,
      })
    );
  }, [data]);

  return (
    <div className="relative w-full route-wrapper ">
      {/* <QuestionsLoader type="qfeed" /> */}
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
                questions={questions}
                handleUpdatedQuestions={updateQuestions}
                onFollowUser={handleFollow}
                onDeleteQuestion={deleteQuestion}
                retry={refetch}
                loader={isLoading}
                isError={isError}
                error={error}
                data={data}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
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
