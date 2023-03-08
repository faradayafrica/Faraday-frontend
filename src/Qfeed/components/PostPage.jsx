import PostComponent from "./PostComponent";
import { SuccessToast, ErrorToast } from "../../common/components/CustomToast";
import { getCurrentUser } from "../../common/services/authService";
import { useSelector, useDispatch } from "react-redux";
import { createQuestionThunk } from "../../common/features/qfeed/qfeedSlice";

const PostPage = (props) => {
  // Redux here
  const dispatch = useDispatch();

  const LIMIT = { title: 150, content: 400 };

  const currentUser = getCurrentUser();

  const postQuestion = (title, content) => {
    if (
      title.length > LIMIT.title ||
      content.length > LIMIT.content ||
      title.length === 0
    ) {
      ErrorToast("Can't send until you resolve the concerns ");
    } else {
      dispatch(createQuestionThunk({ title, content }));
      props.history.replace("/");

      // if (status === QfeedStates.SUCCESSFUL) {
      //   console.log("Sent");
      //   SuccessToast("Question sent");
      // }
    }
  };

  if (!currentUser.username) {
    // window.location = "/logout";
    props.history.replace("/logout");
  }

  return (
    <div className=" w-full">
      <div className="min-h-[70px] sm:min-h-[0px]  "> </div>
      <div className="z-30">
        <PostComponent postQuestion={postQuestion} LIMIT={LIMIT} {...props} />
      </div>
    </div>
  );
};

export default PostPage;