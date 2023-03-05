import { Tab } from "@headlessui/react";
import Question from "../../Qfeed/components/Question";
import Loader from "../../common/components/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import arrowRight from "../../Qfeed/assets/arrow-right.svg";
import { useEffect } from "react";

const UserQuestionSolutionPage = ({
  user,
  questions,
  solutions,
  bookmarks,
  deleteQuestion,
  updateQuestions,
  fetchQuestionNextPage,
  hasQuestionNextPage,
  fetchBookmarkNextPage,
  hasBookmarkNextPage,
}) => {
  const history = useHistory();

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      console.log(e);
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasQuestionNextPage) {
          await fetchQuestionNextPage();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchQuestionNextPage, hasQuestionNextPage]);

  return (
    <>
      {/* We need a nav here */}
      <div className="w-full profile-wrapper text-faraday-night bg-white relative">
        <Tab.Group>
          <Tab.List className="border-b bg-white fixed sm:static z-20 w-full">
            <div className="">
              <div className="min-h-[70px] sm:min-h-[20px] w-full"> </div>
              <div className="flex items-center p-3 sticky top-10">
                <img
                  src={arrowRight}
                  className="w-8 h-8 p-2 rounded-full mr-2 bg-background hover:bg-background2 cursor-pointer rotate-180"
                  alt="return"
                  onClick={() => {
                    history.goBack();
                  }}
                />
                <h1 className="text-2xl sm:text-2xl font-bold m-0 ">
                  {user?.profile.firstname}'s question feed
                </h1>
              </div>
            </div>
            {["Questions", "Solutions", "Bookmarks"].map((tab, index) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `text-md py-2 px-4 ml-3 my-2 font-bold outline-none rounded-xl  ${
                    selected
                      ? "  bg-brand text-white"
                      : "border-x-[1px] border-y-[1px] text-night-secondary border-night-secondary hover:bg-background"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-48 sm:mt-2 pt-2">
            <Tab.Panel>
              <div
              // className="profile-question-section h-[600px]"
              // style={{ overflowY: "auto" }}
              >
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
                      msg={`Loading ${user?.profile.first_name}'s questions`}
                    />
                  </div>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              {solutions ? (
                <>
                  {solutions.map((item) => (
                    <Question
                      question={item.question}
                      questions={item.questions}
                      handleUpdatedQuestions={updateQuestions}
                      onDeleteQuestion={deleteQuestion}
                      key={item.question.id}
                    />
                  ))}
                </>
              ) : (
                ""
              )}
            </Tab.Panel>
            <Tab.Panel>
              {bookmarks.length ? (
                <>
                  {bookmarks?.map((bookmark) => (
                    <Question
                      question={bookmark}
                      questions={bookmarks}
                      handleUpdatedQuestions={updateQuestions}
                      onDeleteQuestion={deleteQuestion}
                      key={bookmark.id}
                    />
                  ))}
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
