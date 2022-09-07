import trash from "../../../images/qfeed/trash.svg";
import trashDefault from "../../../images/qfeed/trash-default.svg";
import follow from "../../../images/qfeed/follow.svg";
import unfollow from "../../../images/qfeed/unfollow.svg";
import mark from "../../../images/qfeed/mark.svg";
import { useState } from "react";
import http from "../../../services/httpService";

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

  const hideMenu = () => {
    onToggleCommentMenu();
    setConfirmDelete(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 bg-transparent h-screen  w-full sm:hidden">
        <div
          className="fixed top-0 left-0 w-screen h-screen"
          onClick={hideMenu}
        ></div>

        <div className="absolute bottom-0 ask-shadow bg-white rounded-t-4xl w-full">
          <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto bg-background2"></div>
          {questionOwner?.username === currentUser.username ? (
            <button
              className="px-4 py-3 text-brand-dark hover:bg-brand-highlight rounded-lg w-full  text-left flex"
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
            <>
              {selectedComment?.user.username !== currentUser.username ? (
                <button
                  className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
                  onClick={() => {
                    onFollowUser(selectedComment?.user);
                    hideMenu();
                  }}
                >
                  {selectedComment?.user.is_following ? (
                    <>
                      <img className="mr-2" src={unfollow} alt="unfollow" />{" "}
                      Unfollow
                    </>
                  ) : (
                    <>
                      <img className="mr-2" src={follow} alt="follow" /> Follow
                    </>
                  )}{" "}
                  @{selectedComment?.user.username}
                </button>
              ) : (
                ""
              )}
            </>
          )}

          {selectedComment?.user.username === currentUser.username ? (
            <>
              {!confirmDelete ? (
                <button
                  className="px-4 py-3 hover:bg-danger-highlight rounded-lg w-full text-left flex"
                  onClick={() => {
                    setConfirmDelete(true);
                  }}
                >
                  <img className="mr-2" src={trashDefault} alt="trash" /> Delete
                  comment
                </button>
              ) : (
                <button
                  className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left flex"
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

      <div className="absolute top-8 z-30 right-4 ask-shadow border bg-white rounded-xl p-1 mx-auto w-72 hidden sm:block">
        {questionOwner?.username === currentUser.username ? (
          <button
            className="px-4 py-3 text-brand-dark hover:bg-brand-highlight rounded-lg w-full mb-1 text-left flex"
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
          <>
            {selectedComment?.user.username !== currentUser.username ? (
              <button
                className="px-4 py-3 hover:bg-background rounded-lg w-full text-left flex"
                onClick={() => {
                  onFollowUser(selectedComment?.user);
                  hideMenu();
                }}
              >
                {selectedComment?.user.is_following ? (
                  <>
                    <img className="mr-2" src={unfollow} alt="unfollow" />{" "}
                    Unfollow
                  </>
                ) : (
                  <>
                    <img className="mr-2" src={follow} alt="follow" /> Follow
                  </>
                )}{" "}
                @{selectedComment?.user.username}
              </button>
            ) : (
              ""
            )}
          </>
        )}

        {selectedComment?.user.username === currentUser.username ? (
          <>
            {!confirmDelete ? (
              <button
                className="px-4 py-3 hover:bg-danger-highlight rounded-lg w-full text-left flex"
                onClick={() => {
                  setConfirmDelete(true);
                }}
              >
                <img className="mr-2" src={trashDefault} alt="trash" /> Delete
                comment
              </button>
            ) : (
              <button
                className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left flex"
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
