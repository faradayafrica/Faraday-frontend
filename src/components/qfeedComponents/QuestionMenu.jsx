import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../../services/authService";
import gsap from "gsap";
import trash from "../../images/qfeed/trash.svg";
import trashDefault from "../../images/qfeed/trash-default.svg";
import follow from "../../images/qfeed/follow.svg";
import unfollow from "../../images/qfeed/unfollow.svg";

const QuestionMenu = ({
  question,
  questionMenu,
  toggleQuestionMenu,
  onFollowUser,
  onDeleteQuestion,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const currentUser = getCurrentUser();

  const question_menu = useRef();
  const question_menu_mobile = useRef();

  const handleQuestionMenu = () => {
    gsap.fromTo(
      question_menu.current,
      { y: 0, opacity: 1 },
      { y: +50, opacity: 0, duration: 0.2, ease: "power2.inOut" }
    );
    gsap.fromTo(
      question_menu_mobile.current,
      { y: 0, opacity: 1 },
      { y: +50, opacity: 0, duration: 0.2, ease: "power2.inOut" }
    );
    setTimeout(() => {
      toggleQuestionMenu(false);
    }, 200);
  };

  const hideMenu = () => {
    handleQuestionMenu();
    setConfirmDelete(false);
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.fromTo(
        question_menu.current,
        { y: +50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.inOut" }
      );
    }, 200);
  }, [questionMenu]);

  return (
    <>
      {questionMenu ? (
        <>
          <div
            className="fixed top-0 right-0 h-screen w-full left-0 z-20 bg-[#00000022] hidden sm:block"
            onClick={() => {
              hideMenu();
            }}
          ></div>

          <div
            ref={question_menu}
            className="absolute top-5 z-30 right-4 ask-shadow border bg-white rounded-xl p-1 mx-auto w-72 hidden sm:block opacity-0"
          >
            {question.user.username === currentUser.username ? (
              <>
                {!confirmDelete ? (
                  <button
                    className="px-4 py-3 hover:bg-danger-highlight rounded-lg w-full text-left flex"
                    onClick={() => {
                      setConfirmDelete(true);
                    }}
                  >
                    <img className="mr-2" src={trashDefault} alt="trash" />
                    Delete question
                  </button>
                ) : (
                  <button
                    className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left flex"
                    onClick={() => {
                      onDeleteQuestion(question);
                      hideMenu();
                    }}
                  >
                    <img className="mr-2" src={trash} alt="trash" />
                    Confirm delete
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
                  onClick={() => {
                    onFollowUser(question?.user);
                    hideMenu();
                  }}
                >
                  {question?.user.is_following ? (
                    <>
                      <img className="mr-2" src={unfollow} alt="unfollow" />{" "}
                      Unfollow
                    </>
                  ) : (
                    <>
                      <img className="mr-2" src={follow} alt="follow" /> Follow
                    </>
                  )}{" "}
                  @{question?.user.username}
                </button>
              </>
            )}
          </div>

          {/* Same menu but for Mobile mode */}
          <div className="fixed bottom-0 left-0 z-20 h-screen  w-full sm:hidden">
            <div
              className="fixed top-0 right-0 h-screen w-full left-0 z-20 bg-[#00000022] sm:hidden"
              onClick={() => {
                hideMenu();
              }}
            ></div>

            <div
              ref={question_menu_mobile}
              className="z-50 absolute bottom-0 ask-shadow bg-white rounded-t-3xl w-full "
            >
              <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto  bg-background2"></div>

              {question.user.username === currentUser.username ? (
                <>
                  {!confirmDelete ? (
                    <button
                      className="px-4 py-3 hover:bg-danger-highlight rounded-lg w-full text-left flex"
                      onClick={() => {
                        setConfirmDelete(true);
                      }}
                    >
                      <img className="mr-2" src={trashDefault} alt="trash" />
                      Delete question
                    </button>
                  ) : (
                    <button
                      className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left flex"
                      onClick={() => {
                        onDeleteQuestion(question);
                        hideMenu();
                      }}
                    >
                      <img className="mr-2" src={trash} alt="trash" />
                      Confirm delete
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
                    onClick={() => {
                      onFollowUser(question?.user);
                      hideMenu();
                    }}
                  >
                    {question?.user.is_following ? (
                      <>
                        <img className="mr-2" src={unfollow} alt="unfollow" />{" "}
                        Unfollow
                      </>
                    ) : (
                      <>
                        <img className="mr-2" src={follow} alt="follow" />{" "}
                        Follow
                      </>
                    )}{" "}
                    @{question?.user.username}
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default QuestionMenu;
