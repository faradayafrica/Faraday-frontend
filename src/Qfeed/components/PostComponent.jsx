import { useState, useRef } from "react";
import PrimaryButton from "../../common/components/PrimaryButton";
import arrowRight from "../assets/arrow-right.svg";
import QuestionRTE from "./CreateQuestionRTE";
import TagsInput from "./tags/TagInput";

const PostComponent = ({ LIMIT, postQuestion, history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const editorRef = useRef();
  const tagRef = useRef();

  let titleClasses =
    "ask-title bg-background to-white rounded-[8px] mt-2 px-3 py-4 placeholder-[rgba(0,0,0,0.5)] border-background border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-base sm:text-lg font-semibold ";

  titleClasses +=
    title.length > LIMIT.title
      ? "focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger "
      : "";

  function handleChange(value) {
    setContent(value);
  }

  const selectedTags = (tags) => {
    setTags(tags);
  };

  return (
    <>
      <div className="flex items-center p-3 bg-background">
        <img
          src={arrowRight}
          className="w-8 h-8 p-2 rounded-full mr-2 bg-white shadow-sm hover:bg-background2 cursor-pointer rotate-180"
          alt="return"
          onClick={() => {
            history.goBack();
          }}
        />
        <h1 className="text-2xl sm:text-2xl font-bold m-0 ">
          Ask your Question
        </h1>
      </div>
      <div className="px-3 pt-4 mt-2 bg-white">
        <label className="block w-full m-0 relative">
          <input
            type="text"
            id="commentfield"
            className={titleClasses}
            placeholder="Ask your question here"
            onChange={({ currentTarget }) => {
              setTitle(currentTarget.value);
            }}
            value={title}
            onKeyDown={(event) => {
              if (event.shiftKey && event.key === "Enter") {
                postQuestion(title, content, tags);
              }
            }}
          />
          {title.length > LIMIT.title ? (
            <>
              <span className="flex h-3 w-3 float-right absolute bottom-4 right-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
              </span>
              <span className="text-danger text-xs">
                Title cannot exceed {LIMIT.title} characters
              </span>
            </>
          ) : (
            ""
          )}
        </label>

        {/* Tags */}
        <div className="mr-2 mb-4 mt-2">
          <TagsInput
            selectedTags={selectedTags}
            tags={tags}
            ref={tagRef}
            editorRef={editorRef}
            postQuestion={() => postQuestion(title, content, tags)}
          />
        </div>

        <label className="block w-full m-0 mt-3 relative">
          {content.length > LIMIT.content ? (
            <>
              <span className="flex h-3 w-3 float-right absolute bottom-4 right-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
              </span>
              <span className="text-danger text-xs ml-2">
                Content cannot exceed {LIMIT.content} characters
              </span>
            </>
          ) : (
            ""
          )}

          <QuestionRTE
            ref={editorRef}
            value={content}
            placeholder="Give more context here. You can elaborate more, give examples or share what you've tried..."
            onChange={handleChange}
          />
        </label>
      </div>
      <div className=" flex justify-between items-end bg-white">
        <div className="fixed sm:static bottom-0 left-0 p-3 py-5 sm:py-3 w-full z-50 bg-white  sm:w-[12rem]">
          <PrimaryButton
            cta="Send Question"
            wide={true}
            action={() => postQuestion(title, content, tags)}
          />
        </div>
      </div>
    </>
  );
};

export default PostComponent;
