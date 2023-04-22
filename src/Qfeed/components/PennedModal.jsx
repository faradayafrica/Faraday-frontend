import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { ReactComponent as CloseIcon } from "../assets/close-2.svg";
import verify from "../assets/verify.svg";
import TagsInput from "./tags/TagInput";
import { useDispatch } from "react-redux";
import { ErrorToast } from "../../common/components/CustomToast";
import { penQuestionThunk } from "../../common/features/qfeed/qfeedSlice";

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

  return (
    <>
      <Transition appear show={isPennedOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-[#00000022] bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between items-center'>
                    <button aria-label='close modal' onClick={closeModal}>
                      <CloseIcon stroke='#000' />
                    </button>

                    <button
                      className='bg-brand px-4 py-[7px] sm:py-[9px] rounded-lg font-semibold text-white'
                      onClick={onSubmit}
                    >
                      Pen
                    </button>
                  </div>
                  <textarea
                    value={comment}
                    className='w-full mt-2 p-3 text-sm placeholder:font-semibold placeholder:text-lg'
                    placeholder='Add Comment'
                    rows={2}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <div className='mt-1 border rounded-lg p-3'>
                    <p className='flex m-0 text-night-secondary text-xs sm:text-sm flex-wrap'>
                      <span className=' font-semibold text-faraday-night shorten'>
                        {question?.user.firstname} {question?.user.lastname}
                      </span>
                      <span className='mr-1'>
                        {question?.user.account_verified && (
                          <img
                            src={verify}
                            className='h-[14px] w-[14px] sm:h-5 sm:w-5 ml-1'
                            alt=''
                          />
                        )}
                      </span>
                      <span className='mr-1 '>@{question?.user.username} </span>{" "}
                    </p>

                    <h3 className={`${"text-base font-semibold mt-1"}`}>
                      {question?.title}
                    </h3>
                    {question && question?.content && (
                      <div
                        className='text-sm text-faraday-night render truncate '
                        style={{ marginTop: 0 }}
                        dangerouslySetInnerHTML={{ __html: question.content }}
                      />
                    )}
                  </div>

                  {/* Tags */}
                  <div className='mt-3'>
                    <TagsInput
                      selectedTags={selectedTags}
                      tags={tags}
                      ref={tagRef}
                      // editorRef={editorRef}
                      // postQuestion={() => postQuestion(title, content, tags)}
                      from='penned'
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
