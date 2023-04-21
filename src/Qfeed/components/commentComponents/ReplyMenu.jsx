import trash from "../../assets/trash.svg";
import trashDefault from "../../assets/trash-default.svg";
import follow from "../../assets/follow.svg";
import unfollow from "../../assets/unfollow.svg";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { followUserThunk } from "../../../common/features/qfeed/qfeedSlice";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../../common/services/authService";

const ReplyMenu = ({ selectedComment, onToggleReplyMenu, onDeleteComment }) => {
  const currentUser = getCurrentUser();

  const [confirmDelete, setConfirmDelete] = useState(false);

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
      onToggleReplyMenu(false);
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
          className="absolute bottom-0 ask-shadow bg-white rounded-t-4xl w-full rounded-t-3xl "
        >
          <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto bg-background2"></div>

          {selectedComment?.by_user.username !== currentUser.username ? (
            <button
              className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
              onClick={() => {
                handleFollow(selectedComment?.by_user?.username);
                hideMenu();
              }}
            >
              {selectedComment?.by_user.is_following ? (
                <span className="flex items-center justify-center mr-1">
                  <img className="mr-2" src={unfollow} alt="unfollow" />
                  Unfollow
                </span>
              ) : (
                <span className="flex items-center justify-center mr-1">
                  <img className="mr-2" src={follow} alt="follow" /> Follow
                </span>
              )}{" "}
              @{selectedComment?.by_user.username}
            </button>
          ) : (
            ""
          )}

          {selectedComment?.by_user.username === currentUser.username ? (
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
                    onToggleReplyMenu();
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
        {selectedComment?.by_user.username !== currentUser.username ? (
          <button
            className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
            onClick={() => {
              handleFollow(selectedComment?.by_user.username);
              hideMenu();
            }}
          >
            {selectedComment?.by_user.is_following ? (
              <span className="flex items-center justify-center mr-1">
                <img className="mr-2" src={unfollow} alt="unfollow" /> Unfollow
              </span>
            ) : (
              <span className="flex items-center justify-center mr-1">
                <img className="mr-2" src={follow} alt="follow" /> Follow
              </span>
            )}{" "}
            @{selectedComment?.by_user.username}
          </button>
        ) : (
          ""
        )}

        {selectedComment?.by_user.username === currentUser.username ? (
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
                  onToggleReplyMenu();
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

export default ReplyMenu;
