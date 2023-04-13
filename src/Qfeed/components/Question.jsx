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
  echoQuestionThunk,
  updateFeed,
  voteQuestionThunk,
} from "../../common/features/qfeed/qfeedSlice";
import QuestionComponent from "./QuestionComponent";

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
  const handleLike = async (postid, vote) => {
    if (token === null || token === undefined) {
      return history.push(`/login?redirect=${window.origin}/qfeed/${postid}`);
    }

    if (vote === "downvote") {
      dispatch(voteQuestionThunk({ postid, value: "downvote" }));
    } else {
      dispatch(voteQuestionThunk({ postid }));
    }
  };

  function handleQuestionDelete(ques_id) {
    dispatch(deleteQuestionThunk({ ques_id }));
  }

  function handleEcho(ques_id) {
    dispatch(echoQuestionThunk({ ques_id }));
  }

  if (question.type === "echo") {
    return (
      <QuestionComponent
        type={question.type}
        user={question.user}
        question={question.original}
        setQuestionMenu={setQuestionMenu}
        handleLike={handleLike}
        handleEcho={handleEcho}
        handleCopyLinkModal={handleCopyLinkModal}
        getShortLink={getShortLink}
        isCopyLinkModal={isCopyLinkModal}
        isCopied={isCopied}
        shortLink={shortLink}
        handleIsCopied={handleIsCopied}
        questionMenu={questionMenu}
        toggleQuestionMenu={toggleQuestionMenu}
        handleQuestionDelete={handleQuestionDelete}
      />
    );
  }
  if (question.type === "pen") {
    return (
      <QuestionComponent
        type={"pen"}
        user={question.user}
        question={question.original}
        setQuestionMenu={setQuestionMenu}
        handleLike={handleLike}
        handleEcho={handleEcho}
        handleCopyLinkModal={handleCopyLinkModal}
        getShortLink={getShortLink}
        isCopyLinkModal={isCopyLinkModal}
        isCopied={isCopied}
        shortLink={shortLink}
        handleIsCopied={handleIsCopied}
        questionMenu={questionMenu}
        toggleQuestionMenu={toggleQuestionMenu}
        handleQuestionDelete={handleQuestionDelete}
      />
    );
  }

  return (
    <QuestionComponent
      type={question.type}
      user={null} // this is null because it's not an echo, though question.user is present
      question={question}
      setQuestionMenu={setQuestionMenu}
      handleLike={handleLike}
      handleEcho={handleEcho}
      handleCopyLinkModal={handleCopyLinkModal}
      getShortLink={getShortLink}
      isCopyLinkModal={isCopyLinkModal}
      isCopied={isCopied}
      shortLink={shortLink}
      handleIsCopied={handleIsCopied}
      questionMenu={questionMenu}
      toggleQuestionMenu={toggleQuestionMenu}
      handleQuestionDelete={handleQuestionDelete}
    />
  );
};

export default Question;
