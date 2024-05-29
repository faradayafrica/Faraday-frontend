import { useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileQuestion from "./ProfileQuestion";
import PrimaryButton from "../../common/components/PrimaryButton";
import SecondaryButton from "../../common/components/SecondaryButton";
import arrow from "../../Qfeed/assets/arrow-right.svg";
import Loader from "../../common/components/Loader";
import QuestionsLoader from "../../Qfeed/components/QuestionsLoader";
import verify from "../../Qfeed/assets/verify.svg";
import UserQuestionSolutionPage from "./UserQuestionSolutionPage";
import CompletionBanner from "../../Authentication/pages/SignUp/CompletionBanner";

const ProfileHome = ({
  user,
  handleFollow,
  currentUser,
  questions,
  isQuestionLoading,
  questionError,
  isSolutionLoading,
  solutionError,
  solutions,
  match,
  bookmarks,
  isBookmarkLoading,
  bookmarkError,
}) => {
  const [unfollowMsg, setUnfollowMsg] = useState("Following");

  const history = useHistory();

  console.log(user, "user");
  return (
    <div className="bg-white py-4">
      <div className="min-h-[70px] sm:min-h-[20px] bg-brand-highlight"> </div>
      {user ? (
        <>
          <div className=" text-sm sm:text-base">
            <div className=" bg-brand-highlight flex items-center justify-center ">
              <img
                src={user?.profile?.profile_pic}
                alt="profile"
                style={{
                  objectFit: "cover",
                  border: "3px solid #fff ",
                }}
                className="h-24 w-24 rounded-full relative top-8"
              />
            </div>

            <div className="px-3 mt-4 ">
              <div className="flex justify-between items-end ">
                <div className="mt-2">
                  <div className="font-bold text-sm sm:text-base flex items-center">
                    {user?.profile?.firstname + " " + user?.profile?.lastname}{" "}
                    {user?.profile?.account_verified && (
                      <img src={verify} className="h-5 w-5 ml-[2px]" alt="" />
                    )}
                  </div>
                  <div className="text-xm text-night-secondary">
                    @{user?.profile?.username}
                  </div>
                </div>

                {/* here */}
                {currentUser.username !== user?.profile?.username ? (
                  <div onClick={() => handleFollow(user)}>
                    {user?.profile?.is_following == true ? (
                      <span
                        onMouseEnter={() => setUnfollowMsg("Unfollow")}
                        onMouseLeave={() => setUnfollowMsg("Following")}
                      >
                        <SecondaryButton>{unfollowMsg}</SecondaryButton>
                      </span>
                    ) : (
                      <PrimaryButton cta="Follow" />
                    )}
                  </div>
                ) : (
                  " "
                )}
                {/* here */}
              </div>

              <p className="mt-2">
                {user?.profile?.bio
                  ? user?.profile?.bio
                  : user?.profile?.level
                  ? `A ${user?.profile?.level}L student of ${user?.profile?.school} studying ${user?.profile?.department}.`
                  : ""}
              </p>
              <div className="text-xs text-night-secondary">
                <p className="m-0">{user?.profile?.school}</p>
                <p className="m-0">{user?.profile?.department}</p>
                {user?.profile?.level && (
                  <p className="m-0">{user?.profile?.level} Level</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="m-3">
          <Loader msg={`Just a moment`} />
        </div>
      )}
    </div>
  );
};

export default ProfileHome;
