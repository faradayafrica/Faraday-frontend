import React, { useEffect, useState } from "react";
import Loader from "../components/styledComponents/Loader";
import http from "../services/httpService";
import { getCurrentUser } from "../services/authService";
import Question from "../components/qfeedComponents/Question";
import "../styles/profile.scss";
import PrimaryButton from "../components/styledComponents/PrimaryButton";
import { SuccessToast, ErrorToast } from "../components/common/CustomToast";
// import SecondaryButton from "../components/styledComponents/SecondaryButton";
import { Tab } from "@headlessui/react";

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
        setSolutions(data.results);
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
      <div className="w-full route-wrapper text-faraday-night">
        <div className="min-h-[70px] sm:min-h-[20px] "> </div>
        {user ? (
          <>
            <div className="mx-3 mt-2 text-sm sm:text-base">
              <div className=" flex items-start">
                <img
                  src={user?.profile.profile_pic}
                  alt="profile"
                  className="h-16 w-16 rounded-full "
                />

                <div className="ml-3">
                  <div className="mt-2">
                    <span className=" m-0 mt-2 font-bold text-sm sm:text-base">
                      {user?.profile.firstname + " " + user?.profile.lastname}
                    </span>
                    <span className="ml-2 text-sm">
                      @{user?.profile.username}
                    </span>
                  </div>

                  <div className="flex ">
                    <p className="mr-3">
                      <span className="font-bold">
                        {user?.profile.questions}
                      </span>{" "}
                      Questions
                    </p>
                    <p>
                      <span className="font-bold">
                        {user?.profile.solutions}
                      </span>{" "}
                      Solutions
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 mb-1">
                {currentUser.username !== match.params.username ? (
                  <PrimaryButton wide cta="follow" />
                ) : (
                  ""
                )}
              </div>
              {user?.profile.level ? (
                <p className="">
                  {`A ${user?.profile.level}L student of ${user?.profile.school} studying ${user?.profile.department}.`}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* We need a nav here */}
            <Tab.Group>
              <Tab.List className="border-b">
                {["Questions", "Solutions"].map((tab, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      `text-xl m-3 font-bold outline-none ${
                        selected
                          ? "border-b-4 border-b-brand "
                          : "text-gray-500"
                      }`
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div>
                    {questions ? (
                      <>
                        {questions.map((question) => (
                          <Question
                            question={question}
                            questions={questions}
                            handleUpdatedQuestions={updateQuestions}
                            onDeleteQuestion={deleteQuestion}
                            key={question.id}
                          />
                        ))}
                      </>
                    ) : (
                      <div className="m-3">
                        <Loader
                          msg={`loading ${currentUser.first_name}'s questions`}
                        />
                      </div>
                    )}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  {solutions ? (
                    <>
                      {solutions.map((question) => (
                        <Question
                          question={question}
                          questions={questions}
                          handleUpdatedQuestions={updateQuestions}
                          onDeleteQuestion={deleteQuestion}
                          key={question.id}
                        />
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </>
        ) : (
          <div className="m-3">
            <Loader msg={`just a moment`} />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
