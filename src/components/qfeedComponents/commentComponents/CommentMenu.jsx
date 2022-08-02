import closeImg from "../../../images/qfeed/close.svg";

const CommentMenu = ({
  questionOwner,
  currentUser,
  selectedComment,
  onToggleCommentMenu,
  onDeleteComment,
}) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 bg-transparent h-screen  w-full sm:hidden">
        <div
          className="fixed top-0 left-0 w-screen h-screen"
          onClick={onToggleCommentMenu}
        ></div>

        <div className="absolute bottom-0 ask-shadow bg-white rounded-t-4xl w-full">
          <div className="w-12 h-2 rounded-full mt-2 mb-4 mx-auto bg-background2"></div>
          {questionOwner?.username === currentUser.username ? (
            <button
              className="px-4 py-3 hover:bg-background rounded-lg w-full  text-left"
              style={{ borderBottom: "1px #ECECF0 solid" }}
            >
              Mark as a solution
            </button>
          ) : (
            ""
          )}
          <button className="px-4 py-3 hover:bg-background rounded-lg w-full  text-left">
            Follow
            <span className="text-brand">
              {" "}
              @{selectedComment?.user.username}
            </span>
          </button>
          <button
            className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left"
            onClick={() => onDeleteComment()}
          >
            Delete comment
          </button>
        </div>
      </div>

      {/* Same menu but for Desktop mode */}
      <div className="z-10  w-full lg:w-screen h-screen overlay fixed top-0 left-0 sm:flex justify-center items-start hidden ">
        <div className="relative ask-shadow border bg-white rounded-xl p-1 mx-auto mt-24">
          <button
            className="p-2 right-1 top-1 absolute rounded-lg hover:bg-danger-highlight hover:hot-shadow"
            onClick={onToggleCommentMenu}
          >
            <img src={closeImg} alt="close modal" />
          </button>

          <div className="h-12 question-component"></div>

          {questionOwner?.username === currentUser.username ? (
            <button
              className="px-4 py-3 hover:bg-background rounded-lg w-full mb-1 text-left"
              style={{ borderBottom: "1px #ECECF0 solid" }}
            >
              Mark as a solution
            </button>
          ) : (
            ""
          )}
          <button className="px-4 py-3 hover:bg-background rounded-lg w-full mb-1 text-left">
            Follow
            <span className="text-brand">
              {" "}
              @{selectedComment?.user.username}
            </span>
          </button>
          <button
            className="px-4 py-3 text-danger hover:bg-danger-highlight rounded-lg w-full text-left"
            onClick={() => onDeleteComment()}
          >
            Delete comment
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default CommentMenu;
