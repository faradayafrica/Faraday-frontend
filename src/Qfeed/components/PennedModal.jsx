import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { ReactComponent as CloseIcon } from "../assets/close-2.svg";
import verify from "../assets/verify.svg";
import TagsInput from "./tags/TagInput";
import { useDispatch } from "react-redux";
import { ErrorToast } from "../../common/components/CustomToast";
import { penQuestionThunk } from "../../common/features/qfeed/qfeedSlice";
import PrimaryButton from "../../common/components/PrimaryButton";
import { LIMIT } from "./PostPage";
import { PinnedQuestion } from "./QuestionComponent";

export default function PennedModal({
  question,
  isPennedOpen,
  setIsPennedOpen,
}) {
  const [tags, setTags] = useState([]);
  const tagRef = useRef();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const LIMIT = { title: 150, content: 1050 };

  const arrayToString = (arr) => {
    return arr.join(", ");
  };

  function closeModal() {
    setIsPennedOpen(false);
  }

  function openModal() {
    setIsPennedOpen(true);
  }

  const selectedTags = (tags) => {
    setTags(tags);
  };

  const onSubmit = async () => {
    if (comment.length > LIMIT.title || comment.length === 0) {
      ErrorToast("Can't send until you resolve the concerns ");
    } else {
      // format tags
      const tagsAsString = arrayToString(tags);
      await dispatch(
        penQuestionThunk({
          title: comment,
          ques_id: question.id,
          tags: tagsAsString,
        })
      );

      await setIsPennedOpen(false);

      // props.history.replace("/");

      // if (status === QfeedStates.SUCCESSFUL) {
      //   SuccessToast("Question sent");
      // }
    }
  };

  let titleClasses =
    "ask-title bg-background rounded-[8px] to-white mt-2 px-3 py-4 placeholder-[rgba(0,0,0,0.5)] border-background border-b-[1px] focus:outline-none focus:border-faraday-night focus:bg-bckground block w-full text-sm sm:text-base font-semibold ";

  titleClasses +=
    comment.length > LIMIT.title
      ? "focus:bg-gradient-to-t from-danger-highlight to-white focus:border-danger border-danger "
      : "";

  return (
    <>
      <Transition appear show={isPennedOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#00000022] bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <button aria-label="close modal" onClick={closeModal}>
                      <CloseIcon stroke="#000" />
                    </button>

                    <PrimaryButton cta="Pen" action={onSubmit} />
                  </div>
                  <textarea
                    value={comment}
                    className={titleClasses}
                    placeholder="Add Comment"
                    rows={2}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <PinnedQuestion question={question} />

                  {/* Tags */}
                  <div className="mt-3 mb-3">
                    <TagsInput
                      selectedTags={selectedTags}
                      tags={tags}
                      ref={tagRef}
                      // from="penned"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
