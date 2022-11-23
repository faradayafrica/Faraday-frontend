import React, { useEffect, useState, useLayoutEffect } from "react";
import http from "../services/httpService";
import { getCurrentUser } from "../services/authService";
import { Switch, Route, Redirect } from "react-router-dom";
import "../styles/profile.scss";
import "../styles/profile/profile.css";
import {
  SuccessToast,
  ErrorToast,
  PromiseToast,
} from "../components/common/CustomToast";

import UserQuestionSolutionPage from "../components/profileComponents/UserQuestionSolutionPage";
import NotFound from "./NotFound";
import ProfileHome from "../components/profileComponents/ProfileHome";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProfileHomeLoader from "../components/profileComponents/ProfileHomeLoader";
function Profile({ match, history }) {
  const currentUser = getCurrentUser();

  const userEndpoint = `/users/${match.params.username}/`;
  const userQuestionEndpoint = `/users/${match.params.username}/ques/`;
  const userSolutionEndpoint = `/users/${match.params.username}/solutions/`;

  const [user, setUser] = useState();
  const [questions, setQuestions] = useState();
  const [solutions, setSolutions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pathname, setPathname] = useState(match.params.username);

  const fetchQuestions = async (pageParam) => {
    const resp = await http.get(
      process.env.REACT_APP_API_URL + userQuestionEndpoint
    );
    return resp;
  };

  const fetchSolutions = async (pageParam) => {
    const resp = await http.get(
      process.env.REACT_APP_API_URL + userSolutionEndpoint
    );
    return resp;
  };

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
    refetch,
  } = useInfiniteQuery(
    ["user-questions"],
    ({ pageParam = 1 }) => fetchQuestions(pageParam),
    {
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
    ({ pageParam = 1 }) => fetchSolutions(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  // React Query <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  //updates the data from the useInfiniteQuery into the questions state
  useEffect(() => {
    const newQuestions = [];

    isQuestionSuccess &&
      !isQuestionLoading &&
      questionData?.pages.map((page) =>
        page.data?.results.map((item) => {
          // console.log("Question first fetch");
          return newQuestions.push(item);
        })
      );
    setQuestions(newQuestions);
  }, [questionData]);

  //updates the data from the useInfiniteQuery into the solutions state
  useEffect(() => {
    const newSolutions = [];

    isSolutionSuccess &&
      !isSolutionLoading &&
      solutionData?.pages.map((page) =>
        page.data?.results.map((item) => {
          // console.log("Solution first fetch");
          return newSolutions.push(item);
        })
      );
    setSolutions(newSolutions);
  }, [solutionData, isSolutionSuccess]);

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
    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/users/${user?.profile.username}/follow/`;

    const clonedUser = { ...user };

    try {
      const promise = http.post(apiEndpoint).then((resp) => {
        clonedUser.profile.is_following = !clonedUser.profile.is_following;
        setUser({ ...clonedUser });
      });

      const msg = clonedUser.profile.is_following ? `Unfollowed` : "Followed";
      PromiseToast(
        `${msg} @${user.username}`,
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

    async function fetchdata() {
      try {
        const { data } = await http.get(userEndpoint);
        setUser(data);
      } catch (e) {
        console.log(e.message);
      }
    }

    const apiEndpoint =
      process.env.REACT_APP_API_URL +
      `/qfeed/que/delete/${selectedQuestion.id}/`;

    try {
      await http.delete(apiEndpoint);
      SuccessToast("Question deleted");
      setQuestions([...remainingQuestions]);
      fetchdata();
    } catch (e) {
      console.warn(e.message);
      ErrorToast("Couldn't delete question");
    }
  };

  useEffect(() => {
    setPathname(match.params.username);
  });

  useLayoutEffect(() => {
    // document.title = `${currentUser?.last_name} ${currentUser?.first_name} Profile`;
    setLoading(true);
    async function fetchdata() {
      try {
        const { data } = await http.get(userEndpoint);
        setUser(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setError("Couldn't fetch user at this time");
      }
    }

    async function fetchUserSolutions() {
      try {
        const { data } = await http.get(userSolutionEndpoint);
        setSolutions(data.results.map((item) => item.question));
        // console.log("SOLn", data);
      } catch (e) {
        console.log(e);
      }
    }

    fetchdata();
    // fetchUserSolutions();
  }, [pathname]);

  const updateQuestions = (updatedQuestions) => {
    setQuestions([...updatedQuestions]);
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
                deleteQuestion={deleteQuestion}
                updateQuestions={updateQuestions}
                fetchQuestionNextPage={fetchQuestionNextPage}
                hasQuestionNextPage={hasQuestionNextPage}
                fetchSolutionNextPage={fetchSolutionNextPage}
                hasSolutionNextPage={hasSolutionNextPage}
              />
            )}
          />

          <Route
            path="/"
            render={(props) => (
              // <>
              //   {console.log(user, "<<<<<<")}
              //   <div>HI</div>
              // </>
              <ProfileHome
                user={user}
                currentUser={currentUser}
                handleFollow={handleFollow}
                questions={questions}
                isQuestionLoading={isQuestionLoading}
                questionError={questionError}
                isSolutionLoading={isSolutionLoading}
                solutionError={solutionError}
                solutions={solutions}
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
