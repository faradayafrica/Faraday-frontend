import { useState, useEffect } from "react";
import SecondaryButton from "../styledComponents/SecondaryButton";
import Comments from "./commentComponents/Comments";
import Loader from "../styledComponents/Loader";
import { Link } from "react-router-dom";
import QuestionMenu from "./QuestionMenu";
import { SuccessToast, ErrorToast, PromiseToast } from "../common/CustomToast";
import CopyLink from "./CopyLink";

// icon import
import love from "../../images/qfeed/love.svg";
import redLove from "../../images/qfeed/red-love.svg";
import share from "../../images/qfeed/share.svg";
import link from "../../images/qfeed/link.svg";
import http from "../../services/httpService";
import ellipses from "../../images/qfeed/ellipses.svg";

const DiscussionPage = ({
  match,
  history,
  online,
  questions,
  handleUpdatedQuestions,
  onDeleteQuestion,
}) => {
  const thisQuestion = questions.filter((q) => q.id === match.params.id)[0];
  const apiEndpoint =
    process.env.REACT_APP_API_URL + `/qfeed/que/fetch/${match.params.id}/`;
  const commentsApiEndpoint =
    process.env.REACT_APP_API_URL + `/qfeed/que/comments/${match.params.id}/`;

  const [question, setQuestion] = useState(thisQuestion ? thisQuestion : {});
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(true);
  const [commentLoader, setCommentLoader] = useState(true);
  const [questionMenu, setQuestionMenu] = useState(false);

  const [isCopyLinkModal, setCopyLinkModal] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [shortLink, setShortLink] = useState(
    thisQuestion ? thisQuestion.short_link : ""
  );

  // Copy Link associated variables and function are recreated for the timeline on the Question tap
  //We could use contextAPI to help them share same state and functions in the future

  const handleIsCopied = (value) => {
    setCopied(value);
  };

  const handleCopyLinkModal = () => {
    setCopyLinkModal(!isCopyLinkModal);
    setCopied(false);
  };
  const getShortLink = (id) => {
    const original_url = process.env.REACT_APP_URL + `qfeed/${id}`;
    const questionsClone = [...questions];
    const question_index = questions.findIndex(
      (question) => question.id === id
    );

    if (shortLink === "" || shortLink === null) {
      try {
        http
          .post("https://frda.me/api/shorten/", {
            original_url,
          })
          .then((resp) => {
            setShortLink(resp.data.short_url);
            questionsClone[question_index].short_link = resp.data.short_url;
            handleUpdatedQuestions([...questionsClone]);
            // sync with B.E
            http.post(process.env.REACT_APP_API_URL + "qfeed/que/shorten/", {
              postid: id,
              link: resp.data.short_url,
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  // console.log("Question?!!!!!!!!!!!!!!!!!!!!!!!!!!!", questions);

  const handleFollow = (user) => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/users/${user.username}/follow/`;

    const clonedQuestions = [...comments];
    const userComments = clonedQuestions.filter(
      (comment) => comment.user.id === user.id
    );

    try {
      const promise = http.post(apiEndpoint).then((resp) => {
        fetchThisQuestion();
        userComments.map(
          (question) =>
            (question.user.is_following = !question.user.is_following)
        );
      });
      const msg = user.is_following ? `Unfollowed` : "Followed";

      PromiseToast(
        `${msg} ${user.username}`,
        "An error occurred, Try again",
        promise
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleMarkSolution = async (postid, commentid) => {
    const commentsClone = [...comments];
    var index = commentsClone.findIndex((comment) => comment.id === commentid);
    console.log(index);

    try {
      const apiEndpoint =
        process.env.REACT_APP_API_URL + "/qfeed/que/marksolution/";

      const { data } = await http.post(apiEndpoint, {
        postid: postid,
        commentid: commentid,
      });

      data.is_solution
        ? SuccessToast("Comment marked as solution")
        : SuccessToast("Comment unmarked as solution");

      for (let i = 0; i < commentsClone.length; i++) {
        if (i === index) {
          commentsClone[i].is_solution = data.is_solution;
        } else {
          commentsClone[i].is_solution = false;
        }
      }
      setComments(commentsClone);
    } catch (e) {
      console.log(e);
      ErrorToast("Something went wrong, Try again later");
    }
  };

  const toggleQuestionMenu = () => {
    setQuestionMenu(!setQuestionMenu);
  };

  const handleQuestionDelete = (question) => {
    onDeleteQuestion(question);
    history.goBack();
  };

  const handleQuestionLike = async (postid) => {
    const oldLikes = question.likes;
    const oldLiked = question.liked;
    const updatedQuestion = { ...question };

    const clonedQuestions = [...questions];
    var index = clonedQuestions.findIndex((q) => q.id === question.id);

    if (!question.liked) {
      updatedQuestion.likes = oldLikes + 1;
      updatedQuestion.liked = !oldLiked;
      setQuestion({ ...updatedQuestion });
    } else {
      updatedQuestion.likes = oldLikes - 1;
      updatedQuestion.liked = !oldLiked;
      setQuestion({ ...updatedQuestion });
    }

    try {
      const apiEndpoint =
        process.env.REACT_APP_API_URL + "/qfeed/que/vote_que/";

      let likeData;

      if (oldLiked) {
        const { data } = await http.post(apiEndpoint, {
          postid,
          value: "downvote",
        });
        // SuccessToast("Question unliked");
        likeData = data.data;
      } else {
        const { data } = await http.post(apiEndpoint, {
          postid,
          value: "upvote",
        });
        // SuccessToast("Question liked");
        likeData = data.data;
      }

      if (index >= 0) {
        clonedQuestions[index] = { ...likeData };
      }
      handleUpdatedQuestions(clonedQuestions);
    } catch (err) {
      updatedQuestion.liked = oldLiked;
      updatedQuestion.likes = oldLikes;
      setQuestion({ ...updatedQuestion });
      console.warn("error", err.message);
    }
  };

  const retry = async () => {
    setLoader(true);
    try {
      const { data } = await http.get(apiEndpoint);
      setQuestion(data);
    } catch (err) {
      console.warn(err.message);
      setLoader(false);
    }
    try {
      const { data } = await http.get(commentsApiEndpoint);
      setComments(data.results);
    } catch (err) {
      console.warn(err.message);
      setCommentLoader(false);
    }
  };

  const updateComments = (newComments) => {
    setComments(newComments);
  };

  const fetchThisQuestion = async () => {
    try {
      const { data } = await http.get(apiEndpoint);

      setQuestion(data.data);
    } catch (err) {
      console.warn(err.message);
      setLoader(false);
    }
  };

  let nextCommentPageUrl = "";
  const commentRequestQueue = [];

  const fetchComments = async (url) => {
    commentRequestQueue.push(url);
    try {
      const { data } = await http.get(url);
      setComments((prevComment) => [...prevComment, ...data.results]);
      setCommentLoader(false);
      nextCommentPageUrl = data.next;
    } catch (err) {
      console.warn(err.message);
      setCommentLoader(false);
    }
  };

  const handleScroll = (e) => {
    if (nextCommentPageUrl && document.getElementById("discussion") !== null) {
      if (
        e.target.documentElement.scrollTop + window.innerHeight + 1000 >=
        e.target.documentElement.scrollHeight
      ) {
        if (!commentRequestQueue.includes(nextCommentPageUrl)) {
          fetchComments(nextCommentPageUrl);
          setCommentLoader(true);
        } else {
          console.warn("Duplicate C request blocked");
        }
      }
    }
  };

  useEffect(() => {
    if (thisQuestion) {
      if (question.comments > 0) {
        fetchComments(commentsApiEndpoint);
      } else {
        setComments([]);
        setCommentLoader(false);
      }
    } else {
      fetchComments(commentsApiEndpoint);
    }
    fetchThisQuestion();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    window.addEventListener("scroll", handleScroll);
  }, []);

  let lastScrollTop = 0;

  useEffect(() => {
    if (
      document.getElementById("topnav") !== null &&
      document.getElementById("bottomnav") !== null
    ) {
      document.getElementById("topnav").classList.remove("hide-up");
      document.getElementById("bottomnav").classList.remove("hide-down");
    }

    window.addEventListener(
      "scroll",
      (e) => {
        let st = e.target.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // downscroll code
          document.getElementById("topnav").classList.add("hide-up");
        } else {
          // upscroll code
          document.getElementById("topnav").classList.remove("hide-up");
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      },
      false
    );
  });

  let loveClasses =
    "hover:bg-danger-highlight h-[40px] px-3 flex justify-around items-center rounded-lg mr-4";

  if (!question?.liked) {
    loveClasses += " bg-background ";
  } else {
    loveClasses += " bg-danger-highlight text-danger";
  }

  return (
    <>
      <div className=" bg-white z-30 bottom-0 left-0 h-screen w-screen sm:w-auto sm:static">
        <div className="min-h-[70px] sm:min-h-[0px] "> </div>
        <div className="z-50" id="discussion">
          <h1 className="text-2xl sm:text-2xl m-3 font-bold ">Discussion</h1>
          {question.user ? (
            <div className=" py-3 relative">
              <div className="pl-3 pr-2">
                <Link
                  to={`/me/${question?.user.username}`}
                  style={{ textDecoration: "none" }}
                  className="w-14 mr-2 cursor-pointer float-left"
                >
                  <img
                    src={question?.user.profile_pic}
                    className="w-12 h-12 rounded-full mr-2 bg-background2"
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </Link>
                <p className="m-0 text-night-secondary text-sm sm:text-base">
                  <span className="font-semibold text-faraday-night mr-2">
                    {question?.user.firstname} {question?.user.lastname}
                  </span>{" "}
                  <span className="">@{question?.user.username}</span>
                </p>
                <p className="m-0 text-night-secondary text-sm sm:text-base">
                  Published {question?.created}
                </p>

                <div
                  className=" hover:bg-brand-highlight cursor-pointer absolute right-2 top-2 rounded-md"
                  onClick={() => {
                    setQuestionMenu(!questionMenu);
                  }}
                >
                  <img
                    src={ellipses}
                    className="w-6 h-6 rounded-full m-1 "
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </div>

                <QuestionMenu
                  questionMenu={questionMenu}
                  question={question}
                  toggleQuestionMenu={toggleQuestionMenu}
                  onFollowUser={handleFollow}
                  onDeleteQuestion={handleQuestionDelete}
                />

                <h3 className=" mt-3 text-lg sm:text-xl font-semibold m-0 mb-2">
                  {question?.title}
                </h3>

                <p className="text-sm sm:text-base m-0 mb-2 ">
                  {question?.content}
                </p>

                {/* Engagement buttons  */}
                <div className="mt-3 py-2 border-background2 border-t-[1px] border-b-[1px]">
                  <div className="flex justify-between pr-12 sm:w-96 items-center ">
                    <button
                      className={loveClasses}
                      onClick={() => handleQuestionLike(match.params.id)}
                    >
                      {question?.liked ? (
                        <img
                          className="h-[18px] w-[18px]"
                          src={redLove}
                          alt="take back reaction"
                        />
                      ) : (
                        <img
                          className="h-[18px] w-[18px]"
                          src={love}
                          alt="react to question"
                        />
                      )}
                      <span className="ml-1 font-medium text-base">
                        {question?.likes ? question?.likes : ""}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        handleCopyLinkModal();
                        getShortLink(question.id);
                      }}
                      className="icon-brand-hover hover:bg-brand-highlight px-3 h-[40px] flex justify-around items-center rounded-lg bg-background"
                    >
                      <img
                        className="h-[18px] w-[18px]"
                        src={link}
                        alt="copy question link"
                      />
                    </button>

                    {/* The share button is currently disabled */}
                    <button
                      disabled
                      className="icon-brnd-hover hover:bg-brnd-highlight px-3 h-[40px] flex justify-around items-center rounded-lg bg-background mr-4"
                    >
                      <img
                        className="h-[18px] w-[18px] opacity-50"
                        src={share}
                        alt="share this question"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments here */}
              <Comments
                online={online}
                thisQuestion={question}
                questionid={match.params.id}
                comments={comments}
                commentLoader={commentLoader}
                questionOwner={question?.user}
                onUpdateComments={updateComments}
                onMarkSolution={handleMarkSolution}
                fetchThisQuestion={fetchThisQuestion}
                match={match}
                questions={questions}
                handleUpdatedQuestions={handleUpdatedQuestions}
              />
            </div>
          ) : (
            <>
              {loader ? (
                <div className="m-3">
                  <Loader msg="This might take a while..." />
                </div>
              ) : (
                <div className="p-3 border-brand-highlight rounded-lg border bg-background m-3 text-center">
                  <>
                    <p className="text-xs sm:text-base ">
                      Question currently unavailable
                    </p>
                    <SecondaryButton cta="Retry" action={retry} />
                  </>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CopyLink
        isCopyLinkModal={isCopyLinkModal}
        isCopied={isCopied}
        shortLink={shortLink}
        toggleCopyLinkModal={setCopyLinkModal}
        handleIsCopied={handleIsCopied}
      />
    </>
  );
};

export default DiscussionPage;
