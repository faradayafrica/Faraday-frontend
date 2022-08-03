import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loader from "../components/styledComponents/Loader";
import SideNav from "../components/styledComponents/SideNav";
import http from "../services/httpService";
import { getCurrentUser } from "../services/authService";
import Question from "../components/qfeedComponents/Question";
import DiscussionPage from "../components/qfeedComponents/DiscussionPage";
import NotFound from "./NotFound";
import "../styles/profile.scss";
import dummyImg from "../images/profile1.png";

function Profile({ match }, props) {
  const currentUser = getCurrentUser();
  // console.log("currentUser", currentUser);

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

  useEffect(() => {
    document.title = `${currentUser?.last_name} ${currentUser?.first_name} Profile`;

    async function fetchdata() {
      try {
        const { data } = await http.get(userEndpoint);
        setUser(data);
        console.log("fetched user details", user);
      } catch (e) {
        console.log(e.message);
      }
    }

    async function fetchUserQuestions() {
      try {
        const { data } = await http.get(userQuestionEndpoint);
        console.log("QUEs", data.results);
        setQuestions(data.results);
      } catch (e) {
        console.log(e.message);
      }
    }

    async function fetchUserSolutions() {
      try {
        const solutionResult = await http.get(userSolutionEndpoint);
        // setSolutions(solutionResult.data);
        // console.log("SOLn", solutions);
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchUserSolutions();
    fetchdata();
    fetchUserQuestions();
  }, []);

  const updateQuestions = (updatedQuestions) => {
    setQuestions([...updatedQuestions]);
  };

  // const refreshPage = async () => {
  //   try {
  //     const result = await http.get(userEndpoint);
  //     setUser(result.data);

  //     const questionResult = await http.get(userQuestionEndpoint);
  //     setQuestions(questionResult.data);
  //   } catch (ex) {}
  // };

  return (
    <>
      <SideNav {...props} />
      <div className="w-full route-wrapper text-faraday-night">
        <div className="min-h-[70px] sm:min-h-[0px] "> </div>

        <h1 className="text-2xl sm:text-2xl m-3 font-bold">
          {currentUser.first_name + " " + currentUser.last_name}
        </h1>
        <div className="mx-3">
          <div className="w-48 h-24 rounded-xl bg-background2 flex mt-4">
            <img
              src={`https://api.faraday.africa${currentUser.profile_pic}`}
              alt="profile"
              className="h-24 w-24 rounded-xl "
            />
            <div className=" h-24 w-24 rounded-xl mt-[20px] pl-3">
              <>
                <p className="text-xs mb-0">Reputation</p>
                <p className="text-3xl  mt-0 font-bold">50</p>
              </>
            </div>
          </div>
          {user ? (
            <div className="mt-1">
              <p className="mb-2">@{currentUser.username}</p>
              <p className="">
                {`A ${user?.profile.level}L student of ${user?.profile.school} studying ${user?.profile.department}.`}
              </p>

              <div className="flex">
                <p className="mr-3">
                  <span className="font-bold">00</span> Question
                </p>
                <p>
                  <span className="font-bold">00</span> Solution
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-1">
              <p className="mb-2">@{currentUser.username}</p>

              <div className="flex">
                <p className="mr-3">
                  <span className="font-bold">00</span> Question
                </p>
                <p>
                  <span className="font-bold">00</span> Solution
                </p>
              </div>
            </div>
          )}
        </div>

        {/* We need a nav here */}
        <h3 className="text-xl m-3 font-bold">Questions</h3>
        <div className="border">
          {questions ? (
            <>
              {questions.map((question) => (
                <Question
                  question={question}
                  questions={questions}
                  handleUpdatedQuestions={updateQuestions}
                  key={question.id}
                />
              ))}
            </>
          ) : (
            <div className="m-3">
              <Loader
                msg={`loading ${
                  currentUser.first_name + " " + currentUser.last_name
                }'s questions`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
