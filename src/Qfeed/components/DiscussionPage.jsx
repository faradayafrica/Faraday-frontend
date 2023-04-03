/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CopyLink from "./CopyLink";
import SecondaryButton from "../../common/components/SecondaryButton";
import Comments from "./commentComponents/Comments";
import { Link } from "react-router-dom";
import moment from "moment";

import love from "../assets/love.svg";
import redLove from "../assets/red-love.svg";
import share from "../assets/share.svg";
import link from "../assets/link.svg";
import http from "../../common/services/httpService";
import ellipses from "../assets/ellipses.svg";
import arrowRight from "../assets/arrow-right.svg";
import QuestionMenu from "./QuestionMenu";
import QuestionsLoader from "./QuestionsLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteQuestionThunk,
  markSolutionThunk,
  updateFeed,
  updateQuestion,
  voteQuestionThunk,
} from "../../common/features/qfeed/qfeedSlice";
import { useLayoutEffect } from "react";
import QService from "../../common/features/qfeed/QfeedServices";

const DiscussionPage = ({ match, history }) => {
  const [loader, setLoader] = useState(true);
  const [questionMenu, setQuestionMenu] = useState(false);

  const [isCopyLinkModal, setCopyLinkModal] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [shortLink, setShortLink] = useState();

  // Redux biz starts here
  const { qfeed: questions } = useSelector((state) => state.qfeed.feed);
  const { question, comments } = useSelector(
    (state) => state.qfeed.thisQuestion
  );
  const dispatch = useDispatch();
  // Redux biz ends here

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
            dispatch(updateFeed({ name: "qfeed", value: questionsClone }));
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

  const handleMarkSolution = (postid, commentid) => {
    dispatch(markSolutionThunk({ postid, commentid }));
  };

  const toggleQuestionMenu = () => {
    setQuestionMenu(!setQuestionMenu);
  };

  const handleQuestionDelete = (ques_id) => {
    dispatch(deleteQuestionThunk({ ques_id }));
    setTimeout(() => {
      history.goBack();
    }, 500);
  };

  const token = localStorage.getItem("token");

  const handleQuestionLike = async (postid) => {
    if (token === null || token === undefined) {
      return history.push(`/login?redirect=${window.origin}/qfeed/${postid}`);
    }
    if (question.liked) {
      dispatch(voteQuestionThunk({ postid, value: "downvote" }));
    } else {
      dispatch(voteQuestionThunk({ postid }));
    }
  };

  const retry = async () => {
    setLoader(true);
    try {
      const { data } = await QService.fetchQuestion(match.params.id);
      dispatch(updateQuestion({ name: "question", value: data }));
    } catch (err) {
      setLoader(false);
    }

    refetch();
  };

  const fetchThisQuestion = async () => {
    try {
      const { data } = await QService.fetchQuestion(match.params.id);
      dispatch(updateQuestion({ name: "question", value: data }));
    } catch (ex) {
      setLoader(false);
      if (ex.response.status == 404) {
        history.replace("/missing-question");
      } else {
        // console.log("Problem");
      }
      setLoader(false);
    }
  };

  useEffect(async () => {
    if (question.user) {
      // Skip
    } else {
      fetchThisQuestion();
    }
  }, []);

  const updateComments = (newComments) => {
    dispatch(updateQuestion({ name: "comments", value: newComments }));
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
    ({ pageParam = 1 }) =>
      QService.fetchQuestionComments(match.params.id, pageParam),
    {
      cacheTime: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  // Next page fetch from the useInfinite Query
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

  // Update comments on the store
  useEffect(() => {
    !comments.length &&
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const newComments = [];

    isSuccess &&
      data?.pages?.map((page) =>
        page?.data?.results.map((item) => newComments.push(item))
      );
    dispatch(updateQuestion({ name: "comments", value: newComments }));
  }, [data]);

  // Dynamic classes
  let loveClasses =
    "hover:bg-danger-highlight h-[40px] px-3 flex justify-around items-center rounded-lg";

  if (!question?.liked) {
    loveClasses += " bg-background ";
  } else {
    loveClasses += " bg-danger-highlight text-danger";
  }

  // Initialize the state of the Discussion feed when navigating from the Qfeen home
  useLayoutEffect(() => {
    const thisQuestion = questions?.find((q) => q.id === match.params.id);
    const value = thisQuestion ? thisQuestion : {};
    dispatch(updateQuestion({ name: "question", value }));
    setShortLink(thisQuestion ? thisQuestion.short_link : "");
  }, []);

  return (
    <>
      <div className=' bg-white z-30 bottom-0 left-0 h-min-screen w-screen sm:w-auto sm:static'>
        <div className='min-h-[70px] sm:min-h-[0px] '> </div>
        <div className='z-50' id='discussion'>
          <div className='flex items-center p-3'>
            <img
              src={arrowRight}
              className='w-8 h-8 p-2 rounded-full mr-2 bg-background hover:bg-background2 cursor-pointer rotate-180'
              alt='return'
              onClick={() => {
                // dispatch(updateQuestion({ name: "comments", value: [] }));
                history.goBack();
              }}
            />
            <h1 className='text-2xl sm:text-2xl font-bold m-0 '>Discussion</h1>
          </div>
          {question?.user ? (
            <div className=' py-3 relative'>
              <div className='pl-3 pr-2'>
                <Link
                  to={
                    token === null || token === undefined
                      ? `/login?redirect=${window.origin}/qfeed/${question.id}`
                      : `/me/${question?.user.username}`
                  }
                  style={{ textDecoration: "none" }}
                  className='w-14 mr-2 cursor-pointer float-left'
                >
                  <img
                    src={question?.user.profile_pic}
                    className='w-12 h-12 rounded-full mr-2 bg-background2'
                    style={{ objectFit: "cover" }}
                    alt=''
                  />
                </Link>
                <p className='m-0 text-night-secondary text-sm sm:text-base'>
                  <span className='font-semibold text-faraday-night mr-2'>
                    {question?.user.firstname} {question?.user.lastname}
                  </span>{" "}
                  <span className=''>@{question?.user.username}</span>
                </p>
                <p className='m-0 text-night-secondary text-sm sm:text-base'>
                  Published {moment(question?.created).fromNow()}
                </p>

                <div
                  className=' hover:bg-brand-highlight cursor-pointer absolute right-2 top-2 rounded-md'
                  onClick={() => {
                    setQuestionMenu(!questionMenu);
                  }}
                >
                  <img
                    src={ellipses}
                    className='w-6 h-6 rounded-full m-1 '
                    style={{ objectFit: "cover" }}
                    alt=''
                  />
                </div>

                <QuestionMenu
                  questionMenu={questionMenu}
                  question={question}
                  toggleQuestionMenu={toggleQuestionMenu}
                  onDeleteQuestion={handleQuestionDelete}
                />

                <h3 className=' mt-3 text-lg sm:text-xl font-semibold m-0 mb-2'>
                  {question?.title}
                </h3>

                {question && question?.content && (
                  <div className='text-sm sm:text-base m-0 mb-2'>
                    {question?.content?.split("\n").map((item, idx) => (
                      <p className='mb-1' key={idx}>
                        {item}
                      </p>
                    ))}
                  </div>
                )}

                {/* Engagement buttons  */}
                <div className='mt-3 py-2 border-background2 border-t-[1px] border-b-[1px]'>
                  <div className='flex justify-between pr-12 sm:w-96 items-center mr-4'>
                    <button
                      className={loveClasses}
                      onClick={() => handleQuestionLike(match.params.id)}
                    >
                      {question?.vote_status === "upvote" ? (
                        <img
                          className='h-[18px] w-[18px]'
                          src={redLove}
                          alt='take back reaction'
                        />
                      ) : (
                        <img
                          className='h-[18px] w-[18px]'
                          src={love}
                          alt='react to question'
                        />
                      )}
                      <span className='ml-1 font-medium text-base'>
                        {question?.vote_rank ? question?.vote_rank : ""}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        handleCopyLinkModal();
                        getShortLink(question.id);
                      }}
                      className='icon-brnd-hover hover:bg-brnd-highlight px-3 h-[40px] flex justify-around items-center rounded-lg bg-background '
                    >
                      <img
                        className='h-[18px] w-[18px] '
                        src={link}
                        alt='copy question link'
                      />
                    </button>

                    {/* The share buttons are currently disabled */}
                    <button
                      disabled
                      className='icon-brnd-hover hover:bg-brnd-highlight px-3 h-[40px] flex justify-around items-center rounded-lg bg-background'
                    >
                      <img
                        className='h-[18px] w-[18px] opacity-50'
                        src={share}
                        alt='share this question'
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
                comments={comments}
                questionid={match.params.id}
                commentLoader={isLoading}
                questionOwner={question?.user}
                onUpdateComments={updateComments}
                onMarkSolution={handleMarkSolution}
                match={match}
                error={error}
                isError={isError}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </div>
          ) : (
            <>
              {loader ? (
                <QuestionsLoader type='discussion' />
              ) : (
                <div className='p-3  rounded-lg border bg-background m-3 text-center'>
                  <>
                    <p className='text-xs sm:text-sm '>
                      Couldn't fetch this question at this time, try again later
                    </p>
                    <SecondaryButton cta='Retry' action={retry} />
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
