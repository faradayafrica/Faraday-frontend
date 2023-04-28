import { Tab } from "@headlessui/react";
import Question from "../../Qfeed/components/Question";
import Loader from "../../common/components/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import arrowRight from "../../Qfeed/assets/arrow-right.svg";
import { useEffect } from "react";
import QuestionsLoader from "../../Qfeed/components/QuestionsLoader";

const UserQuestionSolutionPage = ({
  user,
  questions,
  solutions,
  bookmarks,
  deleteQuestion,
  updateQuestions,
  isQuestionLoading,
  isSolutionLoading,
  isBookmarkLoading,
  hasQuestionNextPage,
  hasSolutionNextPage,
  hasBookmarkNextPage,
  isFetchingQuestionNextPage,
  isFetchingSolutionNextPage,
  isFetchingBookmarkNextPage,
}) => {
  const history = useHistory();

  return (
    <>
      {/* We need a nav here */}

      <div
        // style={{ maxHeight: "70vh" }}
        className="w-full profile-wrapper text-faraday-night"
      >
        <Tab.Group>
          <Tab.List className="border-b p-0 z-20 w-full sticky top-2 mt-4">
            <div className="sticky top-2 w-full">
              {["Questions", "Solutions", "Bookmarks"].map((tab, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `text-md py-3 px-4 font-bold outline-none border-b-2 ${
                      selected
                        ? " border-brand text-brand"
                        : " text-night-secondary border-transparent hover:border-night-secondary hover:bg-background"
                    }`
                  }
                >
                  {tab}
                </Tab>
              ))}
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div
              // className="profile-question-section h-[600px]"
              // style={{ overflowY: "auto" }}
              >
                {questions ? (
                  <>
                    <div className="space-y-1 sm:space-y-0 bg-background sticky top-2">
                      {questions.map((question) => (
                        <Question
                          question={question}
                          questions={questions}
                          handleUpdatedQuestions={updateQuestions}
                          onDeleteQuestion={deleteQuestion}
                          key={question.id}
                        />
                      ))}
                    </div>

                    {isQuestionLoading || isFetchingQuestionNextPage ? (
                      !questions?.length ? (
                        <QuestionsLoader />
                      ) : (
                        <QuestionsLoader short={true} />
                      )
                    ) : (
                      <>
                        {questions?.length > 0 && hasQuestionNextPage && (
                          <div className="bg-white py-2 mt-2">
                            <div className="p-3 m-3 rounded-lg border bg-background  text-center">
                              <p className="text-xs sm:text-sm m-0 ">
                                You're at the bottom of the feed
                              </p>
                            </div>
                            <div className="h-[65px] w-full sm:hidden"></div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="m-3">
                    <Loader
                      msg={`Loading ${user?.profile.first_name}'s questions`}
                    />
                  </div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {solutions ? (
                <>
                  <div className="space-y-1 sm:space-y-0 bg-background">
                    {solutions?.map((item) => (
                      <Question
                        question={item.question}
                        questions={item.questions}
                        handleUpdatedQuestions={updateQuestions}
                        onDeleteQuestion={deleteQuestion}
                        key={item.question.id}
                      />
                    ))}
                  </div>

                  {isSolutionLoading || isFetchingSolutionNextPage ? (
                    !solutions?.length ? (
                      <QuestionsLoader />
                    ) : (
                      <QuestionsLoader short={true} />
                    )
                  ) : (
                    <>
                      {solutions?.length > 0 && !hasSolutionNextPage && (
                        <div className="bg-white py-2 mt-2">
                          <div className="p-3 m-3 rounded-lg border bg-background  text-center">
                            <p className="text-xs sm:text-sm m-0 ">
                              You're at the bottom of the feed
                            </p>
                          </div>
                          <div className="h-[65px] w-full sm:hidden"></div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </Tab.Panel>
            <Tab.Panel>
              {bookmarks.length ? (
                <>
                  <div className="space-y-1 sm:space-y-0 bg-background">
                    {bookmarks?.map((bookmark) => (
                      <Question
                        question={bookmark}
                        questions={bookmarks}
                        handleUpdatedQuestions={updateQuestions}
                        onDeleteQuestion={deleteQuestion}
                        key={bookmark.id}
                      />
                    ))}
                  </div>

                  {isBookmarkLoading || isFetchingBookmarkNextPage ? (
                    !bookmarks?.length ? (
                      <QuestionsLoader />
                    ) : (
                      <QuestionsLoader short={true} />
                    )
                  ) : (
                    <>
                      {bookmarks?.length > 0 && !hasBookmarkNextPage && (
                        <div className="bg-white py-2 mt-2">
                          <div className="p-3 m-3 rounded-lg border bg-background  text-center">
                            <p className="text-xs sm:text-sm m-0 ">
                              You're at the bottom of the feed
                            </p>
                          </div>
                          <div className="h-[65px] w-full sm:hidden"></div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default UserQuestionSolutionPage;
