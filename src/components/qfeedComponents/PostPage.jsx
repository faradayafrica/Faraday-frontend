import PostComponent from "./PostComponent";
import http from "../../services/httpService";
import { SuccessToast, ErrorToast, PromiseToast } from "../common/CustomToast";
import { getCurrentUser } from "../../services/authService";

const PostPage = (props) => {
  const LIMIT = { title: 130, content: 256 };

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
            props.handleUpdatedQuestions([resp.data.data, ...props.questions]);
            console.log(resp.data.data, "resp");
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

          props.handleUpdatedQuestions([data, ...props.questions]);
          SuccessToast("Question will be sent when connection is restored");

          props.history.replace("/");
        }
      }
    }
  };

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
