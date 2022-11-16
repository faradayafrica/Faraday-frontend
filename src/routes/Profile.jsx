import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/styledComponents/Loader";
import http from "../services/httpService";
import { getCurrentUser } from "../services/authService";
import Question from "../components/qfeedComponents/Question";
import "../styles/profile.scss";
import "../styles/profile/profile.css";
import PrimaryButton from "../components/styledComponents/PrimaryButton";
import SecondaryButton from "../components/styledComponents/SecondaryButton";
import {
  SuccessToast,
  ErrorToast,
  PromiseToast,
} from "../components/common/CustomToast";
import { Tab } from "@headlessui/react";

import arrow from "../images/qfeed/arrow-right.svg";
import ProfileQuestion from "../components/profileComponents/ProfileQuestion";

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
  const [unfollowMsg, setUnfollowMsg] = useState("Following");
  const [questions, setQuestions] = useState();
  const [solutions, setSolutions] = useState();

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
      console.warn("Buttocks", e.message);
      ErrorToast("Couldn't delete question");
    }
  };

  useEffect(() => {
    document.title = `${currentUser?.last_name} ${currentUser?.first_name} Profile`;

    async function fetchdata() {
      try {
        const { data } = await http.get(userEndpoint);
        setUser(data);
      } catch (e) {
        console.log(e.message);
      }
    }

    async function fetchUserQuestions() {
      try {
        const { data } = await http.get(userQuestionEndpoint);
        setQuestions(data.results);
      } catch (e) {
        console.log(e.message);
      }
    }

    async function fetchUserSolutions() {
      try {
        const { data } = await http.get(userSolutionEndpoint);
        setSolutions(data.results.map((item) => item.question));
        // console.log("SOLn", data);
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

  return (
    <>
      <div className="w-full route-wrapper profile-wrapper text-faraday-night">
        <div className="min-h-[70px] sm:min-h-[20px] bg-brand-highight"> </div>
        {user ? (
          <>
            <div className=" text-sm sm:text-base">
              <div className=" bg-brand-highlight flex items-center justify-center ">
                <img
                  src={user?.profile.profile_pic}
                  alt="profile"
                  style={{ objectFit: "cover", border: "3px solid #fff " }}
                  className="h-24 w-24 rounded-full relative top-8"
                />
              </div>

              <div className="px-3 mt-4 ">
                <div className="flex justify-between items-end ">
                  <div className="mt-2">
                    <div className="font-bold text-sm sm:text-base">
                      {user?.profile.firstname + " " + user?.profile.lastname}
                    </div>
                    <div className="text-xm text-night-secondary">
                      @{user?.profile.username}
                    </div>
                  </div>

                  {currentUser.username !== match.params.username ? (
                    <div onClick={() => handleFollow(user)}>
                      {console.log(user.profile.is_following)}

                      {user.profile.is_following == true ? (
                        <span
                          onMouseEnter={() => setUnfollowMsg("Unfollow")}
                          onMouseLeave={() => setUnfollowMsg("Following")}
                        >
                          <SecondaryButton>{unfollowMsg}</SecondaryButton>
                        </span>
                      ) : (
                        <PrimaryButton cta="Follow" />
                      )}
                    </div>
                  ) : (
                    " "
                  )}
                </div>

                <p className="mt-2">
                  {user.profile.bio
                    ? user.profile.bio
                    : `A ${user?.profile.level}L student of ${user?.profile.school} studying ${user?.profile.department}.`}
                </p>

                <div className="text-xs text-night-secondary">
                  <p className="m-0">{user?.profile.school}</p>
                  <p className="m-0">{user?.profile.department}</p>
                  {user?.profile.level && (
                    <p className="m-0">{user?.profile.level} Level</p>
                  )}
                </div>
              </div>
            </div>

            <div className="question-section p-3 border-t mt-3">
              <div className="flex py-2  justify-between items-center">
                <p className="text-night-secondary m-0">
                  <span className="font-bold text-faraday-night">
                    {user.profile.questions}{" "}
                  </span>
                  {user.profile.questions > 1 ? "Questions" : "Question"}
                </p>

                <button className="flex items-center justify-center text-sm hover:text-brand">
                  <span style={{ whiteSpace: "nowrap" }}>Show more</span>{" "}
                  <img src={arrow} alt="" className="h-4 w-4" />
                </button>
              </div>

              <div className="profile-question-section flex items-start">
                {questions?.map((question) => (
                  <ProfileQuestion key={question.id} question={question} />
                ))}
              </div>
            </div>

            {user.profile.solutions > 0 && (
              <div className="question-section p-3">
                <div className="flex py-2  justify-between items-center">
                  <p className="text-night-secondary m-0">
                    <span className="font-bold text-faraday-night">
                      {user.profile.solutions}{" "}
                    </span>
                    {user.profile.solutions > 1 ? "Solutions" : "Solution"}
                  </p>

                  <button className="flex items-center justify-center text-sm hover:text-brand">
                    <span style={{ whiteSpace: "nowrap" }}>Show more</span>{" "}
                    <img src={arrow} alt="" className="h-4 w-4" />
                  </button>
                </div>

                <div className="profile-question-section flex items-start">
                  {solutions?.map((question) => (
                    <ProfileQuestion
                      key={question.id}
                      type="soln"
                      question={question}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="m-3">
            <Loader msg={`Just a moment`} />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
