import { useState, useEffect, useRef, memo } from "react";
import { useHistory } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import http from "../../common/services/httpService";
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
  const [echoMenu, setEchoMenu] = useState(false);
  const [isCopyLinkModal, setCopyLinkModal] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [shortLink, setShortLink] = useState(props.question.short_link);
  const [disclaimer, setDisclaimer] = useState(false);

  const history = useHistory();

  const qref = useRef();

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

    if (!shortLink) {
      try {
        http
          .post("https://frda.me/api/shorten/", {
            original_url,
          })
          .then((resp) => {
            http.post(process.env.REACT_APP_API_URL + "/qfeed/que/shorten/", {
              postid: id,
              link: resp.data.short_url,
            });

            setShortLink(resp.data.short_url);
            if (question_index !== -1) {
              questionsClone[question_index].short_link = resp.data.short_url;
              dispatch(updateFeed({ name: "qfeed", value: questionsClone }));
            }
          });
      } catch (e) {
        // console.log(e);
      }
    }
  };

  useEffect(() => {
    setShortLink(question ? question.short_link : "");
  }, [question]);

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

  return (
    <div>
      <QuestionComponent
        type={
          question.type === "echo"
            ? question.type
            : question.type === "pen"
            ? "pen"
            : question.type
        }
        user={
          question.type === "echo" || question.type === "pen"
            ? question.user
            : null
        }
        question={question.type === "echo" ? question.original : question}
        setQuestionMenu={setQuestionMenu}
        handleLike={handleLike}
        handleEcho={handleEcho}
        handleCopyLinkModal={handleCopyLinkModal}
        getShortLink={getShortLink}
        isCopyLinkModal={isCopyLinkModal}
        setCopyLinkModal={setCopyLinkModal}
        isCopied={isCopied}
        shortLink={shortLink}
        handleIsCopied={handleIsCopied}
        questionMenu={questionMenu}
        toggleQuestionMenu={toggleQuestionMenu}
        handleQuestionDelete={handleQuestionDelete}
        echoMenu={echoMenu}
        setEchoMenu={setEchoMenu}
        discussionPage={false}
      />
    </div>
  );
};

export default memo(Question);
