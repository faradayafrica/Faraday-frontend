/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import CopyLink from "./CopyLink";
import SecondaryButton from "../../common/components/SecondaryButton";
import Comments from "./commentComponents/Comments";

import http from "../../common/services/httpService";
import arrowRight from "../assets/arrow-right.svg";

import QuestionsLoader from "./QuestionsLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteQuestionThunk,
  markSolutionThunk,
  updateFeed,
  updateQuestion,
} from "../../common/features/qfeed/qfeedSlice";
import { useLayoutEffect } from "react";
import QService from "../../common/features/qfeed/QfeedServices";
import DiscussionQuestion from "./DiscusstionQuestion";

const DiscussionPage = ({ match, history }) => {
  const [loader, setLoader] = useState(true);

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
        // console.log(e);
      }
    }
  };

  const handleMarkSolution = (postid, commentid) => {
    dispatch(markSolutionThunk({ postid, commentid }));
  };

  const handleQuestionDelete = (ques_id) => {
    dispatch(deleteQuestionThunk({ ques_id }));
    setTimeout(() => {
      history.goBack();
    }, 500);
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

  // Initialize the state of the Discussion feed when navigating from the Qfeen home
  useLayoutEffect(() => {
    const thisQuestion = questions?.find((q) => q.id === match.params.id);
    const value = thisQuestion ? thisQuestion : {};
    dispatch(updateQuestion({ name: "question", value }));
    setShortLink(thisQuestion ? thisQuestion.short_link : "");
  }, []);

  return (
    <>
      <div className=" bg-background min-h-[100vh] z-30 bottom-0 left-0 h-min-screen sm:w-auto sm:static">
        <div className="min-h-[70px] sm:min-h-[0px] "> </div>
        <div className="z-50" id="discussion">
          <div className="flex items-center p-3">
            <img
              src={arrowRight}
              className="w-8 h-8 p-2 rounded-full mr-2 bg-white hover:bg-background2 cursor-pointer rotate-180 shadow-sm"
              alt="return"
              onClick={() => {
                // dispatch(updateQuestion({ name: "comments", value: [] }));
                history.goBack();
              }}
            />
            <h1 className="text-2xl text-center font-bold m-0 ">Discussion</h1>
          </div>
          {question?.user ? (
            <div className=" py-3 relative bg-white">
              <DiscussionQuestion
                question={question}
                handleQuestionDelete={handleQuestionDelete}
                handleCopyLinkModal={handleCopyLinkModal}
                getShortLink={getShortLink}
              />

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
                <QuestionsLoader type="discussion" />
              ) : (
                <div className="p-3  rounded-lg border bg-background m-3 text-center">
                  <>
                    <p className="text-xs sm:text-sm ">
                      Couldn't fetch this question at this time, try again later
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
