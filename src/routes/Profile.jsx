import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/styledComponents/Loader";
import http from "../services/httpService";
import { getCurrentUser } from "../services/authService";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
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
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

function Profile({ match, history }) {
  const currentUser = getCurrentUser();

  const userEndpoint =
    process.env.REACT_APP_API_URL + `/users/${match.params.username}/`;
  const userQuestionEndpoint =
    process.env.REACT_APP_API_URL + `/users/${match.params.username}/ques/`;
  const userSolutionEndpoint =
    process.env.REACT_APP_API_URL +
    `/users/${match.params.username}/solutions/`;

  const [user, setUser] = useState();
  const [questions, setQuestions] = useState();
  const [solutions, setSolutions] = useState();
  const [loading, setLoading] = useState(true);
  const [pathname, setPathname] = useState(history.location.pathname);

  const fetchQuestions = async (pageParam) => {
    const resp = await axios.get(
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
    ["user-questions"],
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
    setPathname(history.location.pathname);
  });

  useEffect(() => {
    // document.title = `${currentUser?.last_name} ${currentUser?.first_name} Profile`;
    setLoading(true);
    async function fetchdata() {
      try {
        const { data } = await http.get(userEndpoint);
        setUser(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
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
    fetchUserSolutions();
  }, [pathname]);

  //updates the data from the useInfiniteQuery into the question state
  useEffect(() => {
    const newQuestions = [];

    isSuccess &&
      data?.pages.map((page) =>
        page.data?.results.map((item) => newQuestions.push(item))
      );
    setQuestions(newQuestions);
  }, [data]);

  const updateQuestions = (updatedQuestions) => {
    setQuestions([...updatedQuestions]);
  };

  return (
    <>
      {!loading ? (
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
                fetchQuestionNextPage={fetchNextPage}
                hasQuestionNextPage={hasNextPage}
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
                solutions={solutions}
                {...props}
              />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect push to="/not-found" />
        </Switch>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default Profile;
