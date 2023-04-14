import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { getCurrentUser } from "../../../common/services/authService";
import RTE from "../RTE";

export default function AddReply({
  parentCommentAuthor,
  reply,
  postReply,
  onChange,
  close,
}) {
  const currentUser = getCurrentUser();

  const { thisQuestion } = useSelector((state) => state.qfeed);
  const LIMIT = 450;

  if (!currentUser.username) {
    return (
      <div className=" py-2 border-b">
        <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
          <p className="text-xs sm:text-base m-0 ">
            Please log in to join the discussion
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed top-0 right-0 h-screen w-full left-0 z-20 bg-[#00000022] RTE-overlay"
        onClick={() => {
          close();
        }}
      ></div>
      <div className="reply-box">
        {/* <button onClick={close}>close</button> */}
        <div className="text-brand mb-2 text-xs RTE-overlay">
          To @{parentCommentAuthor}
        </div>
        <div className="content-wrapper ">
          <Link
            to={`/me/${currentUser.username}`}
            style={{ textDecoration: "none" }}
            className="profile-img"
          >
            <img
              src={currentUser?.profile_pic}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </Link>

          <div className="offset flex justify-start align-bottom flex-col">
            <div className="content">
              {" "}
              <div className="RTE-wrapper">
                <RTE
                  value={reply}
                  onChange={onChange}
                  placeholder={"Leave a comment"}
                  submit={() => postReply(LIMIT)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
