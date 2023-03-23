import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import QuestionMenu from "./QuestionMenu";
import CopyLink from "./CopyLink";
import moment from "moment";
// import ReactMarkdown from "react-markdown";
import http from "../../common/services/httpService";

//icon import
import ellipses from "../assets/ellipses.svg";
import arrow from "../assets/arrow-right.svg";
import love from "../assets/love.svg";
import redLove from "../assets/red-love.svg";
import smiley from "../assets/smiley.svg";
import link from "../assets/link.svg";
import mark from "../assets/mark.svg";
import verify from "../assets/verify.svg";
import info from "../assets/info.svg";
import Modal from "../../common/components/Modal";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteQuestionThunk,
  updateFeed,
  voteQuestionThunk,
} from "../../common/features/qfeed/qfeedSlice";

const Question = (props) => {
  const { question } = props;
  const [questionMenu, setQuestionMenu] = useState(false);
  const [isCopyLinkModal, setCopyLinkModal] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [shortLink, setShortLink] = useState(props.question.short_link);
  const [disclaimer, setDisclaimer] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();
  const { qfeed: questions } = useSelector((state) => state.qfeed.feed);

  let smileyClasses =
    "ml-2 hover:bg-brand-highlight px-2  h-8 flex justify-around items-center rounded-lg";

  let loveClasses =
    "hover:bg-danger-highlight h-8 px-2 flex justify-around items-center rounded-lg mr-2";

  const toggleQuestionMenu = () => {
    setQuestionMenu(!questionMenu);
  };

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
        console.log(e);
      }
    }
  };

  const token = localStorage.getItem("token");

  // This could go 2 levels up the family tree (@Qfeed) so that there's no need to recreate the function @DiscussionPage
  const handleLike = async (postid) => {
    if (token === null || token === undefined) {
      return history.push(
        `/login?redirect=${window.origin}/qfeed/${postid}`
      );
    }

    if (question.liked) {
      dispatch(voteQuestionThunk({ postid, value: "downvote" }));
    } else {
      dispatch(voteQuestionThunk({ postid }));
    }
  };

  function handleQuestionDelete(ques_id) {
    dispatch(deleteQuestionThunk({ ques_id }));
  }

  return (
    <div className=' question-component pl-3 pr-2 pt-3 sm:pt-4 bg-white hover:bg-[#fafafacc] flex justify-start items-start relative'>
      <Link
        to={token === null || token === undefined ? `/login?redirect=${window.origin}/qfeed/${question.id}` : `/me/${question?.user.username}`}
        style={{ textDecoration: "none" }}
        className='w-14 mr-2 cursor-pointer'
      >
        <img
          src={question?.user.profile_pic}
          className='w-12 h-12 rounded-full bg-background2'
          style={{ objectFit: "cover" }}
          alt=''
        />
      </Link>
      <section className=' p-0 w-full'>
        <div className='pr-2 relative'>
          {/* Profile details */}
          <p className='flex m-0 text-night-secondary mb-1 text-xs sm:text-sm'>
            <span className='mr-2 font-semibold text-faraday-night flex items-center'>
              {question?.user.firstname} {question?.user.lastname}{" "}
              {question?.user.account_verified && (
                <img src={verify} className='h-5 w-5 ml-1' alt='' />
              )}
            </span>
            <span className='mr-2 '>@{question?.user.username} </span>{" "}
            <span>{moment(question?.created, "YYYYMMDD").fromNow()}</span>
          </p>
          {question.solution && (
            <div className='absolute left-[-45px] bottom-0 '>
              <div
                onClick={() => {
                  setDisclaimer(true);
                }}
                className='ml-1 py-1 rounded-full opacity-80 inline-flex bg-background justify-center items-center cursor-pointer'
              >
                <img src={info} className='h-5 w-5 mx-1' alt='disclaimer' />
              </div>
            </div>
          )}
          <div
            className=' hover:bg-brand-highlight cursor-pointer absolute right-1 top-[-8px] rounded-md'
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
          <Modal
            icon={info}
            visible={disclaimer}
            action={() => setDisclaimer(false)}
            title={`Disclaimer`}
            message={`Unless the account that created the question is the Faraday
          official account, we can't take responsibility for the comment
          marked as a solution.`}
          />
          {question?.created !== "Just now" ? (
            <Link
              to={`/qfeed/${question.id}`}
              style={{ textDecoration: "none" }}
              className=' text-faraday-night hover:text-faraday-night'
            >
              {/* Question head */}
              <h3 className='text-base sm:text-lg font-semibold m-0 mb-1'>
                {question?.title}
              </h3>

              {/* Question body without a selected solution --optional */}
              <div className='text-sm sm:text-base m-0 mb-2'>
                {question?.content.split("\n").map((item, idx) => (
                  <p className='mb-1' key={idx}>
                    {item}
                  </p>
                ))}
              </div>

              {/* Question body if there's a solution --optional */}
              {question.solution ? (
                <>
                  <div className='bg-[#F1FBEF77] rounded-lg p-[12px] relative'>
                    <img
                      src={mark}
                      className='h-4 w-4 absolute right-3 top-3'
                    />
                    <div className='flex item-center text-night-secondary'>
                      <img
                        src={question?.solution.user.profile_pic}
                        className='h-4 w-4 rounded-full bg-background2'
                      />

                      <p className='text-xs pl-1 m-0'>
                        {question?.solution.user.firstname.concat(
                          question?.solution.user.lastname
                        ).length > 15
                          ? question?.solution.user.firstname
                              .concat(question?.solution.user.lastname)
                              .substring(0, 15) + "..."
                          : question?.solution.user.firstname +
                            " " +
                            question?.solution.user.lastname}
                      </p>
                      <p className='text-xs pl-1 m-0'>
                        @
                        {question?.solution.user.username > 15
                          ? question?.solution.user.username.substring(0, 15) +
                            "..."
                          : question?.solution.user.username}
                      </p>
                      <p className='text-xs pl-1 m-0'>
                        {question?.solution.created}
                      </p>
                    </div>

                    <div className='text-sm sm:text-base m-0 mt-2'>
                      {/* <ReactMarkdown children={question?.solution.content} /> */}
                      {question?.solution.content
                        .split("\n")
                        .map((item, idx) => (
                          <p className='mb-1' key={idx}>
                            {item}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className='text-xs mb-2 text-brand-dark'>
                    {" "}
                    Solution selected by{" "}
                    <span className='font-bold'>@{question.user.username}</span>
                  </div>
                </>
              ) : (
                ""
              )}
            </Link>
          ) : (
            <>
              <h3 className='text-base sm:text-lg font-semibold m-0 mb-1'>
                {question?.title}
              </h3>
              {/* Question body --optional */}
              <p className='text-sm sm:text-base m-0 mb-2'>
                {question?.content}
              </p>
            </>
          )}
        </div>

        <div className=' flex items-center h-12'>
          {/* Temporary Fix */}
          <button
            className={loveClasses}
            onClick={() => handleLike(question.id)}
            disabled={false || question?.created === "Just now"}
          >
            {question.vote_status === "upvote" ? (
              <img className='h-4 w-4' src={redLove} alt='take back reaction' />
            ) : (
              <img className='h-4 w-4' src={love} alt='react to question' />
            )}
            <span className='ml-1 font-medium text-xs'>
              {question.vote_rank ? question.vote_rank : ""}
            </span>
          </button>

          <button
            onClick={() => {
              handleCopyLinkModal();
              getShortLink(question.id);
            }}
            className=' p-2 rounded-lg bg-background m-4 icon-brand-hover hover:bg-brand-highlight'
          >
            <img
              className='h-[18px] w-[18px]'
              src={link}
              alt='copy question link'
            />
          </button>

          {/* >=1 to become active again */}
          {question.likes === -1 ? (
            <button
              className={loveClasses}
              onClick={() => handleLike(question.id)}
              disabled
            >
              {question.liked ? (
                <img
                  className='h-4 w-4'
                  src={redLove}
                  alt='take back reaction'
                />
              ) : (
                <img className='h-4 w-4' src={love} alt='react to question' />
              )}
              <span className='ml-1 font-medium text-sm'>{question.likes}</span>
            </button>
          ) : (
            ""
          )}

          <button
            // onClick={() => handleButtonPannel()}
            className={smileyClasses}
          >
            <img
              className='h-4 w-4  opacity-40'
              src={smiley}
              alt='engage with question'
            />
          </button>
        </div>

        {question?.created !== "Just now" ? (
          <Link to={`/qfeed/${question.id}`} style={{ textDecoration: "none" }}>
            <div className='comment text-base sm:text-lg font-semibold  py-[14px] px-2 text-faraday-night flex justify-between'>
              {question.comments === 0 ? "Leave a comment" : ""}{" "}
              {question.comments === 1 ? `${question.comments} comment` : ""}{" "}
              {question.comments > 1 ? `${question.comments} comments` : ""}{" "}
              <img className='mr-2' src={arrow} alt='' />
            </div>
          </Link>
        ) : (
          <div className='comment text-base sm:text-lg font-semibold  py-[14px] px-2 text-faraday-night flex justify-between'>
            {question.comments === 0 ? "Leave a comment" : ""}{" "}
            {question.comments === 1 ? `${question.comments} comment` : ""}{" "}
            {question.comments > 1 ? `${question.comments} comments` : ""}{" "}
            <img className='mr-2' src={arrow} alt='' />
          </div>
        )}

        <CopyLink
          isCopyLinkModal={isCopyLinkModal}
          isCopied={isCopied}
          shortLink={shortLink}
          toggleCopyLinkModal={handleCopyLinkModal}
          handleIsCopied={handleIsCopied}
        />
      </section>
    </div>
  );
};

export default Question;
