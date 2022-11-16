const UserQuestionSolutionPage = () => {
  return (
    <>
      {/* We need a nav here */}
      <Tab.Group>
        <Tab.List className="border-b">
          {["Questions", "Solutions"].map((tab, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                `text-xl m-3 font-bold outline-none ${
                  selected ? "border-b-4 border-b-brand " : "text-gray-500"
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
                    msg={`Loading ${currentUser.first_name}'s questions`}
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
  );
};

export default UserQuestionSolutionPage;
