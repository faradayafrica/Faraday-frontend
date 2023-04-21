import PostComponent from "./PostComponent";
import { ErrorToast } from "../../common/components/CustomToast";
import { getCurrentUser } from "../../common/services/authService";
import { useDispatch } from "react-redux";
import { createQuestionThunk } from "../../common/features/qfeed/qfeedSlice";

const PostPage = (props) => {
  // Redux here
  const dispatch = useDispatch();

  const LIMIT = { title: 150, content: 1050 };

  const currentUser = getCurrentUser();

  function arrayToString(arr) {
    return arr.join(", ");
  }

  const postQuestion = (title, content, tags) => {
    if (
      title.length > LIMIT.title ||
      content.length > LIMIT.content ||
      title.length === 0
    ) {
      ErrorToast("Can't send until you resolve the concerns ");
    } else {
      // format tags
      const tagsAsString = arrayToString(tags);
      dispatch(createQuestionThunk({ title, content, tags: tagsAsString }));
      props.history.replace("/");

      // if (status === QfeedStates.SUCCESSFUL) {
      //   SuccessToast("Question sent");
      // }
    }
  };

  if (!currentUser.username) {
    // window.location = "/logout";
    props.history.replace("/logout");
  }

  return (
    <div className=" w-full bg-background">
      <div className="min-h-[70px] sm:min-h-[0px]  "> </div>
      <div className="z-30">
        <PostComponent postQuestion={postQuestion} LIMIT={LIMIT} {...props} />
      </div>
    </div>
  );
};

export default PostPage;
