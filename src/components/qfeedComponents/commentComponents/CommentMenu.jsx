import trash from "../../../images/qfeed/trash.svg";
import trashDefault from "../../../images/qfeed/trash-default.svg";
import follow from "../../../images/qfeed/follow.svg";
import unfollow from "../../../images/qfeed/unfollow.svg";
import mark from "../../../images/qfeed/mark.svg";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const CommentMenu = ({
  match,
  questionOwner,
  currentUser,
  selectedComment,
  onToggleCommentMenu,
  onDeleteComment,
  onFollowUser,
  onMarkSolution,
  is_solution,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const comment_menu = useRef();
  const comment_menu_mobile = useRef();

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
                onMarkSolution(match.params.id, selectedComment.id);
                hideMenu();
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
                onFollowUser(selectedComment?.user);
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
              onMarkSolution(match.params.id, selectedComment.id);
              hideMenu();
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
              onFollowUser(selectedComment?.user);
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
