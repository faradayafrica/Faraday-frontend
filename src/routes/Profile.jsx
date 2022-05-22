import React, { useEffect, useState } from "react";
import Loader from "../components/styledComponents/Loader";
import ProfileData from "../components/profile/ProfileData";
import ProfileInfo from "../components/profile/ProfileInfo";
import SponsorAd from "../components/sponsors/SponsorAd";
import http from "../services/httpService";
import "../styles/profile.scss";

function Profile({ match }) {
  // const userEndpoint = process.env.REACT_APP_API_URL + `/users/${match.params.username}/`;
  // const userQuestionEndpoint = process.env.REACT_APP_API_URL + `/users/${match.params.username}/ques/`;
  // const userSolutionEndpoint =
  //   process.env.REACT_APP_API_URL + `/users/${match.params.username}/solutions/`;

  //from Mockoon
  const userEndpoint = "http://localhost:3002/v1/users/devgenix/";
  const userQuestionEndpoint =
    process.env.REACT_APP_API_URL + `/users/${match.params.username}/ques/`;
  const userSolutionEndpoint =
    process.env.REACT_APP_API_URL +
    `/users/${match.params.username}/solutions/`;

  //the profile renders as soon as the user info comes in and the page fetches the questions later
  const [user, setUser] = useState({});
  const [questions, setQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    async function getUser() {
      const result = await http.get(userEndpoint);
      setUser(result.data);
    }

    getUser();
  }, []);

  useEffect(() => {
    document.title = user.username ? `@${user.username} Profile` : "Faraday";
  }, [user]);

  useEffect(() => {
    async function getUserQuestions() {
      const questionResult = await http.get(userQuestionEndpoint);
      setQuestions(questionResult.data);
      console.log("QUEs", questions);
    }

    getUserQuestions();
  }, []);

  useEffect(() => {
    async function getUserSolutions() {
      const solutionResult = await http.get(userSolutionEndpoint);
      setSolutions(solutionResult.data);
      console.log("SOLn", solutions);
    }

    getUserSolutions();
  }, []);

  const refreshPage = async () => {
    try {
      const result = await http.get(userEndpoint);
      setUser(result.data);

      const questionResult = await http.get(userQuestionEndpoint);
      setQuestions(questionResult.data);
      // console.log('user-data', result);
    } catch (ex) {}
  };

  return !user.username ? (
    <Loader onRefresh={refreshPage} />
  ) : (
    <div className='profile__container'>
      <div>
        {/* <ProfileNav user={user} /> */}
        <h1 className=' section-header'>Profile</h1>
        <ProfileData
          user={user}
          userQuestions={questions}
          userSolution={solutions}
        />
        <ProfileInfo />
      </div>
      <div className='w-100 profile-trends'>
        <SponsorAd />
      </div>
    </div>
  );
}

export default Profile;
