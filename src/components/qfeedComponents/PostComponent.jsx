import { useState } from "react";
import PrimaryButton from "../styledComponents/PrimaryButton";
import addContentImg from "../../images/qfeed/add.svg";
import removeContentImg from "../../images/qfeed/remove.svg";
import arrowRight from "../../images/qfeed/arrow-right.svg";

const PostComponent = ({ LIMIT, postQuestion, history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isContentInput, setContentInput] = useState(false);

  let titleClasses =
    "focus:bg-gradient-to-t from-background to-white mt-1 px-2 py-2 mb-2 placeholder-secondary-text border-outline border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-base sm:text-lg font-semibold ";

  titleClasses +=
    title.length > LIMIT.title
      ? "focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger"
      : "";

  let contentClasses =
    "focus:bg-gradient-to-t from-background to-white mt-1 px-2 py-2 mb-2 placeholder-secondary-text border-outline border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-sm ";

  contentClasses +=
    content.length > LIMIT.content
      ? " focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger"
      : "";

  return (
    <>
      <div className="flex items-center p-3">
        <img
          src={arrowRight}
          className="w-8 h-8 p-2 rounded-full mr-2 bg-background hover:bg-background2 cursor-pointer rotate-180"
          alt="return"
          onClick={() => {
            history.goBack();
          }}
        />
        <h1 className="text-2xl sm:text-2xl font-bold m-0 ">
          Ask your Question
        </h1>
      </div>
      <div className="p-3 mt-2 bg-brand-higlight relative">
        <label className="block w-full m-0 relative">
          {title.length > LIMIT.title ? (
            <>
              <span className="flex h-3 w-3 float-right absolute bottom-4 right-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-danger"></span>
              </span>
              <span className="text-danger text-xs ml-2">
                Title cannot exceed {LIMIT.title} characters
              </span>
            </>
          ) : (
            ""
          )}
          <textarea
            type="text"
            name="comment"
            rows="3"
            id="commentfield"
            className={titleClasses}
            placeholder="Ask your question here"
            onChange={({ currentTarget }) => {
              setTitle(currentTarget.value);
            }}
            value={title}
          />
        </label>

        {isContentInput ? (
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
            <textarea
              type="text"
              name="comment"
              rows="4"
              id="commentfield"
              className={contentClasses}
              placeholder="Give more context here. You can elaborate more, give examples or share what you've tried..."
              onChange={({ currentTarget }) => {
                setContent(currentTarget.value);
              }}
              value={content}
            />
          </label>
        ) : (
          ""
        )}

        <div className="flex justify-between items-end bg-white">
          {!isContentInput ? (
            <button
              onClick={() => {
                setContentInput(true);
              }}
              className="border-x border-y border-outline flex items-center px-2 py-[9px] rounded-lg font-normal text-sm  text-faraday-night hover:bg-brand-highlight "
            >
              <img
                className="mr-2 h-[10px] w-[10px]"
                src={addContentImg}
                alt="show content input field"
              />
              Add content
            </button>
          ) : (
            <button
              onClick={() => {
                setContentInput(false);
              }}
              className="border-x border-y border-outline flex items-center px-2 py-[9px] rounded-lg font-normal text-sm  text-faraday-night hover:bg-brand-highlight "
            >
              <img
                className="mr-2 h-[10px] w-[10px]"
                src={removeContentImg}
                alt="hide content input field"
              />
              Hide content
            </button>
          )}

          <div className="fixed sm:absolute bottom-0 left-0 p-3 w-full z-50 bg-white">
            <PrimaryButton
              cta="Send question"
              wide={true}
              action={() => postQuestion(title, content)}
            />
          </div>
        </div>
        <div className="h-20 w-full "></div>
      </div>
    </>
  );
};

export default PostComponent;
