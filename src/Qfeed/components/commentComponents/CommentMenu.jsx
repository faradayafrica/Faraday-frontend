import trash from "../../assets/trash.svg";
import trashDefault from "../../assets/trash-default.svg";
import follow from "../../assets/follow.svg";
import unfollow from "../../assets/unfollow.svg";
import mark from "../../assets/mark.svg";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Modal from "../../../common/components/Modal";
import {
  followUserThunk,
  markSolutionThunk,
} from "../../../common/features/qfeed/qfeedSlice";
import { useDispatch } from "react-redux";

const CommentMenu = ({
  match,
  questionOwner,
  currentUser,
  selectedComment,
  onToggleCommentMenu,
  onDeleteComment,
  is_solution,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmSolution, setConfirmSolution] = useState(false);

  const comment_menu = useRef();
  const comment_menu_mobile = useRef();

  const dispatch = useDispatch();

  function handleFollow(username) {
    dispatch(followUserThunk({ username }));
  }

  const handleCommentMenu = () => {
    gsap.fromTo(
      comment_menu.current,
      { y: 0, opacity: 1 },
      { y: +50, opacity: 0, duration: 0.2, ease: "power2.inOut" }
    );
    gsap.fromTo(
      comment_menu_mobile.current,
      { y: 0, opacity: 1 },
      { y: +50, opacity: 0, duration: 0.2, ease: "power2.inOut" }
    );
    setTimeout(() => {
      onToggleCommentMenu(false);
    }, 200);
  };

  const hideMenu = () => {
    handleCommentMenu();
    setConfirmDelete(false);
  };

  useEffect(() => {
    setTimeout(() => {
      gsap.fromTo(
        comment_menu.current,
        { y: +50, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.inOut" }
      );
    }, 200);
  }, []);

  useEffect(() => {
    console.log("State changed");
  }, [confirmDelete, confirmSolution]);

  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 bg-transparent h-screen  w-full sm:hidden">
        <div
          className="fixed top-0 left-0 w-screen h-screen"
          onClick={hideMenu}
        ></div>

        <div
          ref={comment_menu_mobile}
          className="absolute bottom-0 ask-shadow bg-white rounded-t-4xl w-full"
        >
          <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto bg-background2"></div>
          {questionOwner?.username === currentUser.username ? (
            <button
              className="items-center px-4 py-3 text-brand-dark hover:bg-brand-highlight rounded-lg w-full  text-left flex "
              style={{ borderBottom: "1px #ECECF0 solid" }}
              onClick={() => {
                setConfirmSolution(true);
              }}
            >
              <img className="mr-2" src={mark} alt="mark solution" />
              {is_solution ? "Unmark" : "Mark"} as a solution
            </button>
          ) : (
            <></>
          )}

          {console.log(confirmSolution, "mark")}

          {selectedComment?.user.username !== currentUser.username ? (
            <button
              className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
              onClick={() => {
                handleFollow(selectedComment?.user?.username);
                hideMenu();
              }}
            >
              {selectedComment?.user.is_following ? (
                <span className="flex items-center justify-center">
                  <img className="mr-2" src={unfollow} alt="unfollow" />
                  Unfollow
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <img className="mr-2" src={follow} alt="follow" /> Follow
                </span>
              )}{" "}
              @{selectedComment?.user.username}
            </button>
          ) : (
            ""
          )}

          {selectedComment?.user.username === currentUser.username ? (
            <>
              {!confirmDelete ? (
                <button
                  className="px-4 py-3 hover:bg-danger-highlight rounded-lg w-full text-left flex items-center"
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                >
                  <img className="mr-2" src={trashDefault} alt="trash" /> Delete
                  comment
                </button>
              ) : (
                <button
                  className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left flex items-center"
                  onClick={() => {
                    onDeleteComment(selectedComment);
                    onToggleCommentMenu();
                  }}
                >
                  <img className="mr-2" src={trash} alt="trash" /> Confirm
                  delete
                </button>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <Modal
        icon={mark}
        title={`You sure?`}
        message={`You must be certain that this is a solution to the question asked
        as this might cause real consequences to other users if 
        the solution is wrong.`}
        visible={confirmSolution}
        action={() => {
          setConfirmSolution(false);
          dispatch(
            markSolutionThunk({
              postid: match.params.id,
              commentid: selectedComment.id,
            })
          );
          hideMenu();
        }}
        cancel={() => {
          setConfirmSolution(false);
        }}
      />

      {/* Same menu but for Desktop mode */}
      <div
        className="fixed top-0 right-0 h-screen w-full left-0 z-20 bg-[#00000022] hidden sm:block"
        onClick={() => {
          hideMenu();
        }}
      ></div>

      <div
        ref={comment_menu}
        className="absolute top-8 z-30 right-4 ask-shadow border bg-white rounded-xl p-1 mx-auto w-72 hidden sm:block opacity-0"
      >
        {questionOwner?.username === currentUser.username ? (
          <button
            className="items-center px-4 py-3 text-brand-dark hover:bg-brand-highlight rounded-lg w-full mb-1 text-left flex"
            style={{ borderBottom: "1px #ECECF0 solid" }}
            onClick={() => {
              setConfirmSolution(true);
            }}
          >
            <img className="mr-2" src={mark} alt="mark solution" />
            {is_solution ? "Unmark" : "Mark"} as a solution
          </button>
        ) : (
          <></>
        )}

        {selectedComment?.user.username !== currentUser.username ? (
          <button
            className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
            onClick={() => {
              handleFollow(selectedComment?.user?.username);
              hideMenu();
            }}
          >
            {selectedComment?.user.is_following ? (
              <span className="flex items-center justify-center">
                <img className="mr-2" src={unfollow} alt="unfollow" /> Unfollow
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <img className="mr-2" src={follow} alt="follow" /> Follow
              </span>
            )}{" "}
            @{selectedComment?.user.username}
          </button>
        ) : (
          ""
        )}

        {selectedComment?.user.username === currentUser.username ? (
          <>
            {!confirmDelete ? (
              <button
                className="px-4 py-3 hover:bg-danger-highlight rounded-lg w-full text-left flex  items-center"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                <img className="mr-2" src={trashDefault} alt="trash" /> Delete
                comment
              </button>
            ) : (
              <button
                className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left flex items-center"
                onClick={() => {
                  onDeleteComment(selectedComment);
                  onToggleCommentMenu();
                }}
              >
                <img className="mr-2" src={trash} alt="trash" /> Confirm delete
              </button>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CommentMenu;
