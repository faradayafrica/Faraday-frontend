import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import DiscussionPage from "../components/DiscussionPage.jsx";
import PostPage from "../components/PostPage";
import TimeLine from "../components/Timeline.jsx";
import NotFound from "../../common/components/NotFound.jsx";
import http from "../../common/services/httpService";
import QService from "../../common/features/qfeed/QfeedServices.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestionThunk,
  followUserThunk,
  updateFeed,
} from "../../common/features/qfeed/qfeedSlice.js";

const Qfeed = (props) => {
  const { online } = props;

  // Redux biz starts here
  const { qfeed: questions } = useSelector((state) => state.qfeed.feed);
  const dispatch = useDispatch();
  // Redux biz ends here

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
  } = useInfiniteQuery({
    queryKey: ["questions"],
    queryFn: ({ pageParam = 1 }) => QService.fetchQuestions(pageParam),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages?.length + 1;
      return lastPage?.data?.next ? nextPage : undefined;
    },
  });

  //next page fetch from the useInfinite Query
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

  // Checks Local Storage and populates the Qfeed
  useEffect(() => {
    let storedQuestions;

    storedQuestions = JSON.parse(localStorage.getItem("questions"));

    if (storedQuestions) {
      dispatch(
        updateFeed({ name: "qfeed", value: storedQuestions?.questions })
      );
    }
  }, []);

  // Update state with the data data from React Query
  useEffect(() => {
    document.title = `Faraday`;
    const newQuestions = [];

    isSuccess &&
      data?.pages.map((page) =>
        page.data?.results.map((item) => newQuestions.push(item))
      );
    // setQuestions(newQuestions);
    dispatch(updateFeed({ name: "qfeed", value: newQuestions }));

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
            render={(props) => <PostPage online={online} {...props} />}
          />

          <Route
            path="/qfeed/:id"
            render={(props) => <DiscussionPage online={online} {...props} />}
          />

          <Route
            path="/"
            render={(props) => (
              <TimeLine
                online={online}
                refetch={refetch}
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
