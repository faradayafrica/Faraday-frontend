import React, { useEffect, useState, useLayoutEffect } from "react";
import http from "../../common/services/httpService";
import { getCurrentUser } from "../../common/services/authService";
import { Switch, Route, Redirect } from "react-router-dom";
import "../styles/profile.scss";
import "../styles/profile.css";
import {
  SuccessToast,
  ErrorToast,
  PromiseToast,
} from "../../common/components/CustomToast";

import UserQuestionSolutionPage from "../components/UserQuestionSolutionPage";
import NotFound from "../../common/components/NotFound";
import ProfileHome from "../components/ProfileHome";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileHomeLoader from "../components/ProfileHomeLoader";
import UserService from "../../common/features/user/userServices";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestionThunk,
  followUserThunk,
  resetProfile,
  updateProfile,
} from "../../common/features/qfeed/qfeedSlice";

function Profile({ match, history }) {
  const currentUser = getCurrentUser();

  const userEndpoint = `/users/${match.params.username}/`;

  // const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pathname, setPathname] = useState(match.params.username);

  const dispatch = useDispatch();
  const {
    profileData: user,
    userQuestions: questions,
    userSolutions: solutions,
    userBookmarks: bookmarks,
  } = useSelector((state) => state.qfeed.feed.profile);

  // React Query >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const {
    data: questionData,
    isSuccess: isQuestionSuccess,
    hasNextPage: hasQuestionNextPage,
    fetchNextPage: fetchQuestionNextPage,
    isFetchingNextPage: isFetchingQuestionNextPage,
    isLoading: isQuestionLoading,
    // isError,
    error: questionError,
    refetch: refetchQuestion,
  } = useInfiniteQuery(
    ["user-questions"],
    ({ pageParam = 1 }) =>
      UserService.fetchUserQuestions(match.params.username, pageParam),
    {
      cacheTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  const {
    data: solutionData,
    isSuccess: isSolutionSuccess,
    hasNextPage: hasSolutionNextPage,
    fetchNextPage: fetchSolutionNextPage,
    isFetchingNextPage: isFetchingSolutionNextPage,
    isLoading: isSolutionLoading,
    // isError,
    error: solutionError,
    refetch: refetchSolution,
  } = useInfiniteQuery(
    ["user-solutions"],
    ({ pageParam = 1 }) =>
      UserService.fetchUserSolutions(match.params.username, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  const {
    data: bookmarkData,
    isSuccess: isBookmarkSuccess,
    hasNextPage: hasBookmarkNextPage,
    fetchNextPage: fetchBookmarkNextPage,
    isFetchingNextPage: isFetchingBookmarkNextPage,
    isLoading: isBookmarkLoading,
    // isError,
    error: bookmarkError,
    refetch: refetchBookmark,
  } = useInfiniteQuery({
    queryKey: ["bookmark"],
    queryFn: ({ pageParam = 1 }) => UserService.fetchUserBookmarks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages?.length + 1;
      return lastPage?.data?.next ? nextPage : undefined;
    },
    refetchOnWindowFocus: false,
  });

  // React Query <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  //updates the data from the useInfiniteQuery into the questions state
  useEffect(() => {
    const newQuestions = [];

    isQuestionSuccess &&
      !isQuestionLoading &&
      questionData?.pages.map((page) =>
        page?.data?.results.map((item) => {
          return newQuestions.push(item);
        })
      );
    dispatch(updateProfile({ name: "userQuestions", value: newQuestions }));
  }, [questionData, isQuestionSuccess]);

  //updates the data from the useInfiniteQuery into the solutions state
  useEffect(() => {
    const newSolutions = [];

    isSolutionSuccess &&
      !isSolutionLoading &&
      solutionData?.pages?.map((page) =>
        page?.data?.results?.map((item) => {
          return newSolutions.push(item);
        })
      );
    dispatch(updateProfile({ name: "userSolutions", value: newSolutions }));
  }, [solutionData, isSolutionSuccess]);

  //updates the data from the useInfiniteQuery into the bookmarks state
  useEffect(() => {
    const newBookmarks = [];

    isBookmarkSuccess &&
      !isBookmarkLoading &&
      bookmarkData?.pages?.map((page) =>
        page?.data?.results?.[0]?.ques.map((item) => {
          return newBookmarks.push(item);
        })
      );
    dispatch(updateProfile({ name: "userBookmarks", value: newBookmarks }));
  }, [bookmarkData, isBookmarkSuccess]);

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasQuestionNextPage) {
          await fetchQuestionNextPage();
        } else {
          fetching = false;
        }
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };

    //We have a bug at the moment, this block of code runs and fetches more
    // questions when a user reaches the end of the page, whether on the question tab
    //or solution tab. This can be revisited in the future when users have > 30
    //questions/ solutions
  }, [fetchQuestionNextPage, hasQuestionNextPage]);

  const handleFollow = (user) => {
    dispatch(followUserThunk({ username: user?.profile.username }));
  };

  const deleteQuestion = async (selectedQuestion) => {
    dispatch(deleteQuestionThunk({ ques_id: selectedQuestion.id }));
  };

  useEffect(() => {
    // Resets userData to an initial state
    // document.title = `${currentUser?.last_name} ${currentUser?.first_name} Profile`;
    dispatch(resetProfile());
    setPathname(match.params.username);
  }, [match.params.username]);

  useEffect(() => {
    setLoading(true);
    async function fetchdata() {
      try {
        // setQuestions([]);
        // setSolutions([]);
        const { data } = await http.get(userEndpoint);
        dispatch(updateProfile({ name: "profileData", value: data.data }));

        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError("Couldn't fetch user at this time");
      }
    }

    fetchdata();
    refetchQuestion();
    refetchSolution();
    refetchBookmark();
  }, [pathname]);

  const updateQuestions = (updatedQuestions) => {
    // setQuestions([...updatedQuestions]);
    dispatch(updateProfile({ name: "userQuestions", value: updatedQuestions }));
  };

  return (
    <div className="w-full route-wrapper profile-wrapper text-faraday-night">
      {loading ? (
        <ProfileHomeLoader />
      ) : error ? (
        error
      ) : (
        <Switch>
          <Route
            path="/me/:username/qfeed"
            render={(props) => (
              <UserQuestionSolutionPage
                user={user}
                questions={questions}
                solutions={solutions}
                bookmarks={bookmarks}
                deleteQuestion={deleteQuestion}
                updateQuestions={updateQuestions}
                fetchQuestionNextPage={fetchQuestionNextPage}
                hasQuestionNextPage={hasQuestionNextPage}
                fetchSolutionNextPage={fetchSolutionNextPage}
                hasSolutionNextPage={hasSolutionNextPage}
                fetchBookmarkNextPage={fetchBookmarkNextPage}
                hasBookmarkNextPage={hasBookmarkNextPage}
              />
            )}
          />

          <Route
            path="/"
            render={(props) => (
              <ProfileHome
                user={user}
                currentUser={currentUser}
                handleFollow={handleFollow}
                questions={questions}
                bookmarks={bookmarks}
                solutions={solutions}
                isQuestionLoading={isQuestionLoading}
                isBookmarkLoading={isBookmarkLoading}
                isSolutionLoading={isSolutionLoading}
                questionError={questionError}
                bookmarkError={bookmarkError}
                solutionError={solutionError}
                {...props}
              />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect push to="/not-found" />
        </Switch>
      )}
    </div>
  );
}

export default Profile;
