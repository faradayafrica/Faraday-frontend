import PostComponent from "./PostComponent";
import http from "../../common/services/httpService";
import {
  SuccessToast,
  ErrorToast,
  PromiseToast,
} from "../../common/components/CustomToast";
import { getCurrentUser } from "../../common/services/authService";
import { useSelector, useDispatch } from "react-redux";
import { updateFeed } from "../../common/features/qfeed/qfeedSlice";

const PostPage = (props) => {
  // Redux here
  const { questions } = useSelector((state) => state.qfeed.feed);
  const dispatch = useDispatch();

  const LIMIT = { title: 150, content: 400 };

  const currentUser = getCurrentUser();

  const makeQuestion = (title, content) => {
    return {
      bookmarked: false,
      comments: 0,
      content: content,
      created: "Just now",
      id: `f48d94f4-1091-402c-${title}-pending`,
      is_closed: false,
      liked: null,
      likes: 0,
      title: title,
      user: {
        firstname: currentUser.first_name,
        followers: [2],
        followers_count: 1,
        following: 1,
        gender: "pending",
        id: currentUser.user_id,
        is_following: false,
        lastname: currentUser.last_name,
        profile_pic: currentUser.profile_pic,
        username: currentUser.username,
      },
    };
  };

  const postQuestion = (title, content) => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + "/qfeed/que/create_que/";

    if (
      title.length > LIMIT.title ||
      content.length > LIMIT.content ||
      title.length === 0
    ) {
      ErrorToast("Can't send until you resolve the concerns ");
    } else {
      try {
        props.history.goBack();
        const promise = http
          .post(apiEndpoint, { title, content })
          .then((resp) => {
            dispatch(
              updateFeed({
                name: "qfeed",
                value: [resp.data.data, ...questions],
              })
            );
          });

        PromiseToast("Question sent", "Question not sent", promise);
      } catch (e) {
        console.warn(e.message);
        if (!props.online) {
          var storedQuestions = JSON.parse(
            localStorage.getItem("pendingQuestions")
          );

          window.localStorage.setItem(
            "pendingQuestions",
            JSON.stringify([storedQuestions, { title, content }])
          );

          const data = makeQuestion(title, content);

          dispatch(
            updateFeed({
              name: "qfeed",
              value: [data, ...questions],
            })
          );
          SuccessToast("Question will be sent when connection is restored");

          props.history.replace("/");
        }
      }
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
