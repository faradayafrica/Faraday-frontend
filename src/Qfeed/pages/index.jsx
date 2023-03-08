/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import DiscussionPage from "../components/DiscussionPage.jsx";
import PostPage from "../components/PostPage";
import TimeLine from "../components/Timeline.jsx";
import NotFound from "../../common/components/NotFound.jsx";
import QService from "../../common/features/qfeed/QfeedServices.js";
import { useDispatch } from "react-redux";
import { updateFeed } from "../../common/features/qfeed/qfeedSlice.js";

const Qfeed = (props) => {
  const dispatch = useDispatch();
  const { online } = props;

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

  // Next page fetch from the useInfinite Query
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

  // Update state with the data data from React Query
  useEffect(() => {
    const newQuestions = [];

    isSuccess &&
      data?.pages.map((page) =>
        page.data?.results.map((item) => newQuestions.push(item))
      );
    dispatch(updateFeed({ name: "qfeed", value: newQuestions }));
  }, [data]);

  useLayoutEffect(() => {
    document.title = "Faraday";
  }, []);

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
