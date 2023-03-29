import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../common/components/PrimaryButton";
import { getCurrentUser } from "../../../common/services/authService";
import RTF from "../RTE";

export default function AddReply({
  parentCommentAuthor,
  reply,
  postReply,
  onChange,
  close,
}) {
  const currentUser = getCurrentUser();
  const LIMIT = 450;

  const { thisQuestion } = useSelector((state) => state.qfeed);

  let inputClasses =
    "bg-transparent mt-1 px-2 py-2 mb-2 placeholder-secondary-text border-[#cfd9de] border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-sm ";

  inputClasses +=
    reply.length > LIMIT
      ? "focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger"
      : "";

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
                <RTF
                  value={reply}
                  onChange={onChange}
                  placeholder={"Leave a comment"}
                />
                {reply.length > 0 && (
                  <div className="m-0 pb-2 float-right">
                    <PrimaryButton
                      cta="Submit"
                      action={() => postReply(LIMIT)}
                      variant="small"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
