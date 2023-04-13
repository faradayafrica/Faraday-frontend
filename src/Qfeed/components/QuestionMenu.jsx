import { useState, useEffect, useRef } from "react";
import { getCurrentUser } from "../../common/services/authService";
import gsap from "gsap";
import trash from "../assets/trash.svg";
import trashDefault from "../assets/trash-default.svg";
import follow from "../assets/follow.svg";
import unfollow from "../assets/unfollow.svg";

import { useDispatch } from "react-redux";
import {
  closeQuestionThunk,
  followUserThunk,
  markBookmarkThunk,
} from "../../common/features/qfeed/qfeedSlice";
// import { handleSaveQues } from "../utils";
import { useHistory } from "react-router-dom";
import { ReactComponent as OpenQuesIcon } from "../assets/lock-off.svg";
import { ReactComponent as CloseQuesIcon } from "../assets/lock-on.svg";

const QuestionMenu = ({
  question,
  questionMenu,
  toggleQuestionMenu,
  onDeleteQuestion,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const history = useHistory();

  const currentUser = getCurrentUser();

  const question_menu = useRef();
  const question_menu_mobile = useRef();

  // Redux here
  const dispatch = useDispatch();

  function handleFollow(username) {
    dispatch(followUserThunk({ username }));
  }

  function handleCloseQuestion(postid) {
    dispatch(closeQuestionThunk({ postid }));
  }

  function handleSaveQues(questionId) {
    dispatch(markBookmarkThunk({ questionId }));
    toggleQuestionMenu();
  }

  // Gsap animation
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

  const token = localStorage.getItem("token");

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
            className="absolute top-5 z-50 right-4 ask-shadow border bg-white rounded-xl p-1 mx-auto w-72 hidden sm:block opacity-0"
          >
            <button
              className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
              onClick={() => {
                token === null || token === undefined
                  ? history.push(
                      `/login?redirect=${window.origin}/qfeed/${question.id}`
                    )
                  : handleSaveQues(question.id);
              }}
            >
              <BookmarkIcon />
              {question.bookmarked ? "Unsave" : "Save"} question
            </button>

            {/* TODO: Handle the Bookmark action with redux(QfeedSlice) and sync all feed on the redux store */}
            {/* TODO: Add the bookmark for mobile view too, the code is below */}

            {question.user.username === currentUser.username ? (
              <>
                <button
                  className='px-4 py-3 hover:bg-background rounded-lg w-full text-left flex gap-2'
                  onClick={() => {
                    handleCloseQuestion(question?.id);
                    hideMenu();
                  }}
                >
                  {question.is_closed ? (
                    <>
                      <OpenQuesIcon /> Open
                    </>
                  ) : (
                    <>
                      <CloseQuesIcon />
                      Close
                    </>
                  )}{" "}
                  question
                </button>
                {/* TODO: Add the Close question for mobile view too, the code is below */}

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
                      onDeleteQuestion(question.id);
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
                    token === null || token === undefined
                      ? history.push(
                          `/login?redirect=${window.origin}/qfeed/${question.id}`
                        )
                      : handleFollow(question?.user?.username);
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
          <div className="fixed bottom-0 left-0 z-[100] h-screen  w-full sm:hidden">
            <div
              className="fixed top-0 right-0 h-screen w-full left-0 z-20 bg-[#00000022] sm:hidden"
              onClick={() => {
                hideMenu();
              }}
            ></div>

            <div
              ref={question_menu_mobile}
              className="z-[100] absolute bottom-0 ask-shadow bg-white rounded-t-3xl w-full "
            >
              <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto  bg-background2"></div>

              <button
                className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
                onClick={() => {
                  token === null || token === undefined
                    ? history.push(
                        `/login?redirect=${window.origin}/qfeed/${question.id}`
                      )
                    : handleSaveQues(question.id);
                }}
              >
                <BookmarkIcon />
                {question.bookmarked ? "Unsave" : "Save"} question
              </button>

              {question.user.username === currentUser.username ? (
                <>
                  <button
                    className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
                    onClick={() => {
                      handleCloseQuestion(question?.id);
                      hideMenu();
                    }}
                  >
                    {question.is_closed ? "Open" : "Close"} question
                  </button>
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
                        onDeleteQuestion(question.id);
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
                      token === null || token === undefined
                        ? history.push(
                            `/login?redirect=${window.origin}/qfeed/${question.id}`
                          )
                        : handleFollow(question?.user?.username);
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
      ) : null}
    </>
  );
};

export default QuestionMenu;

const BookmarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
};
