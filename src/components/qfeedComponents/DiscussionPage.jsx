import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CopyLink from "./CopyLink";
import SecondaryButton from "../styledComponents/SecondaryButton";
import Comments from "./commentComponents/Comments";
import { Link } from "react-router-dom";

import love from "../../images/qfeed/love.svg";
import redLove from "../../images/qfeed/red-love.svg";
import share from "../../images/qfeed/share.svg";
import link from "../../images/qfeed/link.svg";
import http from "../../services/httpService";
import ellipses from "../../images/qfeed/ellipses.svg";
import arrowRight from "../../images/qfeed/arrow-right.svg";
import QuestionMenu from "./QuestionMenu";
import { SuccessToast, ErrorToast, PromiseToast } from "../common/CustomToast";
import QuestionsLoader from "./QuestionsLoader";

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

  const [question, setQuestion] = useState(thisQuestion ? thisQuestion : {});
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(true);
  const [questionMenu, setQuestionMenu] = useState(false);

  const [isCopyLinkModal, setCopyLinkModal] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [shortLink, setShortLink] = useState(
    thisQuestion ? thisQuestion.short_link : ""
  );

  // Copy Link associated variables and function are recreated for the timeline on the Question tab
  //We could use contextAPI to help them share same state and functions in the future

  const handleIsCopied = (value) => {
    setCopied(value);
  };

  const handleCopyLinkModal = () => {
    setCopyLinkModal(!isCopyLinkModal);
    setCopied(false);
    console.log("here");
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
            http.post(process.env.REACT_APP_API_URL + "/qfeed/que/shorten/", {
              postid: id,
              link: resp.data.short_url,
            });
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleFollow = (user) => {
    const apiEndpoint =
      process.env.REACT_APP_API_URL + `/users/${user.username}/follow/`;

    const clonedComments = [...comments];
    const userComments = clonedComments.filter(
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

  const handleMarkSolution = (postid, commentid) => {
    const commentsClone = [...comments];
    var index = commentsClone.findIndex((comment) => comment.id === commentid);

    try {
      const apiEndpoint =
        process.env.REACT_APP_API_URL + "/qfeed/que/marksolution/";

      const promise = http
        .post(apiEndpoint, {
          postid: postid,
          commentid: commentid,
        })
        .then((resp) => {
          for (let i = 0; i < commentsClone.length; i++) {
            if (i === index) {
              commentsClone[i].is_solution = resp.data.is_solution;
            } else {
              commentsClone[i].is_solution = false;
            }
          }
          setComments(commentsClone);

          // console.log(resp.data);
          const quesClone = [...questions];
          var QueIndex = questions.findIndex(
            (ques) => ques.id === match.params.id
          );
          const thisQue = questions.find((que) => que.id === match.params.id);

          if (resp.data.is_solution === true) {
            thisQue.solution = resp.data;
            quesClone[QueIndex] = thisQue;
          } else {
            thisQue.solution = null;
            quesClone[QueIndex] = thisQue;
          }

          handleUpdatedQuestions(quesClone);
        });

      PromiseToast("Solution updated", "Couldn't update solution", promise);
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
        likeData = data.data;
      } else {
        const { data } = await http.post(apiEndpoint, {
          postid,
          value: "upvote",
        });
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
      setLoader(false);
    }

    refetch();
  };

  const updateComments = (newComments) => {
    setComments(newComments);
  };

  const fetchThisQuestion = async () => {
    try {
      const { data } = await http.get(apiEndpoint);
      setQuestion(data.data);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(async () => {
    await fetchThisQuestion();
  }, []);

  const fetchComments = async (pageParam) => {
    const resp = await http.get(
      process.env.REACT_APP_API_URL +
        `/qfeed/que/comments/${match.params.id}/?page=${pageParam}`
    );
    return resp;
  };

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(
    ["comments"],
    ({ pageParam = 1 }) => fetchComments(pageParam),
    {
      cacheTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) {
          await fetchNextPage();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    !comments.length &&
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const newComments = [];

    isSuccess &&
      data?.pages.map((page) =>
        page.data.results.map((item) => newComments.push(item))
      );
    setComments(newComments);
  }, [data]);

  let loveClasses =
    "hover:bg-danger-highlight h-[40px] px-3 flex justify-around items-center rounded-lg";

  if (!question?.liked) {
    loveClasses += " bg-background ";
  } else {
    loveClasses += " bg-danger-highlight text-danger";
  }

  return (
    <>
      <div className=" bg-white z-30 bottom-0 left-0 h-min-screen w-screen sm:w-auto sm:static">
        <div className="min-h-[70px] sm:min-h-[0px] "> </div>
        <div className="z-50" id="discussion">
          <div className="flex items-center p-3">
            <img
              src={arrowRight}
              className="w-8 h-8 p-2 rounded-full mr-2 bg-background hover:bg-background2 cursor-pointer rotate-180"
              alt="return"
              onClick={() => {
                history.goBack();
              }}
            />
            <h1 className="text-2xl sm:text-2xl font-bold m-0 ">Discussion</h1>
          </div>
          {question?.user ? (
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

                <div className="text-sm sm:text-base m-0 mb-2 ">
                  {question?.content.split("\n").map((item, idx) => (
                    <p className="mb-1" key={idx}>
                      {item}
                    </p>
                  ))}
                </div>

                {/* Engagement buttons  */}
                <div className="mt-3 py-2 border-background2 border-t-[1px] border-b-[1px]">
                  <div className="flex justify-between pr-12 sm:w-96 items-center mr-4">
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
                      className="icon-brnd-hover hover:bg-brnd-highlight px-3 h-[40px] flex justify-around items-center rounded-lg bg-background "
                    >
                      <img
                        className="h-[18px] w-[18px] "
                        src={link}
                        alt="copy question link"
                      />
                    </button>

                    {/* The share buttons are currently disabled */}
                    <button
                      disabled
                      className="icon-brnd-hover hover:bg-brnd-highlight px-3 h-[40px] flex justify-around items-center rounded-lg bg-background"
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

              <CopyLink
                isCopyLinkModal={isCopyLinkModal}
                isCopied={isCopied}
                shortLink={shortLink}
                toggleCopyLinkModal={setCopyLinkModal}
                handleIsCopied={handleIsCopied}
              />

              {/* Comments here */}
              <Comments
                online={online}
                thisQuestion={question}
                questionid={match.params.id}
                comments={comments}
                commentLoader={isLoading}
                questionOwner={question?.user}
                onUpdateComments={updateComments}
                onMarkSolution={handleMarkSolution}
                fetchThisQuestion={fetchThisQuestion}
                match={match}
                questions={questions}
                handleUpdatedQuestions={handleUpdatedQuestions}
                //from useInfinteQuery
                error={error}
                isError={isError}
                data={data}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          ) : (
            <>
              {loader ? (
                <QuestionsLoader type="discussion" />
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
    </>
  );
};

export default DiscussionPage;
